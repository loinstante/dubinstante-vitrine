// Post-build step. The Vite build only produces an empty shell that needs
// JavaScript to show anything; this writes one static HTML file per page and
// language, with its own <head>, so crawlers that do not run JavaScript (AI
// answer engines, social previews) get the real content. It also generates
// sitemap.xml and llms.txt from the same page table (src/seo.ts).
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

process.env.NODE_ENV ??= "production";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const {
  renderPage,
  getPageMeta,
  localizedPath,
  PAGES,
  LANGUAGES,
  SITE_URL,
  FAQ,
  CURRENT_VERSION,
  GITHUB_REPO_URL,
} = await import(pathToFileURL(join(ssrDir, "entry-server.js")).href);

const template = await readFile(join(dist, "index.html"), "utf8");
const buildDate = new Date().toISOString().slice(0, 10);

// Replacer functions keep "$" in the content literal; a missing anchor fails the build
// instead of silently shipping the empty shell.
function fill(html, pattern, replacement) {
  const result = html.replace(pattern, () => replacement);
  if (result === html) throw new Error(`prerender: ${pattern} not found in dist/index.html`);
  return result;
}

async function writePage(file, path, language, marker) {
  const { head, body } = await renderPage(path, language, buildDate);
  let html = fill(template, /<!--seo:start-->[\s\S]*<!--seo:end-->/, head);
  html = fill(html, '<div id="root"></div>', `<div id="root" data-prerendered="${marker}">${body}</div>`);
  if (language !== "fr") html = fill(html, '<html lang="fr"', `<html lang="${language}"`);
  await mkdir(dirname(join(dist, file)), { recursive: true });
  await writeFile(join(dist, file), html);
}

for (const { path } of PAGES) {
  for (const language of LANGUAGES) {
    const url = localizedPath(path, language);
    await writePage(url === "/" ? "index.html" : `${url.slice(1)}/index.html`, path, language, url);
  }
}
// Served by the host for every unknown URL, with a real 404 status. The marker never
// matches a pathname, so the client renders it afresh in the visitor's language.
await writePage("404.html", "/404", "fr", "404");

const sitemapUrls = PAGES.flatMap(({ path }) =>
  LANGUAGES.map((language) => {
    const { canonical, alternates } = getPageMeta(path, language);
    const links = Object.entries(alternates)
      .map(([hreflang, href]) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`)
      .join("\n");
    return `  <url>\n    <loc>${canonical}</loc>\n    <lastmod>${buildDate}</lastmod>\n${links}\n  </url>`;
  }),
);
await writeFile(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapUrls.join("\n")}\n</urlset>\n`,
);

// llms.txt (llmstxt.org): a plain-text briefing for AI assistants.
const llmsSection = (language) => {
  const pages = PAGES.map(({ path }) => {
    const { title, description, canonical } = getPageMeta(path, language);
    return `- [${title}](${canonical}): ${description}`;
  });
  const faq = FAQ[language].map(({ q, a }) => `### ${q}\n\n${a}`);
  return [...pages, "", ...faq].join("\n");
};
await writeFile(
  join(dist, "llms.txt"),
  `# DubInstante

> ${getPageMeta("/", "en").description}

- Version: ${CURRENT_VERSION} (public beta)
- Price: free
- Licence: EUPL-1.2 (open source)
- Platforms: Windows 10/11, Linux (AppImage). macOS on hold, Android being rewritten.
- Source code: ${GITHUB_REPO_URL}
- Website: ${SITE_URL}/ (French) and ${SITE_URL}/en (English)
- Last updated: ${buildDate}

## English

${llmsSection("en")}

## Français

${llmsSection("fr")}
`,
);

await rm(ssrDir, { recursive: true, force: true });
console.log(`prerender: ${PAGES.length * LANGUAGES.length} pages + 404.html, sitemap.xml, llms.txt`);
