# Flight Lab Simulator

Standalone browser flight-simulator prototype with world-anchored terrain tiles, tree landmarks, cardinal runway markings, and runway projection. It is intentionally independent of the other projects in the workspace.

## Run it

Open `index.html` in a browser, or serve this folder with any static web server. Use **Start flight**, then:

- Mouse position or arrow keys / A-D: pitch and roll
- W / S: throttle
- Q / E: yaw
- Space: brake
- P: pause
- Xbox left stick: pitch and roll
- Xbox LT / RT: throttle
- Xbox LB / RB: yaw
- Xbox X: brake, Menu: pause, B: reset

## Regression checks

```text
npm test
```

The checks validate the standalone page, JavaScript syntax, stationary world-relative runway projection, fixed terrain and landmarks, synchronized turn state, landing behavior, and control mappings.
