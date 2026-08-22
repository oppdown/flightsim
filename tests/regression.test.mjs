import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('..', import.meta.url);
const simulator = await readFile(new URL('./flight-simulator.html', root), 'utf8');
const entry = await readFile(new URL('./index.html', root), 'utf8');

function scriptSource(html) {
  const start = html.indexOf('<script>');
  const end = html.indexOf('</script>', start);
  assert.ok(start >= 0 && end > start, 'simulator script is present');
  return html.slice(start + '<script>'.length, end);
}

test('standalone entry points to the simulator', () => {
  assert.match(entry, /<iframe[^>]+src="\.\/flight-simulator\.html"/);
  assert.match(simulator, /id="flight-simulator"/);
  assert.match(simulator, /id="fs-canvas"/);
});

test('simulator JavaScript parses without syntax errors', () => {
  assert.doesNotThrow(() => new vm.Script(scriptSource(simulator)));
});

test('runway is projected from world-relative coordinates', () => {
  assert.match(simulator, /function projectWorldPoint\(/);
  assert.match(simulator, /function drawWorldRunway\(/);
  assert.match(simulator, /const RUNWAY = Object\.freeze\(\{ x: 0, startZ: -220, endZ: 3600, halfWidth: 45 \}\)/);
  assert.match(simulator, /projectWorldPoint\(RUNWAY\.x - RUNWAY\.halfWidth, z/);
  assert.match(simulator, /projectWorldPoint\(RUNWAY\.x \+ RUNWAY\.halfWidth, z/);
  assert.match(simulator, /RUNWAY\.startZ \+ \(RUNWAY\.endZ - RUNWAY\.startZ\)/);
  assert.match(simulator, /function drawRunwayEndMark\(/);
  assert.match(simulator, /drawRunwayEndMark\(RUNWAY\.startZ \+ 55, '18', 'S'/);
  assert.match(simulator, /drawRunwayEndMark\(RUNWAY\.endZ - 85, '36', 'N'/);
  assert.match(simulator, /state\.worldZ/);
  assert.doesNotMatch(simulator, /const startZ = state\.worldZ/);
  assert.doesNotMatch(simulator, /const endZ = state\.worldZ/);
});

test('terrain and landmarks use fixed world coordinates', () => {
  assert.match(simulator, /const TERRAIN_CELL_SIZE = 360/);
  assert.match(simulator, /Math\.floor\(state\.worldX \/ TERRAIN_CELL_SIZE\)/);
  assert.match(simulator, /Math\.floor\(state\.worldZ \/ TERRAIN_CELL_SIZE\)/);
  assert.match(simulator, /const TERRAIN_FIELDS = Object\.freeze\(\[/);
  assert.match(simulator, /const TERRAIN_TREES = Object\.freeze\(\[/);
  assert.match(simulator, /function drawWorldTerrain\(/);
  assert.match(simulator, /function drawWorldTree\(/);
  assert.match(simulator, /TERRAIN_TREES\s*\.map\(tree => \(\{ tree, point: projectWorldPoint\(tree\.x, tree\.z/);
  assert.match(simulator, /const BEACON = Object\.freeze\(\{ x: 0, z: 1050 \}\)/);
  assert.match(simulator, /const TRAINING_RING = Object\.freeze\(\{ x: 140, z: 900 \}\)/);
  assert.doesNotMatch(simulator, /projectWorldPoint\(0, state\.worldZ \+ 1050/);
  assert.doesNotMatch(simulator, /projectWorldPoint\(140, state\.worldZ \+ 900/);
});

test('turning changes both heading and aircraft world position', () => {
  assert.match(simulator, /const coordinatedTurnRate/);
  assert.match(simulator, /state\.heading\s*=.*coordinatedTurnRate/);
  assert.match(simulator, /state\.worldX\s*\+=/);
  assert.match(simulator, /state\.worldZ\s*\+=/);
});

test('control mappings keep throttle, brake, and pause separate', () => {
  assert.match(simulator, /const throttle = \(keys\.has\('KeyW'\)/);
  assert.match(simulator, /const brake = keys\.has\('Space'\)/);
  assert.match(simulator, /event\.code === 'KeyP'/);
  assert.doesNotMatch(simulator, /event\.code === 'Space'\) togglePause/);
  assert.match(simulator, /pad\.buttons\[2\]\?\.value/);
  assert.match(simulator, /pad\.buttons\[9\]\?\.pressed/);
});

test('approach status text follows the active objective', () => {
  assert.match(simulator, /3: state\.speed < 40.*state\.altitude > 650 \? 'Turn back and descend toward the runway'/);
  assert.match(simulator, /4: 'Flare and touch down gently'/);
});

test('low-speed flight has a sink path instead of freezing altitude', () => {
  assert.match(simulator, /const airborne = state\.altitude > 0 \|\| state\.speed > 60/);
  assert.match(simulator, /const stallSink = Math\.max\(0, 52 - state\.speed\) \* \.28/);
  assert.match(simulator, /const lowSpeedGravity = state\.speed < 18 \? 9 : 0/);
  assert.match(simulator, /state\.verticalSpeed = climbRate/);
  assert.match(simulator, /3: state\.speed < 40 && state\.altitude > 20 \? 'Stall warning/);
});

test('normal touchdown completes the landing objective at ground contact', () => {
  assert.match(simulator, /const groundContact = state\.altitude === 0 && state\.speed >= 18 && state\.speed < 75/);
  assert.match(simulator, /state\.objective === 4 && groundContact/);
  assert.doesNotMatch(simulator, /state\.objective === 4 && state\.altitude === 0 && state\.speed >= 18 && state\.speed < 75 && Math\.abs/);
});
