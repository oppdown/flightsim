const changes = [
  {
    version: "Unreleased",
    date: "August 22, 2026",
    title: "Ground contact and public iteration workflow",
    details: [
      "Any aircraft-to-ground contact now registers as a landing event.",
      "Safe touchdown constraints remain separately graded for speed, pitch, and roll.",
      "The public site now carries the simulator and its change history.",
    ],
  },
  {
    version: "0.2.0",
    date: "August 22, 2026",
    title: "World terrain pass",
    details: [
      "Added world-anchored terrain tiles and tree landmarks.",
      "Kept the runway stationary on the terrain through turns.",
      "Added runway end markings 18/S and 36/N.",
    ],
  },
  {
    version: "0.1.0",
    date: "August 22, 2026",
    title: "Initial simulator",
    details: [
      "Added deterministic takeoff and landing training.",
      "Mapped mouse, keyboard, and Xbox-style controls.",
      "Added the first regression suite for the flight loop.",
    ],
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-nav">
        <a className="brand" href="#top" aria-label="Flight Lab home">
          <span className="brand-mark">FL</span>
          <span>Flight Lab</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#simulator">Simulator</a>
          <a href="#changelog">Changelog</a>
          <a className="nav-cta" href="https://github.com/oppdown/flightsim" target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section id="top" className="hero-grid" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">PUBLIC FLIGHT TRAINING LAB · BUILD 0.2</p>
          <h1 id="page-title">Learn the runway by flying it.</h1>
          <p className="hero-lede">
            A focused, deterministic flight simulator for practicing takeoff,
            turns, approach, and touchdown with a mouse, keyboard, or Xbox controller.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#simulator">Fly the training sector <span aria-hidden="true">↓</span></a>
            <a className="secondary-action" href="#changelog">See what changed</a>
          </div>
        </div>
        <aside className="hero-note" aria-label="Current build summary">
          <p className="note-label">Current build</p>
          <p className="note-value">World terrain · 18 / 36</p>
          <p className="note-copy">The runway stays fixed while the aircraft moves through the environment.</p>
          <div className="note-rule" />
          <p className="note-label">Test status</p>
          <p className="note-value"><span className="status-dot" /> 9 regression checks passing</p>
        </aside>
      </section>

      <section id="simulator" className="simulator-section" aria-labelledby="simulator-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TRAINING SECTOR 01</p>
            <h2 id="simulator-title">Takeoff &amp; landing trainer</h2>
          </div>
          <p className="section-side-note">Start flight · Move inside the view</p>
        </div>
        <div className="simulator-frame">
          <iframe
            src="/flight-simulator.html"
            title="Flight Lab takeoff and landing simulator"
            loading="eager"
          />
        </div>
      </section>

      <section id="changelog" className="changelog-section" aria-labelledby="changelog-title">
        <div className="section-heading changelog-heading">
          <div>
            <p className="eyebrow">ITERATION LOG</p>
            <h2 id="changelog-title">Changelog</h2>
          </div>
          <p className="section-side-note">Every build is tested before it ships.</p>
        </div>
        <div className="changelog-list">
          {changes.map((change) => (
            <article className="change-entry" key={change.version}>
              <div className="change-meta">
                <span className="change-version">{change.version}</span>
                <span>{change.date}</span>
              </div>
              <div className="change-body">
                <h3>{change.title}</h3>
                <ul>
                  {change.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <span>Flight Lab · A standalone oppdown project</span>
        <a href="https://github.com/oppdown/flightsim" target="_blank" rel="noreferrer">View source on GitHub ↗</a>
      </footer>
    </main>
  );
}
