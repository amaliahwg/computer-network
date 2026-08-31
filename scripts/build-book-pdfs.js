#!/usr/bin/env node
// Renders each chapter of the built mdBook (book/book/*.html) to its own
// PDF, so the lab manual can be released chapter-by-chapter instead of
// only as a single combined book. Reads book/src/SUMMARY.md for the
// chapter list and titles, so the PDF set always matches the book's own
// table of contents.
//
// Usage: node scripts/build-book-pdfs.js [htmlDir] [outDir]
//   htmlDir defaults to book/book/ (mdbook's default local output dir)
//   outDir defaults to book/pdf/
// Pass both explicitly to target a different build output, e.g. in CI
// where the book is built straight into the Pages staging directory:
//   node scripts/build-book-pdfs.js "$SITE/book" "$SITE/book/pdf"
//
// Requires: `mdbook build` already run against htmlDir, and a
// Chrome/Chromium binary on PATH or at $CHROME_PATH. GitHub Actions'
// ubuntu-latest runners ship Google Chrome preinstalled, so CI needs no
// extra install step.

const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');
const { spawnSync, spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const BOOK_SRC = path.join(ROOT, 'book', 'src', 'SUMMARY.md');
const BOOK_HTML_DIR = path.resolve(process.argv[2] || path.join(ROOT, 'book', 'book'));
const OUT_DIR = path.resolve(process.argv[3] || path.join(ROOT, 'book', 'pdf'));

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidates = [
    'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser',
  ];
  for (const bin of candidates) {
    const r = spawnSync('which', [bin]);
    if (r.status === 0) return r.stdout.toString().trim();
  }
  throw new Error(
    'No Chrome/Chromium binary found. Set CHROME_PATH or install one of: ' +
    candidates.join(', ')
  );
}

function parseSummary(text) {
  // Walks SUMMARY.md top to bottom, tracking the most recent "# Section"
  // heading and collecting every [Title](path.md) link under it, in order.
  // The very first "# Summary" line is mdBook's own file title, not a real
  // ToC group - skip it so the Introduction (which precedes any real
  // section) isn't mislabeled under it.
  const chapters = [];
  let section = null;
  let sawRealHeading = false;
  for (const line of text.split('\n')) {
    const heading = line.match(/^#\s+(.+)/);
    if (heading) {
      if (!sawRealHeading && /^summary$/i.test(heading[1].trim())) continue;
      sawRealHeading = true;
      section = heading[1].trim();
      continue;
    }
    const link = line.match(/\[([^\]]+)\]\(([^)]+\.md)\)/);
    if (link) chapters.push({ title: link[1], mdPath: link[2], section });
  }
  return chapters;
}

function slugFor(mdPath) {
  return mdPath.replace(/\.md$/, '').replace(/\//g, '-');
}

function htmlPathFor(mdPath) {
  return mdPath.replace(/\.md$/, '.html');
}

function serveDir(dir) {
  const mime = {
    '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
    '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
  };
  const server = http.createServer((req, res) => {
    const reqPath = decodeURIComponent(req.url.split('?')[0]);
    const filePath = path.join(dir, reqPath);
    if (!filePath.startsWith(dir)) { res.writeHead(403); return res.end(); }
    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(404); return res.end('Not found'); }
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
      res.end(data);
    });
  });
  return server;
}

function buildIndexHtml(chapters) {
  const bySection = new Map();
  for (const c of chapters) {
    if (!bySection.has(c.section)) bySection.set(c.section, []);
    bySection.get(c.section).push(c);
  }
  const sections = [...bySection.entries()].map(([section, items]) => `
    ${section ? `<h2>${section}</h2>` : ''}
    <ul>
      ${items.map(c => `<li><a href="./${slugFor(c.mdPath)}.pdf">${c.title}</a></li>`).join('\n      ')}
    </ul>`).join('\n');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Lab Manual - Chapter PDFs</title>
<style>
  body{font-family:system-ui,-apple-system,sans-serif;max-width:640px;margin:2rem auto;padding:0 1.5rem;color:#1A1A1A;}
  h1{font-size:1.4rem;} h2{font-size:1rem;color:#145DA0;margin-top:1.5rem;}
  ul{list-style:none;padding:0;} li{margin:.3rem 0;}
  a{color:#00A79E;text-decoration:none;} a:hover{text-decoration:underline;}
</style>
</head>
<body>
<h1>Intelligent Network Design - Lab Manual, by chapter</h1>
<p>Each chapter below is also available as its own PDF. For the full interactive version, see the <a href="../">book</a>.</p>
${sections}
</body>
</html>
`;
}

// MUST be async (spawn, not spawnSync): our own HTTP server below serves
// the page chrome is loading. spawnSync blocks the event loop, which
// would freeze that server and deadlock chrome waiting on a page that
// can never be served - proven the hard way while building this script.
function renderChapter(chrome, profileDir, url, outPath) {
  return new Promise((resolve) => {
    const child = spawn(chrome, [
      '--headless', '--disable-gpu', '--no-sandbox',
      `--user-data-dir=${profileDir}`, '--no-first-run',
      `--print-to-pdf=${outPath}`,
      '--no-pdf-header-footer',
      '--virtual-time-budget=5000',
      url,
    ]);
    let stderr = '';
    child.stderr.on('data', (d) => { stderr += d; });
    const timer = setTimeout(() => {
      child.kill('SIGKILL');
      resolve({ ok: false, reason: 'timed out' });
    }, 30000);
    child.on('exit', (code) => {
      clearTimeout(timer);
      if (code === 0 && fs.existsSync(outPath)) resolve({ ok: true });
      else resolve({ ok: false, reason: stderr || `exit code ${code}` });
    });
    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({ ok: false, reason: err.message });
    });
  });
}

async function main() {
  if (!fs.existsSync(BOOK_HTML_DIR)) {
    console.error(`${BOOK_HTML_DIR} not found - build the book there first.`);
    process.exit(1);
  }
  const chrome = findChrome();
  const chapters = parseSummary(fs.readFileSync(BOOK_SRC, 'utf8'));
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Always use our own isolated profile dir, never the machine's default
  // Chrome profile - a stale SingletonLock there (e.g. from a killed
  // process elsewhere) hangs every new launch indefinitely otherwise.
  const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'book-pdf-chrome-'));

  const server = serveDir(BOOK_HTML_DIR);
  const port = await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server.address().port));
  });

  console.log(`Rendering ${chapters.length} chapters to PDF...`);
  for (const c of chapters) {
    const url = `http://127.0.0.1:${port}/${htmlPathFor(c.mdPath)}`;
    const outPath = path.join(OUT_DIR, `${slugFor(c.mdPath)}.pdf`);
    const result = await renderChapter(chrome, profileDir, url, outPath);
    if (!result.ok) {
      console.error(`FAILED (${result.reason}): ${c.mdPath}`);
      process.exitCode = 1;
      continue;
    }
    console.log(`  ${c.mdPath} -> book/pdf/${slugFor(c.mdPath)}.pdf`);
  }

  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), buildIndexHtml(chapters));
  console.log(`Done. ${chapters.length} PDFs + index.html written to book/pdf/`);
  server.close();
  fs.rmSync(profileDir, { recursive: true, force: true });
}

main();
