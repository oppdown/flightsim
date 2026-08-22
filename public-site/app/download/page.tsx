export default function DownloadPage() {
  return (
    <main className="site-shell page-shell">
      <header className="site-nav">
        <a className="brand" href="/" aria-label="Flight Lab home">
          <span className="brand-mark">FL</span>
          <span>Flight Lab</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="/download" aria-current="page">Download</a>
          <a href="/changelog">Changelog</a>
        </nav>
      </header>

      <section className="page-hero" aria-labelledby="download-title">
        <p className="eyebrow">STANDALONE TEST BUILD · v0.1.010</p>
        <h1 id="download-title">Download Flight Lab.</h1>
        <p className="page-lede">The simulator is now distributed as a small offline-ready PWA package so testers can run it separately from the public site.</p>
      </section>

      <section className="download-card" aria-labelledby="package-title">
        <div>
          <p className="eyebrow">PWA PACKAGE</p>
          <h2 id="package-title">Flight Lab v0.1.010</h2>
          <p>Includes the simulator, install manifest, offline cache, and app icon. The public site no longer embeds the playable simulator.</p>
        </div>
        <a className="primary-action download-action" href="/downloads/flight-lab-pwa-v0.1.010.zip" download>
          Download PWA package <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="download-steps" aria-labelledby="steps-title">
        <p className="eyebrow">TESTER SETUP</p>
        <h2 id="steps-title">Run it locally</h2>
        <ol>
          <li>Download and unzip the package.</li>
          <li>Serve the unzipped folder from a local web server.</li>
          <li>Open the local address in a Chromium-based browser and choose Install Flight Lab.</li>
        </ol>
        <p className="page-note">A local server is required for browser PWA installation and offline caching. The package remains fully self-contained.</p>
      </section>

      <footer className="site-footer">
        <a href="/">← Back to Flight Lab</a>
        <a href="/changelog">View changelog →</a>
      </footer>
    </main>
  );
}
