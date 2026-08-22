# Flight Lab Simulator Changelog

## 0.3.0 — 2026-08-22

- Added a first-person FPV view inspired by low-altitude drone flight.
- Added a switchable chase camera with `V` so testers can compare perspectives.
- Extended tree landmarks procedurally across the open world instead of clustering them near the runway.
- Added an FPV HUD for heading, battery, altitude, speed, and vertical speed.

## 0.2.1 — 2026-08-22

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
