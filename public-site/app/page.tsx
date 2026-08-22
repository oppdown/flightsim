export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-nav">
        <a className="brand" href="#top" aria-label="Flight Lab home">
          <span className="brand-mark">FL</span>
          <span>Flight Lab</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="/download">Download</a>
          <a href="/changelog">Changelog</a>
        </nav>
      </header>

      <section id="top" className="hero-grid" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">PUBLIC FLIGHT TRAINING LAB · v0.1.009</p>
          <h1 id="page-title">Learn the runway by flying it.</h1>
          <p className="hero-lede">
            A focused, deterministic open world for low-altitude flight, FPV exploration,
            turns, approach, and touchdown with a mouse, keyboard, or Xbox controller.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="/download">Download the PWA <span aria-hidden="true">↓</span></a>
            <a className="secondary-action" href="/changelog">Read the changelog</a>
          </div>
        </div>
        <aside className="hero-note" aria-label="Current build summary">
          <p className="note-label">Current build</p>
          <p className="note-value">Open world · FPV + chase</p>
          <p className="note-copy">The runway stays fixed while the aircraft moves through terrain, trees, and distant landmarks.</p>
        </aside>
      </section>

      <footer className="site-footer">
        <span>Flight Lab · A standalone oppdown project</span>
      </footer>
    </main>
  );
}
