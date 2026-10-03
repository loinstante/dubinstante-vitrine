// Build-time only (see scripts/prerender.mjs): renders a page to static HTML
// together with its <head>, so the content exists without running JavaScript.
import React from "react";
import { prerender } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./App";
import { FAQ } from "./components/Faq";
import {
  CURRENT_RELEASE_URL,
  CURRENT_VERSION,
  GITHUB_REPO_URL,
  RELEASE_DATE,
} from "./config/downloads";
import { getPageMeta, localizedPath, SITE_URL, type Language } from "./seo";

export { FAQ, CURRENT_VERSION, GITHUB_REPO_URL };
export { getPageMeta, LANGUAGES, localizedPath, PAGES, SITE_URL } from "./seo";

const SCREENSHOT_URL = `${SITE_URL}/assets/dubinstante-studio-real.png`;
const SCREENSHOT_ALT: Record<Language, string> = {
  fr: "Interface de DubInstante : lecteur vidéo, bande rythmo et vumètres des micros",
  en: "DubInstante interface: video player, rythmo band and microphone meters",
};

const escapeAttr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function jsonLd(path: string, language: Language, buildDate: string) {
  const meta = getPageMeta(path, language);
  const home = SITE_URL + localizedPath("/", language);
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "LOINSTANTE",
    url: "https://github.com/loinstante",
  };
  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "DubInstante",
    url: `${SITE_URL}/`,
    inLanguage: ["fr", "en"],
    publisher: { "@id": organization["@id"] },
  };
  const graph: object[] = [
    organization,
    website,
    {
      "@type": "WebPage",
      "@id": meta.canonical,
      url: meta.canonical,
      name: meta.title,
      description: meta.description,
      inLanguage: language,
      isPartOf: { "@id": website["@id"] },
      dateModified: buildDate,
    },
  ];

  if (path === "/" || path === "/download") {
    graph.push({
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "DubInstante",
      description: getPageMeta("/", language).description,
      url: home,
      applicationCategory: "MultimediaApplication",
      applicationSubCategory:
        language === "en"
          ? "Video dubbing and rythmo band software"
          : "Logiciel de doublage vidéo et de bande rythmo",
      operatingSystem: "Windows 10, Windows 11, Linux",
      softwareVersion: CURRENT_VERSION.replace(/^v/, ""),
      datePublished: RELEASE_DATE,
      releaseNotes: CURRENT_RELEASE_URL,
      downloadUrl: SITE_URL + localizedPath("/download", language),
      softwareHelp: {
        "@type": "CreativeWork",
        url: SITE_URL + localizedPath("/documentation", language),
      },
      license: "https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      author: { "@id": organization["@id"] },
      sameAs: [GITHUB_REPO_URL],
      image: `${SITE_URL}/assets/DubInstante.png`,
      screenshot: SCREENSHOT_URL,
    });
  }

  if (path === "/") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${home}#faq`,
      inLanguage: language,
      mainEntity: FAQ[language].map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    });
  } else if (!meta.noindex) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "DubInstante", item: home },
        {
          "@type": "ListItem",
          position: 2,
          name: meta.title.split(" — ")[0],
          item: meta.canonical,
        },
      ],
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function renderHead(path: string, language: Language, buildDate: string) {
  const meta = getPageMeta(path, language);
  const title = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="DubInstante" />`,
    `<meta property="og:locale" content="${language === "en" ? "en_US" : "fr_FR"}" />`,
    `<meta property="og:locale:alternate" content="${language === "en" ? "fr_FR" : "en_US"}" />`,
    `<meta property="og:url" content="${meta.canonical}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${SCREENSHOT_URL}" />`,
    `<meta property="og:image:width" content="2048" />`,
    `<meta property="og:image:height" content="1227" />`,
    `<meta property="og:image:alt" content="${escapeAttr(SCREENSHOT_ALT[language])}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${SCREENSHOT_URL}" />`,
  ];

  if (meta.noindex) {
    tags.push(`<meta name="robots" content="noindex" />`);
  } else {
    tags.push(
      `<link rel="canonical" href="${meta.canonical}" />`,
      ...Object.entries(meta.alternates).map(
        ([hreflang, href]) =>
          `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`,
      ),
      // "<" is escaped so no answer text can close the script element early.
      `<script type="application/ld+json">${JSON.stringify(jsonLd(path, language, buildDate)).replace(/</g, "\\u003c")}</script>`,
    );
  }

  return tags.join("\n    ");
}

export async function renderPage(
  path: string,
  language: Language,
  buildDate: string,
) {
  const app = (
    <React.StrictMode>
      <StaticRouter
        basename={localizedPath("/", language)}
        location={localizedPath(path, language)}
      >
        <AppRoutes language={language} />
      </StaticRouter>
    </React.StrictMode>
  );

  // By default React moves any Suspense content above ~12 kB into a hidden block that an
  // inline script swaps in, leaving the spinner in place for crawlers that do not run
  // JavaScript. Lifting the threshold keeps every page's content where it belongs.
  const { prelude } = await prerender(app, {
    progressiveChunkSize: Number.MAX_SAFE_INTEGER,
  });
  const body = await new Response(prelude).text();
  if (body.includes("<div hidden")) {
    throw new Error(
      `prerender: ${path} (${language}) still has content hidden behind a script`,
    );
  }

  return { head: renderHead(path, language, buildDate), body };
}
