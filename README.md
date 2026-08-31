# Intelligent Network Design (지능형네트워크설계)

Cisco Packet Tracer lab manual and lecture slides for Intelligent Network
Design, Software Convergence 001, 한경국립대학교 Hankyong National University.
Deployed via GitHub Pages, see `.github/workflows/deploy.yml`.

Read `SPINE.md` first: it defines the pedagogical structure every lecture
deck follows (motivation before definition, modules chained via a
Limits-to-Pain handoff). `OUTLINE.md` has the full 15-week plan and chain
table.

## Layout

```
SPINE.md                  standard lecture structure, read this first
OUTLINE.md                 15-week plan + Limits-to-Pain chain
themes/hankyong.css        Marp theme, HKNU colors
assets/hankyong-*.png      university logo (color + white variants)
book/                      mdBook lab manual - full guided labs, rubrics
  src/
    introduction.md
    module-01.md ... module-12.md (no module-08: midterm week)
    project/                capstone brief, rubric
    appendix/                command reference, references
slides/
  _template/module-XX.md   copy this to start a new module deck
  _shared/roadmap.md       Act-0 roadmap graphic, paste into slot 2
  module-01.md ... module-12.md   17-slot lecture decks - module-01.md
                           opens with a course-logistics prelude
                           (outside the spine numbering)
landing/index.html          site root - links the book and every deck
```

## Setup

Requires Node.js. First run installs marp-cli into `node_modules` via
`npx`. No separate `npm install` step needed.

```bash
npx @marp-team/marp-cli --version   # confirms marp-cli resolves
```

## Preview slides in a browser (live reload)

```bash
npx @marp-team/marp-cli -s slides --theme-set themes/hankyong.css
```

## Zero-install alternative: VS Code

Install the **Marp for VS Code** extension, open any `slides/*.md` file,
and use the built-in preview pane. To pick up the custom theme, add to VS
Code settings:

```json
"markdown.marp.themes": ["./themes/hankyong.css"]
```

## Build the book

```bash
mdbook build book   # -> book/book/, open book/book/index.html
```

## Release the book as per-chapter PDFs

```bash
npm run build:book-pdfs   # -> book/pdf/*.pdf, one per SUMMARY.md chapter, + book/pdf/index.html
```

Renders each already-built chapter page to its own PDF via headless
Chrome/Chromium (`scripts/build-book-pdfs.js`). Needs a `google-chrome` or
`chromium` binary on PATH (or `$CHROME_PATH`) - GitHub Actions'
`ubuntu-latest` runners ship Chrome preinstalled, so CI needs no extra
install step. Wired into `.github/workflows/deploy.yml`, published at
`/book/pdf/` on the live site.

## Build the slides

```bash
npm run build:html   # -> dist/slides/*.html, self-contained
npm run build:pdf     # -> dist/slides/*.pdf
npm run build:pptx    # -> dist/slides/*.pptx, editable in PowerPoint/Impress
```

`build:pptx` passes marp-cli's `--pptx-editable` flag (experimental), which
produces a PPTX with real, editable text boxes instead of one slide image
per page - it needs LibreOffice (`soffice`) on PATH to do the conversion.
CI installs it (`libreoffice`, ubuntu-latest does not ship it) and runs the
same conversion with `--parallel 1 --browser-timeout 120`, serializing
decks so concurrent Chrome/LibreOffice instances do not collide, and
bounding each one so a stuck conversion cannot hang the whole batch.
Wired into `.github/workflows/deploy.yml`, published alongside each
deck's `.html` under `/slides/` on the live site.

## Adding a new module deck

1. Copy `slides/_template/module-XX.md` to `slides/moduleNN-topic.md`, fill
   in all 17 spine slots (see `SPINE.md`).
2. Paste the roadmap `<div>` from `slides/_shared/roadmap.md` into slot 2,
   mark the new current module's `.wk` div `class="wk now"`.
3. Preview, check against `SPINE.md`'s hard rule: no formal definition
   before slot 8.
4. Add the deck to `landing/index.html`'s deck list and to `OUTLINE.md`.

## Status

All 11 lecture decks (Modules 1–7, 9–12) are drafted, built, and themed.
Handout/worksheet/quiz materials are not yet authored - the book covers
full lab instructions, deliverables, and rubrics in the meantime.
# computer-network
