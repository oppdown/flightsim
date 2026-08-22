import { changes } from "../changelog-data";

export default function ChangelogPage() {
  return (
    <main className="site-shell page-shell">
      <header className="site-nav">
        <a className="brand" href="/" aria-label="Flight Lab home">
          <span className="brand-mark">FL</span>
          <span>Flight Lab</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="/download">Download</a>
          <a href="/changelog" aria-current="page">Changelog</a>
          <a className="nav-cta" href="https://github.com/oppdown/flightsim" target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="page-hero" aria-labelledby="changelog-title">
        <p className="eyebrow">ITERATION LOG</p>
        <h1 id="changelog-title">Changelog</h1>
        <p className="page-lede">The version history for the standalone Flight Lab simulator and its tester-facing releases.</p>
      </section>

      <section className="changelog-section" aria-label="Flight Lab version history">
        <div className="changelog-list">
          {changes.map((change) => (
            <article className="change-entry" key={change.version}>
              <div className="change-meta">
                <span className="change-version">{change.version}</span>
                <span>{change.date}</span>
              </div>
              <div className="change-body">
                <h2>{change.title}</h2>
                <ul>
                  {change.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <a href="/">← Back to Flight Lab</a>
        <a href="/download">Download the PWA →</a>
      </footer>
    </main>
  );
}
