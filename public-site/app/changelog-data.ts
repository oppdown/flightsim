export type Change = {
  version: string;
  date: string;
  title: string;
  details: string[];
};

export const changes: Change[] = [
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
