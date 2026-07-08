# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Knowledge base
Main KB: `/mnt/c/Users/Constantin/dev/wolf-claude-memory/`
Read relevant wiki pages before starting work. Key pages:
- `wiki/products/constantin.saguin.com/constantin.saguin.com.md` — this site's current state, design system, and content

## What this is

Personal portfolio site at [constantin.saguin.com](https://constantin.saguin.com). Static single-page site, no build step and no package manager — but it does load one runtime dependency (Lenis, for smooth scrolling) as a native ES module straight from a CDN. See "Structure" below.

## Audience

Primary audience is **technical recruiters and hiring managers** — not developers. Copy should lead with impact, scope, and recognizable buzzwords (WordPress, WooCommerce, React, PHP, Gutenberg). Avoid architecture jargon that only makes sense to engineers ("namespaced", "CSS custom properties", "PSR-4"). When writing or editing any copy, ask: would a recruiter scanning for 10 seconds understand what this person built and why it matters?

## Previewing

Needs a local server now — browsers block ES module imports (`js/main.js` and its `import`s) over `file://`. From the repo root: `python3 -m http.server 8000` (or any static server) and open `http://localhost:8000/`.

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which SSHs into SiteGround and runs `git pull` + copies `index.html` and `img/` to the web root. There is no staging environment.

## Structure

- `index.html` — all HTML, plus the Google Fonts `<link>`s and one `<script type="module" src="js/main.js">`. No inline `<style>`/`<script>` blocks — CSS lives in `style.css`, JS lives in `js/`.
- `style.css` — single stylesheet, design tokens as CSS custom properties on `:root` (see below).
- `js/` — small single-purpose ES modules (`smooth-scroll.js`, `craft-counter.js`, `typewriter.js`, `scroll-reveal.js`, `stat-counters.js`, `signature-reveal.js`), wired together by `js/main.js`. No bundler: the browser loads these as native ES modules directly. `smooth-scroll.js` imports Lenis from a pinned jsDelivr CDN URL — the only external runtime dependency, and it's loaded the same way as a `<script type="module">` import map would, just without one.
- `img/` — project screenshots, the CV PDF, and site SVGs (signature, logos).

## Design tokens

All colours, fonts, and spacing primitives are defined as CSS custom properties on `:root` at the top of the `<style>` block. Modify those variables first before touching individual rules.

## Code style

- Indentation: **tabs**, width 4 (enforced by `.editorconfig`)
- Line endings: LF
- Fonts: `DM Mono` (monospace/body) and `Syne` (headings), loaded from Google Fonts
