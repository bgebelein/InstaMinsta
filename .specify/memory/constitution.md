<!--
  Sync Impact Report
  ==================
  Version change: N/A → 1.0.0 (initial ratification)
  Modified principles: N/A (initial creation)
  Added sections:
    - Core Principles (4): Code Quality, Testing Standards,
      UX Consistency, Performance Requirements
    - Technology Constraints
    - Development Workflow
    - Governance
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ no changes needed
      (Constitution Check section is dynamic)
    - .specify/templates/spec-template.md ✅ no changes needed
    - .specify/templates/tasks-template.md ✅ no changes needed
    - .specify/templates/checklist-template.md ✅ no changes needed
  Follow-up TODOs: none
-->

# Quadra Cam Constitution

## Core Principles

### I. Code Quality

All source code in this project MUST adhere to the following
non-negotiable standards:

- Every JavaScript file MUST be formatted with Prettier before
  commit. The project Prettier config (with
  `prettier-plugin-tailwindcss`) is the single source of truth
  for formatting rules.
- Functions MUST have a single, clear responsibility. A function
  exceeding 40 lines of logic SHOULD be decomposed unless
  decomposition would reduce clarity.
- Global mutable state MUST be minimised. Camera state, filter
  state, and UI state MUST be managed through well-defined
  modules or clearly scoped variables — not ad-hoc globals.
- CSS MUST be authored in `src/styles.css` using Tailwind CSS v4
  utilities. Inline styles are prohibited except where
  dynamically computed at runtime (e.g., Canvas operations).
- Dead code, commented-out code blocks, and unused imports MUST
  be removed before merging to the main branch.
- All HTML MUST be valid and semantic. Accessibility attributes
  (`aria-*`, `alt`, `role`) MUST be present where applicable.

**Rationale**: A PWA with direct DOM manipulation and Canvas
rendering can degrade quickly without strict code hygiene.
Consistent style and minimal state surface reduce bugs in
camera and filter logic.

### II. Testing Standards

Every feature and bug fix MUST be accompanied by appropriate
verification:

- Manual test scripts MUST be documented in the PR description
  for any change affecting camera, filters, or UI behaviour.
  Each script MUST list: preconditions, steps, expected result.
- Browser compatibility MUST be verified on at least Chrome
  (latest), Firefox (latest) and Safari (latest) before merging.
- The production build (`npm run build`) MUST complete without
  errors. A broken build MUST NOT be merged.
- Regression checks: any change to filter rendering MUST be
  verified against the existing 44 filter set to ensure no
  visual regressions.
- When automated tests are introduced in future, they MUST
  follow a red-green-refactor cycle: write the failing test
  first, then implement, then refactor.

**Rationale**: As a camera PWA relying on device APIs and Canvas,
automated unit testing has limited coverage. Rigorous manual
verification with documented scripts fills this gap until an
automated visual regression framework is adopted.

### III. User Experience Consistency

The user interface MUST deliver a consistent, predictable
experience across devices and interactions:

- The camera viewfinder MUST always maintain a square aspect
  ratio (`aspect-square`) regardless of device screen size.
- Filter previews MUST visually match the final captured image.
  Where platform limitations prevent this (e.g., mobile Safari
  Canvas filters), the limitation MUST be disclosed to the user.
- UI controls (filter selection, shutter, torch, camera switch)
  MUST be reachable with one hand on mobile devices. Critical
  actions MUST be in the bottom 40% of the viewport.
- Touch targets MUST be at least 44×44 CSS pixels per WCAG 2.5.8
  guidelines.
- State transitions (camera switch, torch toggle, filter change)
  MUST provide immediate visual feedback within 100ms of user
  action.
- The app MUST function offline after initial load as a PWA.
  The service worker and manifest MUST be kept in sync with any
  new assets.

**Rationale**: Camera apps are inherently real-time. Users expect
instant feedback and visual fidelity. Inconsistencies between
preview and capture erode trust in the product.

### IV. Performance Requirements

The app MUST meet the following performance targets to ensure a
smooth camera experience:

- First Contentful Paint MUST be under 1.5 seconds on a 4G
  connection with a mid-range mobile device.
- Total transferred size of all static assets (HTML, CSS, JS,
  icons) MUST NOT exceed 200 KB gzipped, excluding user-captured
  images.
- The camera preview MUST render at a minimum of 30 fps. Filter
  overlays on the live preview MUST NOT cause frame drops below
  24 fps.
- Image capture and filter application MUST complete within
  500ms on a mid-range device.
- The production build pipeline (`npm run build`) MUST produce
  minified HTML, CSS, and JS. No unminified assets are permitted
  in the `public/` output directory.
- CSS MUST be purged of unused utilities by the Tailwind CLI
  build. The final CSS bundle SHOULD be under 15 KB gzipped.

**Rationale**: A PWA camera app competes with native camera apps.
Perceptible lag in preview, capture, or startup directly drives
user abandonment.

## Technology Constraints

The following technology decisions are binding for this project:

- **Runtime**: Vanilla JavaScript (ES2020+). No framework
  (React, Vue, etc.) unless a future constitution amendment
  explicitly approves it.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/cli`. No
  additional CSS preprocessors (Sass, Less).
- **Build**: `npm run build` pipeline using `tailwindcss`,
  `html-minifier-terser`, `uglify-js`, and `cpy-cli`.
- **Hosting**: Firebase Hosting as defined in `firebase.json`.
- **PWA**: Service worker and `site.webmanifest` MUST be
  maintained for offline capability.
- **Source of truth**: `src/` directory. The `public/` directory
  is a build artifact and MUST NOT be edited directly.
- **Node packages**: New dependencies MUST be justified. The
  project intentionally keeps a minimal dependency footprint.

## Development Workflow

All contributors MUST follow this workflow:

- **Branching**: Feature work MUST occur on a dedicated branch.
  Direct commits to the main branch are prohibited.
- **Build verification**: `npm run build` MUST succeed before
  requesting review.
- **Formatting**: Run Prettier on all changed files before
  commit. The Tailwind plugin MUST be active to sort utility
  classes.
- **PR description**: Every pull request MUST include:
  (1) summary of changes, (2) manual test script,
  (3) screenshots or screen recordings for UI changes.
- **Known issues**: If a change is known to not work on a
  specific platform, it MUST be added to the README Known Issues
  section immediately.

## Governance

This constitution is the highest authority governing development
practices for Quadra Cam. All pull requests and code reviews
MUST verify compliance with these principles.

- **Amendments**: Any change to this constitution MUST be
  documented with a rationale, reviewed by the project owner,
  and result in a version increment following semantic
  versioning (MAJOR for principle removals/redefinitions, MINOR
  for additions/expansions, PATCH for clarifications).
- **Compliance reviews**: At least once per quarter, the project
  owner SHOULD audit recent changes against these principles and
  record findings.
- **Conflict resolution**: If a principle conflicts with a
  practical constraint, the constraint MUST be documented as a
  temporary exception with a remediation plan and timeline.

**Version**: 1.0.0 | **Ratified**: 2026-04-21 | **Last Amended**: 2026-04-21
