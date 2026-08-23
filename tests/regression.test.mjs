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
  assert.match(simulator, /getWorldTrees\(\)\s*\.map\(tree => \(\{ tree, point: projectWorldPoint\(tree\.x, tree\.z/);
  assert.match(simulator, /const BEACON = Object\.freeze\(\{ x: 0, z: 1050 \}\)/);
  assert.match(simulator, /const TRAINING_RING = Object\.freeze\(\{ x: 140, z: 900 \}\)/);
  assert.doesNotMatch(simulator, /projectWorldPoint\(0, state\.worldZ \+ 1050/);
  assert.doesNotMatch(simulator, /projectWorldPoint\(140, state\.worldZ \+ 900/);
});

test('open-world FPV view has a switchable drone camera and procedural landmarks', () => {
  assert.match(simulator, /id="fs-view-toggle"/);
  assert.match(simulator, /viewMode: 'fpv'/);
  assert.match(simulator, /function toggleView\(/);
  assert.match(simulator, /function drawFpvDrone\(/);
  assert.match(simulator, /function drawFpvHud\(/);
  assert.match(simulator, /function worldNoise\(/);
  assert.match(simulator, /function getWorldTrees\(/);
  assert.match(simulator, /event\.code === 'KeyV'/);
  assert.match(simulator, /OPEN WORLD/);
  const hudStart = simulator.indexOf('function drawFpvHud(');
  const hudEnd = simulator.indexOf('function draw()', hudStart);
  assert.doesNotMatch(simulator.slice(hudStart, hudEnd), /ARMED|OPEN WORLD/);
  assert.match(simulator, /pitchInput \* 180/);
  assert.match(simulator, /rollInput \* 360/);
  assert.doesNotMatch(simulator, /fillText\('N\s+E\s+S\s+W'/);
  assert.match(simulator, /const altitudeDepth = Math\.max\(0, state\.altitude\)/);
  assert.match(simulator, /const runwayBuffer = RUNWAY\.halfWidth \+ 170/);
  assert.match(simulator, /id="fs-controls-open"/);
  assert.match(simulator, /id="fs-controls-menu"/);
  assert.match(simulator, /Logitech Extreme 3D Pro/);
  assert.match(simulator, /Microsoft SideWinder/);
  assert.match(simulator, /function joystickProfileFor\(/);
  assert.match(simulator, /function updateJoystickUi\(/);
  assert.match(simulator, /id="fs-invert-pitch"/);
  assert.match(simulator, /id="fs-invert-roll"/);
  assert.match(simulator, /id="fs-invert-yaw"/);
});

test('axis direction selectors invert pitch, roll, and yaw across control devices', () => {
  assert.match(simulator, /const CONTROL_INVERSION_STORAGE_KEY = 'flight-lab-control-inversions-v2'/);
  assert.match(simulator, /const controlInversions = { pitch: true, roll: false, yaw: false }/);
  assert.match(simulator, /function axisSign\(axis\)/);
  assert.match(simulator, /axisSign\('pitch'\) \* \(keyboard\.pitch \* \.55 \+ mouse\.pitch \* \.8 \+ pad\.pitch\)/);
  assert.match(simulator, /axisSign\('roll'\) \* \(keyboard\.roll \* \.7 \+ mouse\.roll \* \.8 \+ pad\.roll\)/);
  assert.match(simulator, /axisSign\('yaw'\) \* \(keyboard\.yaw \* \.7 \+ pad\.yaw\)/);
  assert.match(simulator, /window\.localStorage\.setItem\(CONTROL_INVERSION_STORAGE_KEY/);
});

test('aircraft perspective and HSI follow full pitch and roll attitude', () => {
  assert.match(simulator, /id="fs-hsi-heading"/);
  assert.match(simulator, /id="fs-hsi-aircraft"/);
  assert.match(simulator, /id="fs-vsi"/);
  assert.match(simulator, /id="fs-altitude-indicator"/);
  assert.match(simulator, /el\('#fs-hsi-card'\)\.style\.transform = `rotate\(\$\{-state\.heading\}deg\)`/);
  assert.match(simulator, /el\('#fs-hsi-aircraft'\)\.style\.transform = `translate\(-50%, -50%\) rotate\(\$\{state\.roll\}deg\)`/);
  assert.match(simulator, /ctx\.rotate\(-rad\(state\.roll\)\)/);
  assert.doesNotMatch(simulator, /state\.roll\) \* \.38/);
  assert.doesNotMatch(simulator, /state\.roll\) \* \.62/);
});

test('flaps and aircraft lights have toggles, key bindings, and flight effects', () => {
  assert.match(simulator, /flaps: 0, navLights: false, nosewheelLight: false/);
  assert.match(simulator, /id="fs-flaps-10"/);
  assert.match(simulator, /id="fs-flaps-30"/);
  assert.match(simulator, /id="fs-nav-lights"/);
  assert.match(simulator, /id="fs-nose-light"/);
  assert.match(simulator, /event\.code === 'Digit1'/);
  assert.match(simulator, /event\.code === 'Digit2'/);
  assert.match(simulator, /event\.code === 'KeyN'/);
  assert.match(simulator, /event\.code === 'KeyL'/);
  assert.match(simulator, /const flapDrag = state\.flaps === 30 \? 7 : state\.flaps === 10 \? 2\.5 : 0/);
  assert.match(simulator, /const flapLift = state\.flaps === 30 \? \.16 : state\.flaps === 10 \? \.08 : 0/);
  assert.match(simulator, /state\.pitch > 1 \? \.54 \+ flapLift : 0/);
  assert.match(simulator, /ctx\.fillStyle = '#e95c61'/);
  assert.match(simulator, /ctx\.fillStyle = '#5be08b'/);
  assert.match(simulator, /ctx\.fillStyle = '#f7fff8'/);
});

test('transient inputs clear when the browser loses focus', () => {
  assert.match(simulator, /function clearTransientInputs\(\)/);
  assert.match(simulator, /window\.addEventListener\('blur', clearTransientInputs\)/);
  assert.match(simulator, /if \(document\.hidden\) clearTransientInputs\(\)/);
});

test('PWA package has an install manifest and offline shell', async () => {
  const pwaRoot = new URL('./pwa/', root);
  const manifest = await readFile(new URL('manifest.webmanifest', pwaRoot), 'utf8');
  const shell = await readFile(new URL('index.html', pwaRoot), 'utf8');
  const serviceWorker = await readFile(new URL('sw.js', pwaRoot), 'utf8');
  assert.match(manifest, /"display": "standalone"/);
  assert.match(manifest, /"start_url": "\.\/index\.html"/);
  assert.match(shell, /rel="manifest"/);
  assert.match(shell, /serviceWorker\.register\('\.\/sw\.js'\)/);
  assert.match(serviceWorker, /caches\.open\(CACHE\)/);
});

test('throttle feedback sits below the primary flight readouts', () => {
  const readouts = simulator.indexOf('<div class="fs-readouts"');
  const throttle = simulator.indexOf('<div class="fs-throttle-strip"');
  assert.ok(readouts >= 0 && throttle > readouts);
  assert.match(simulator, /id="fs-throttle-meter"/);
  const statusPanelStart = simulator.indexOf('<aside class="fs-side"');
  const statusPanelEnd = simulator.indexOf('<section class="fs-panel">', statusPanelStart + 1);
  assert.doesNotMatch(simulator.slice(statusPanelStart, statusPanelEnd), /fs-throttle-meter/);
});

test('flight starts at idle and requires throttle plus nose-up input for liftoff', () => {
  assert.match(simulator, /altitude: 0.*throttle: 0/);
  assert.match(simulator, /heading: 0, pitch: 0, roll: 0, verticalSpeed: 0/);
  assert.match(simulator, /airborne: false/);
  assert.match(simulator, /id="fs-throttle" class="fs-readout-value">0<\/span>%/);
  assert.match(simulator, /const acceleration = state\.throttle \* 27 - drag/);
  assert.match(simulator, /const lift = Math\.max\(0, state\.speed - 54\) \* \(state\.pitch > 1 \? \.54 \+ flapLift : 0\)/);
  assert.match(simulator, /const liftoff = !state\.airborne && state\.altitude === 0 && state\.speed >= 60 && state\.pitch > 1/);
  assert.match(simulator, /const airborne = state\.airborne/);
  assert.doesNotMatch(simulator, /const airborne = state\.altitude > 0 \|\| state\.speed > 60/);
});

test('preflight render is level and places the chase aircraft on the ground', () => {
  assert.match(simulator, /function stabilizePreflightState\(\)/);
  assert.match(simulator, /if \(state\.running\) return;/);
  assert.match(simulator, /state\.pitch = 0;/);
  assert.match(simulator, /state\.roll = 0;/);
  assert.match(simulator, /const groundAnchorY = clamp\(h \* \.84 - altitudeLift/);
  assert.match(simulator, /ctx\.beginPath\(\); ctx\.ellipse\(0, 66, 82, 10/);
  assert.match(simulator, /stabilizePreflightState\(\);\s*updateGamepadLabel\(\);/);
});

test('instrument status distinguishes ground roll from airborne flight', () => {
  assert.match(simulator, /id="fs-flight-phase">GROUND ROLL/);
  assert.match(simulator, /state\.countdown > 0 \? 'PREFLIGHT' : \(state\.airborne \? 'AIRBORNE' : 'GROUND ROLL'\)/);
  assert.match(simulator, /state\.altitude === 0 && state\.airborne && state\.verticalSpeed <= 0/);
});

test('start flight uses a five-second centered preflight countdown', () => {
  assert.match(simulator, /id="fs-preflight" class="fs-preflight" hidden/);
  assert.match(simulator, /id="fs-preflight-count" class="fs-preflight-count">5/);
  assert.match(simulator, /Place your cursor in the middle of the world view/);
  assert.match(simulator, /const PREFLIGHT_COUNTDOWN_SECONDS = 5/);
  assert.match(simulator, /countdown: 0/);
  assert.match(simulator, /state\.countdown = PREFLIGHT_COUNTDOWN_SECONDS/);
  assert.match(simulator, /function advancePreflight\(dt\)/);
  assert.match(simulator, /state\.running = true/);
  assert.match(simulator, /if \(state\.countdown > 0\) advancePreflight\(FIXED_DT\)/);
  assert.match(simulator, /pointer\.active = false/);
});

test('turning changes both heading and aircraft world position', () => {
  assert.match(simulator, /const coordinatedTurnRate/);
  assert.match(simulator, /state\.heading\s*=.*coordinatedTurnRate/);
  assert.match(simulator, /state\.worldX\s*\+=/);
  assert.match(simulator, /state\.worldZ\s*\+=/);
});

test('airspeed advances the aircraft through the fixed world at mph scale', () => {
  assert.match(simulator, /const MPH_TO_WORLD_UNITS_PER_SECOND = 1\.46667/);
  assert.match(simulator, /const travel = state\.speed \* dt \* MPH_TO_WORLD_UNITS_PER_SECOND/);
  assert.doesNotMatch(simulator, /const travel = state\.speed \* dt \* \.15/);
});

test('control mappings keep throttle, brake, and pause separate', () => {
  assert.match(simulator, /const throttle = \(keys\.has\('KeyW'\)/);
  assert.match(simulator, /const brake = keys\.has\('Space'\)/);
  assert.match(simulator, /event\.code === 'KeyP'/);
  assert.doesNotMatch(simulator, /event\.code === 'Space'\) togglePause/);
  assert.match(simulator, /pad\.buttons\[2\]\?\.value/);
  assert.match(simulator, /pad\.buttons\[profile\.buttons\.pause\]\?\.pressed/);
  assert.match(simulator, /pause: 9/);
});

test('approach status text follows the active objective', () => {
  assert.match(simulator, /3: state\.speed < 40.*state\.altitude > 650 \? 'Turn back and descend toward the runway'/);
  assert.match(simulator, /4: 'Flare and touch down gently'/);
});

test('low-speed flight has a sink path instead of freezing altitude', () => {
  assert.match(simulator, /const airborne = state\.airborne/);
  assert.match(simulator, /const liftoff = !state\.airborne && state\.altitude === 0 && state\.speed >= 60 && state\.pitch > 1/);
  assert.match(simulator, /const stallSink = Math\.max\(0, 52 - state\.speed\) \* \.28/);
  assert.match(simulator, /const lowSpeedGravity = state\.speed < 18 \? 9 : 0/);
  assert.match(simulator, /state\.verticalSpeed = climbRate/);
  assert.match(simulator, /3: state\.speed < 40 && state\.altitude > 20 \? 'Stall warning/);
});

test('normal touchdown completes the landing objective at ground contact', () => {
  assert.match(simulator, /const groundContact = state\.altitude === 0/);
  assert.match(simulator, /const safeLanding = state\.speed >= 18 && state\.speed < 75 && Math\.abs\(state\.pitch\) < 12 && Math\.abs\(state\.roll\) < 12/);
  assert.match(simulator, /state\.objective === 4 && groundContact/);
  assert.match(simulator, /if \(safeLanding\)/);
  assert.match(simulator, /Landing recorded — safe touchdown limits missed/);
});
