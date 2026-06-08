# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio site at [constantin.saguin.com](https://constantin.saguin.com). Dead simple static single-page HTML/CSS with no dependencies, no build step, and no package manager.

## Previewing

Open `index.html` directly in a browser — no server required.

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which SSHs into SiteGround and runs `git pull` + copies `index.html` and `img/` to the web root. There is no staging environment.

## Structure

Everything lives in `index.html`: all HTML, all CSS (inside `<style>`), and all JS (inside `<script>`). The `img/` folder holds the two project screenshots (`sable.png`, `wolf-store.png`).

## Design tokens

All colours, fonts, and spacing primitives are defined as CSS custom properties on `:root` at the top of the `<style>` block. Modify those variables first before touching individual rules.

## Code style

- Indentation: **tabs**, width 4 (enforced by `.editorconfig`)
- Line endings: LF
- Fonts: `DM Mono` (monospace/body) and `Syne` (headings), loaded from Google Fonts
