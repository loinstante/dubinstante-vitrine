import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getPageMeta } from "../seo";

const setMeta = (selector: string, content: string) =>
  document.querySelector(selector)?.setAttribute("content", content);

const setLink = (rel: string, href: string, hreflang?: string) => {
  const selector = `link[rel="${rel}"]${hreflang ? `[hreflang="${hreflang}"]` : ""}`;
  let link = document.head.querySelector<HTMLLinkElement>(selector);
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    if (hreflang) link.hreflang = hreflang;
    document.head.appendChild(link);
  }
  link.href = href;
};

// Keeps the head in sync on client-side navigation. The prerendered HTML of each
// page already ships the same tags (see scripts/prerender.mjs).
export function usePageMeta() {
  const { language } = useLanguage();
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getPageMeta(pathname, language);

    document.title = meta.title;
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[name="twitter:title"]', meta.title);
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:description"]', meta.description);
    setMeta('meta[name="twitter:description"]', meta.description);
    setMeta('meta[property="og:url"]', meta.canonical);

    setLink("canonical", meta.canonical);
    for (const [hreflang, href] of Object.entries(meta.alternates)) {
      setLink("alternate", href, hreflang);
    }

    const robots = document.head.querySelector('meta[name="robots"]');
    if (meta.noindex && !robots) {
      const tag = document.createElement("meta");
      tag.name = "robots";
      tag.content = "noindex";
      document.head.appendChild(tag);
    } else if (!meta.noindex) {
      robots?.remove();
    }
  }, [pathname, language]);
}
