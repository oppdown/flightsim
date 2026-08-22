# Flight Lab Simulator Changelog

## Unreleased — 2026-08-22

- Register any aircraft-to-ground contact as a landing event.
- Keep the existing safe-landing score constraints separate from landing registration.
- Add world terrain tiles across the training area, fixed tree landmarks, and north/south runway end markings.
- Publish the simulator and change history through the public Flight Lab site.

## 0.2.0 — 2026-08-22

- Added world-anchored terrain, tree landmarks, and a stationary runway.
- Added runway end numbers `18/S` and `36/N`.
- Added regression checks for terrain projection, turning, controls, and touchdown behavior.

## 0.1.0 — 2026-08-22

- Added the standalone takeoff and landing trainer.
- Added mouse, keyboard, and Xbox-style controller mappings.
- Added deterministic flight physics, objectives, readouts, and regression tests.
