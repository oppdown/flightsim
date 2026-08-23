export type Change = {
  version: string;
  date: string;
  title: string;
  details: string[];
};

export const changes: Change[] = [
  {
    version: "v0.1.013",
    date: "August 22, 2026",
    title: "Relative airspeed and world travel",
    details: [
      "Fixed world travel so displayed mph produces matching movement through the fixed terrain and runway.",
      "Replaced the slow placeholder motion scale with the 1.46667 world-units-per-second conversion for each mph.",
      "Added regression coverage against the old under-scaled travel calculation.",
    ],
  },
  {
    version: "v0.1.012",
    date: "August 22, 2026",
    title: "Grounded preflight view",
    details: [
      "Fixed the pre-start chase view so the aircraft is level, stationary, and visually grounded on the runway.",
      "Held 0 mph, 0 ft, 0° pitch, and 0° roll until the preflight countdown begins.",
      "Added a low ground anchor and landing shadow to connect the chase aircraft to the terrain.",
    ],
  },
  {
    version: "v0.1.011",
    date: "August 22, 2026",
    title: "Ground contact and liftoff physics",
    details: [
      "Added an explicit ground-roll / airborne state so 0 ft readings match physical runway or terrain contact.",
      "Required at least 60 mph and positive nose-up pitch before liftoff; throttle alone now accelerates the aircraft along the ground.",
      "Added a live phase instrument for preflight, ground roll, and airborne flight.",
    ],
  },
  {
    version: "v0.1.010",
    date: "August 22, 2026",
    title: "Preflight countdown",
    details: [
      "Added a five-second countdown after Start flight.",
      "Added a centered prompt asking the player to place the cursor in the world view.",
      "Kept flight controls and aircraft motion inactive until the countdown completes.",
    ],
  },
  {
    version: "v0.1.009",
    date: "August 22, 2026",
    title: "Attitude instruments, flaps, and aircraft lights",
    details: [
      "Inverted pitch by default for the current control setup.",
      "Added full-roll aircraft and world perspective with HSI, VSI, altitude, airspeed, and flaps indicators.",
      "Added 10° / 30° flap toggles and approach lift / drag effects.",
      "Added FAA-style red-left, green-right, white-tail navigation lights and a nosewheel light toggle.",
    ],
  },
  {
    version: "v0.1.008",
    date: "August 22, 2026",
    title: "Control direction and focus recovery",
    details: [
      "Added Normal / Inverted selectors for pitch, roll, and yaw.",
      "Applied axis direction consistently across keyboard, mouse, Xbox-style, and joystick inputs.",
      "Cleared held inputs when the browser loses focus so controls cannot remain stuck.",
    ],
  },
  {
    version: "v0.1.007",
    date: "August 22, 2026",
    title: "Runway start and throttle-gated liftoff",
    details: [
      "Start every flight on the runway at 0% throttle and 0 ft altitude.",
      "Require throttle input to build speed before liftoff can occur.",
      "Keep level flight from gaining altitude unless the pilot pitches up.",
    ],
  },
  {
    version: "v0.1.006",
    date: "August 22, 2026",
    title: "Joystick profiles and clean public site",
    details: [
      "Removed repository references and links from the public site.",
      "Added a key-mapping menu with keyboard, mouse, Xbox-style, SideWinder, and Extreme 3D Pro profiles.",
      "Added automatic joystick profile detection and axis/button mappings for SideWinder and Extreme 3D Pro devices.",
      "Rebuilt the downloadable PWA package with every local asset needed to run the browser app.",
    ],
  },
  {
    version: "v0.1.005",
    date: "August 22, 2026",
    title: "Download-first PWA release",
    details: [
      "Moved the full changelog to its own public page.",
      "Added a downloadable offline PWA package for local flight testing.",
      "Removed the embedded simulator from the public landing page.",
      "Simplified the simulator world-space overlay and kept throttle feedback below the flight readouts.",
    ],
  },
  {
    version: "v0.1.004",
    date: "August 22, 2026",
    title: "Open-world flight clarity",
    details: [
      "Opened the full pitch and roll range for aerobatics such as loops and barrel rolls.",
      "Scaled distant terrain items with altitude and cleared trees from the runway approach.",
      "Moved throttle feedback below the flight readouts and simplified the FPV compass.",
    ],
  },
  {
    version: "v0.1.003",
    date: "August 22, 2026",
    title: "Open-world FPV pass",
    details: [
      "Added a low-altitude first-person FPV view with a drone frame and telemetry HUD.",
      "Added a V key / button toggle between FPV and chase views.",
      "Extended procedural tree landmarks across the open world.",
    ],
  },
  {
    version: "v0.1.002",
    date: "August 22, 2026",
    title: "World terrain pass",
    details: [
      "Added world-anchored terrain tiles and tree landmarks.",
      "Kept the runway stationary on the terrain through turns.",
      "Added runway end markings 18/S and 36/N.",
    ],
  },
  {
    version: "v0.1.001",
    date: "August 22, 2026",
    title: "Initial simulator",
    details: [
      "Added deterministic takeoff and landing training.",
      "Mapped mouse, keyboard, and Xbox-style controls.",
      "Added the first regression suite for the flight loop.",
    ],
  },
];
