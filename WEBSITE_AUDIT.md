# DubInstante website remake — audit

Date: 22 September 2026  
Scope: the in-progress website in this repository, compared with the currently
deployed showroom at <https://dubinstante.vercel.app/> and the public software
repository at <https://github.com/loinstante/DubInstante>.

## Executive verdict

The remake is a substantial improvement. It moves the site from a concise,
mostly one-page introduction to a credible product showroom with dedicated
download, feature, comparison, documentation, and roadmap journeys.

The new direction is especially stronger in product explanation, visual
consistency, bilingual content, and user paths. It should **not** be deployed
unchanged: download/source-link validation, claim verification, mobile UX,
accessibility, and language/SEO behavior are still required.

The production build was run successfully on 22 September 2026:

```text
npm run build
✓ built successfully
```

No site files were changed as part of this audit.

## Priority summary

| Priority | Action | Why it matters |
| --- | --- | --- |
| P0 | Correct and test every GitHub, release, issue, and binary-download URL. | A broken primary CTA destroys trust and prevents conversion. |
| P0 | Verify public claims against the software and release artifacts. | Specific but unverified performance, compatibility, comparison, and audio claims create legal and credibility risk. |
| P1 | Fix language URL state, `hreflang`, `html[lang]`, titles, and route metadata. | English discovery and SEO currently do not work as declared. |
| P1 | Complete the responsive/accessibility pass. | Text contrast, narrow controls, mobile comparison tables, and menu behavior need attention. |
| P2 | Add repeatable quality checks to CI. | Prevents regressions in links, accessibility, responsive rendering, and release configuration. |

## Critical launch blockers

### 1. Repository and download target mismatch

`src/config/downloads.ts` points all primary repository, release, and binary
links to `https://github.com/loimathos/DubInstante`.

The public project supplied for this audit is
<https://github.com/loinstante/DubInstante>. The public release also belongs to
that repository:
<https://github.com/loinstante/DubInstante/releases/tag/V0.11.0_FOUR_BUD>.

Before deployment:

- Confirm the canonical owner/repository URL.
- Update `GITHUB_REPO_URL`, `GITHUB_RELEASES_URL`, and `S3_OR_CDN_BASE`.
- Verify every direct binary filename against the release assets—not only that
  the release page exists.
- Test every card from desktop and mobile, including OS detection fallback.
- Add SHA-256 hashes and a release-notes link alongside download buttons.

Affected source: `src/config/downloads.ts` and all CTAs that consume it.

### 2. Marketing claims need an evidence pass

The v0.11 release does support the central claim of up to four dynamic rythmo
bands and an N-channel FFmpeg mix. It does not, by itself, establish every
claim used throughout the site.

Review and either document, qualify, or remove claims such as:

- "microsecond" or sub-frame synchronization;
- zero latency, zero dropped frames, and zero-latency loading of 50 GB+ files;
- guaranteed 24-bit/48 kHz recording on all platforms and interfaces;
- universal 4K, H.264, H.265, ProRes, MP4, MOV, MKV, and codec support;
- lossless/no-re-encode exports in cases where codecs or containers require
  transcoding;
- Windows/macOS/Linux/Android support and the precise minimum OS versions;
- competitor prices, account/cloud/DRM claims, and platform restrictions.

For competitor comparisons, give sources and a "prices/features checked on"
date. Prefer statements about DubInstante's own capabilities over broad,
unsourced negative assertions about other products.

### 3. English language and SEO declarations disagree with the product

`index.html` declares English alternate content at `?lang=en`, but the
application does not read that query parameter. Language is chosen from local
storage/browser language and only written to `document.documentElement.lang`
when a visitor actively toggles it.

Consequences:

- Search engines can be directed to a URL that does not guarantee English.
- An English-browser visitor can receive English UI while the document remains
  declared French.
- The homepage document title and static meta tags remain French in English.

Use a single canonical language mechanism, for example `/fr/...` and `/en/...`,
or a supported `?lang=` parameter. Set HTML language at initialization, use
route- and language-specific title/description/canonical/OG metadata, and make
the sitemap match those URLs.

## Category-by-category assessment

### Brand and visual system — better

The new black/zinc studio surfaces, REC red, restrained film texture, and
Space Grotesk/Inter/JetBrains Mono hierarchy feel much more like a post-
production tool. The visual language is coherent across the hero, cards,
simulator, comparison matrix, and technical pages.

What to improve:

- Red is a strong functional recording signal, but used as the universal CTA
  color it becomes less distinctive. Keep it for recording/destructive/live
  states and introduce one subtle, ownable secondary accent if differentiation
  matters.
- Test film grain, blur, vignette, and animated glows on lower-end mobile
  hardware. Decoration should never make the site feel less responsive than
  the native software it promotes.
- Preserve the existing light theme's warmth, but test it with real content
  rather than only card components.

### Positioning and first impression — better

"Le studio libre de bande rythmo et doublage" is clearer and more specific
than a general "professional methods for all" value proposition. The new hero
also establishes open source, local-first, and native technology quickly.

What to improve:

- Define "bande rythmo" once in plain language near the hero. Newcomers may
  not know the term, even if it is perfect terminology for professionals.
- Keep the outcome visible: faster takes, less eye movement, better lip sync,
  and independent ownership. Technical proof should reinforce—not replace—the
  human benefit.
- Avoid promising every advanced capability in the hero. Make the first screen
  legible to an actor, student, and small studio in under ten seconds.

### Information architecture — much better

Dedicated routes for `/download`, `/features`, `/pourquoi`, `/documentation`,
and `/roadmap` support distinct jobs instead of forcing all visitors through a
single long landing page. Lazy loading also keeps deeper routes out of the
initial JavaScript path.

What to improve:

- The desktop navigation now has five links plus theme/language/GitHub/download
  controls. It is likely too tight around 768–1024px. Keep the mobile drawer
  until `lg`, not merely `md`.
- The homepage still contains many major sections. Keep the strongest proof and
  CTA early; use deeper pages for exhaustive technical detail.
- Add an intentional 404 page. The current wildcard route renders the landing
  page for an unknown URL, creating a soft 404 for visitors and search engines.
- Mark the active page in navigation with `aria-current="page"` and visual
  state.

### Product demonstration and interactions — better

The native screenshot plus keyboard-controllable rythmo simulator provide real
evidence of interaction rather than relying entirely on marketing copy. The
simulator's direct DOM animation is also a thoughtful implementation choice.

What to improve:

- Clearly describe the simulator as a representative demonstration, rather
  than footage from a real session.
- Provide accessible tab semantics: `role="tablist"`, `role="tab"`,
  `aria-selected`, and associated panels for the screenshot/simulator switch.
- Add visible labels or `aria-label`s to icon-only previous-frame,
  next-frame, and speed controls.
- At 320px, the simulator's bottom control groups are likely wider than the
  available space. Permit wrapping or use a compact mobile layout.
- Give anchor targets a `scroll-margin-top` so the fixed header does not hide
  the destination heading.

### Mobile experience — better foundation, needs a device pass

Cards stack cleanly, CTAs expand to usable widths, and the mobile navigation
exists. The larger content pages are naturally readable as vertical flows.

What to improve:

- Replace the four-column comparison table with a card/accordion comparison on
  small screens. Horizontal scrolling is technically functional but poor for
  evaluating a purchase decision.
- Test 320px, 375px, 390px, 768px, and 1024px widths in both themes and both
  languages. English labels are generally longer.
- Add safe wrapping to status labels, platform requirements, sticky feature
  tabs, and simulator controls.
- Make the mobile drawer a proper dialog/navigation pattern: expose expanded
  state, support Escape, restore focus to the trigger, and prevent confusing
  background interaction.

### Accessibility — improved, but not ready yet

Good foundations include descriptive screenshot alt text, reduced-motion
handling for several animations, semantic H1/H2 structure, and keyboard
control of the simulator container.

Contrast calculations for current tokens show normal-text issues:

| Foreground / background | Ratio | Result |
| --- | ---: | --- |
| `#E50914` on `#09090B` | 4.15:1 | Fails WCAG AA normal text |
| `#E50914` on `#FAF7F0` | 4.48:1 | Just fails WCAG AA normal text |
| `#71717A` on `#09090B` | 4.12:1 | Fails WCAG AA normal text |
| `#8A7E6E` on `#FAF7F0` | 3.71:1 | Fails WCAG AA normal text |
| `#FFFFFF` on `#E50914` | 4.79:1 | Passes WCAG AA normal text |

What to improve:

- Use darker red in light mode and brighter red in dark mode for small accent
  text, or reserve the existing red for large text/icons/borders.
- Raise the contrast of muted text where it conveys content rather than
  decoration.
- Add a consistent `:focus-visible` ring for all links, buttons, controls, and
  cards that can receive focus.
- Do not rely on low opacity to distinguish comparison columns when their text
  must still be read.
- Add automated axe checks and a keyboard-only manual test to the release
  checklist.

### Content and documentation — much better, needs calibration

The remake turns disconnected feature claims into usable quick-start steps,
feature groups, shortcuts, platform prerequisites, and a roadmap. This is a
major advantage over the live site.

What to improve:

- Separate user documentation from marketing. The current documentation is
  polished onboarding copy, but it is not yet a troubleshooting/reference
  manual.
- Add screenshots or short animated examples for importing, band setup,
  recording, export, project files, and first-run installation warnings.
- Include known limitations, beta status, compatibility caveats, and an upgrade
  note where the new save architecture is not backward compatible.
- Link every roadmap item to a GitHub milestone, issue, or changelog when one
  exists; otherwise label it as an intention rather than a commitment.
- EUPL 1.2 is a copyleft license. Avoid describing it as use/modification/
  redistribution "sans restriction" without linking to and accurately
  summarizing its conditions.

### Downloads and conversion — stronger design, critical operational risk

OS detection, all-platform download cards, installation notes, and a direct
path to source/releases are much better conversion mechanics than the live
site's generic beta CTA.

What to improve:

- Resolve the P0 repository mismatch before anything else.
- Display exact filename, version, release date, architecture, file size,
  checksum, and signing/notarization state on each download card.
- Explain Windows SmartScreen and macOS Gatekeeper only where applicable;
  users should not have to scan irrelevant platform warnings.
- Set external downloads to clear final asset URLs only after verifying them.
- Add a fallback button to the release page and a small "report broken
  download" route.
- Measure download-button clicks with privacy-conscious analytics or server
  logs. There is currently no way to know which path converts.

### Localization — major improvement, incomplete implementation

The previous hard-coded French UI has been expanded to substantial FR/EN
coverage across navigation, homepage, feature, comparison, documentation,
roadmap, and download experiences.

What to improve:

- Implement the language URL behavior described in the critical section.
- Translate residual fixed strings, including section labels such as `Partie
  01`, generic GitHub headings, and any remaining static French title/metadata.
- Give language buttons `aria-pressed` or an explicit current-language label.
- Translate title, description, Open Graph, Twitter, schema description, and
  social image text by language.
- Have a native-level French and English review; technical English currently
  sometimes reads as promotional rather than concise studio documentation.

### SEO, social sharing, and indexing — good baseline, incomplete for a SPA

The remake has a description, canonical URL, Open Graph/Twitter tags,
SoftwareApplication schema, robots file, and sitemap. This is a strong baseline
for a small Vite application.

What to improve:

- The app is client-rendered: initial route HTML does not contain route content.
  Search engines may render it, but pre-rendering/static generation is safer
  for important landing, feature, documentation, and comparison pages.
- Every route shares global social metadata. Add page-specific metadata and
  share images for Download, Features, Documentation, and Why pages.
- Repair the invalid `?lang=en` alternate behavior before leaving the current
  `hreflang` tags published.
- Add a useful 404 response instead of serving the landing page for every
  unknown route.
- Treat sitemap `lastmod` values as deployment-generated data, not a manually
  maintained promise.

### Performance — good initial result, keep the budget

Current production output is sensible for a React product site:

- initial application JavaScript: about 105 kB gzip;
- lazy chunks for non-landing pages;
- primary interface screenshots: approximately 88–90 kB each;
- only one primary image is initially shown.

What to improve:

- Add intrinsic `width`/`height` or `aspect-ratio` to screenshots to prevent
  cumulative layout shift.
- Add `loading="lazy"` and suitable responsive image handling to images below
  the fold.
- Consider self-hosting fonts if privacy, reliability, and first-visit speed
  are important. Google Fonts is an external request.
- Profile persistent grain, blur, and animation effects on lower-end devices.
- Establish Lighthouse performance budgets for every release rather than
  relying on bundle size alone.

### Privacy, security, and trust — strong product story, clarify site behavior

The local-first/open-source value proposition is strong and aligned with the
public repository's EUPL 1.2 licensing. There are no forms, credentials, or
obvious client-side security-sensitive flows in this showroom.

What to improve:

- Distinguish "the desktop application does not use cloud/telemetry" from the
  website's own external requests. Google-hosted fonts are not fully local.
- Publish a concise privacy page explaining analytics (or the absence of them),
  third-party font loading, cookies/local storage for theme/language, and
  download hosting.
- Keep `rel="noopener noreferrer"` on every external `target="_blank"` link;
  the current implementation generally does this correctly.
- If analytics are added, use an explicit consent/privacy policy consistent
  with EU visitors and the local-first message.

### Engineering and deployment — solid base, automate quality

Strengths:

- React, TypeScript, Vite, and route-level lazy loading are used coherently.
- Version/download configuration is centralized.
- Vercel rewrite support enables direct SPA routes.
- The build completes successfully.

What to improve:

- Add `lint`, unit tests, and CI checks; the current package scripts only build
  and run the development/preview servers.
- Add link checking for internal routes, external GitHub URLs, and release
  assets.
- Add visual regression screenshots at representative desktop/mobile widths.
- Add automated accessibility checks and a manual keyboard/mobile checklist.
- Make release details configurable from a single verified source or GitHub
  release API/build-time data to avoid stale version, size, and URL claims.

## Recommended launch checklist

### Required before public deployment

- [ ] Confirm the canonical GitHub owner and correct all repository/release/
      asset links.
- [ ] Download and validate every platform artifact from the production site.
- [ ] Reconcile all product claims with source code, release notes, and actual
      test results.
- [ ] Repair language routing, `html lang`, `hreflang`, canonical URLs, and
      translated metadata.
- [ ] Fix normal-text contrast failures and keyboard focus treatment.
- [ ] Test the comparison, header, menu, and simulator at 320/375/390/768/1024
      pixel widths in both themes and languages.
- [ ] Replace wildcard-to-home behavior with an actual 404 page.

### Recommended immediately after launch

- [ ] Add checksums, signatures/notarization status, and release notes to the
      download experience.
- [ ] Add a focused privacy page.
- [ ] Add privacy-conscious conversion events for downloads and GitHub visits.
- [ ] Add a concise beta/known-limitations page.
- [ ] Add source-linked references to factual competitor comparisons.

### Quality system for future releases

- [ ] CI: TypeScript build, lint, link checker, accessibility scan.
- [ ] CI: verify configured release URLs return the intended asset type.
- [ ] CI: desktop/mobile visual snapshots in light and dark themes.
- [ ] Release review: content/claim verification by a maintainer who knows the
      native application.
- [ ] Release review: manual keyboard-only and real-device mobile pass.

## Bottom line

Keep the new direction. It is more focused, more useful, more visually mature,
and much closer to the standard expected of professional creative software.

The highest-value next move is not another visual redesign: make the existing
experience trustworthy. Correct download/source links, make only defensible
claims, finish the language/SEO mechanics, and complete the mobile/accessibility
pass. Those changes will make the redesign feel as dependable as it looks.
