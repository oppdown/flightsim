# Flight Lab Simulator Changelog

## v0.1.014 — 2026-08-22

- Replaced the placeholder altitude projection with a real ground-plane camera model using aircraft height above terrain.
- Added a 5-ft parked-aircraft eye height so runway and terrain remain visible from the ground.
- Reduced procedural tree height to a 48-ft world value and kept perspective size tied to depth.
- Made pitch-driven horizon movement use camera focal length instead of a fixed visual offset.

## v0.1.013 — 2026-08-22

- Fixed world travel so displayed airspeed in mph produces matching movement through the fixed terrain and runway.
- Replaced the slow placeholder motion scale with the 1.46667 world-units-per-second conversion for each mph.
- Added a regression guard against the old under-scaled travel calculation.

## v0.1.012 — 2026-08-22

- Fixed the pre-start chase view so the aircraft is level, stationary, and visually grounded on the runway.
- Added a preflight state stabilizer that holds 0 mph, 0 ft, 0° pitch, and 0° roll until the countdown starts the flight.
- Added a low ground anchor and landing shadow to keep the chase aircraft visually connected to the terrain.

## v0.1.011 — 2026-08-22

- Added an explicit ground-roll / airborne flight state so 0 ft readings match the aircraft's physical contact with the runway or terrain.
- Required both 60 mph airspeed and positive nose-up pitch before liftoff; throttle alone now accelerates the aircraft along the ground.
- Added a live flight-phase instrument so testers can distinguish preflight, ground roll, and airborne flight.

## v0.1.010 — 2026-08-22

- Added a five-second preflight countdown after Start flight.
- Added a centered world-view prompt asking the player to place the cursor before controls become active.
- Kept the aircraft stationary until the countdown completes.

## v0.1.009 — 2026-08-22

- Inverted pitch by default for the current control setup.
- Added full-roll aircraft/world perspective and a live HSI, VSI, altitude, airspeed, and flaps instrument area.
- Added 10° / 30° flap toggles with lift/drag effects and key bindings `1` / `2`.
- Added navigation and nosewheel light toggles with key bindings `N` / `L`; navigation lights use red left, green right, and white tail placement.

## v0.1.008 — 2026-08-22

- Added Normal / Inverted selectors for pitch, roll, and yaw.
- Applied the selected direction consistently to keyboard, mouse, Xbox-style, and joystick inputs.
- Cleared held keyboard, pointer, and one-shot gamepad actions when the browser loses focus.

## v0.1.007 — 2026-08-22

- Start flights on the runway at 0% throttle and 0 ft altitude.
- Require throttle input to build speed and make liftoff possible.
- Keep level flight from gaining altitude unless the pilot pitches up.

## v0.1.006 — 2026-08-22

- Removed repository references and links from the public site.
- Added a key-mapping menu with keyboard, mouse, Xbox-style, SideWinder, and Extreme 3D Pro profiles.
- Added automatic joystick profile detection for Microsoft SideWinder and Logitech Extreme 3D Pro devices.
- Rebuilt the PWA download as a self-contained browser package with its simulator, manifest, service worker, icon, and setup guide.

## v0.1.005 — 2026-08-22

- Moved the public changelog to its own page and removed the embedded simulator from the landing page.
- Added a downloadable offline-ready PWA package for local tester installs.
- Simplified the simulator world-space overlay so the current view label is the only persistent corner label.
- Kept throttle feedback below the speed, altitude, heading, and attitude readouts.

## v0.1.004 — 2026-08-22

- Opened pitch and roll response for aerobatic movement, including loops and barrel rolls.
- Made world-item perspective account for altitude so distant trees and terrain recede naturally.
- Reduced tree density and added a wide runway safety buffer so the approach remains visible.
- Moved the throttle bar below the primary flight readouts and removed the FPV compass letters.
- Removed the regression-status card from the public site while keeping the detailed changelog.

## v0.1.003 — 2026-08-22

- Added a first-person FPV view inspired by low-altitude drone flight.
- Added a switchable chase camera with `V` so testers can compare perspectives.
- Extended tree landmarks procedurally across the open world instead of clustering them near the runway.
- Added an FPV HUD for heading, battery, altitude, speed, and vertical speed.

## v0.1.002 — 2026-08-22

- Register any aircraft-to-ground contact as a landing event.
- Keep the existing safe-landing score constraints separate from landing registration.
- Add world terrain tiles across the training area, fixed tree landmarks, and north/south runway end markings.
- Publish the simulator and change history through the public Flight Lab site.

## v0.1.001 — 2026-08-22

- Added the standalone takeoff and landing trainer.
- Added mouse, keyboard, and Xbox-style controller mappings.
- Added deterministic flight physics, objectives, readouts, and regression tests.
