import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { localizedPath } from "../seo";

const HINT_DISMISSED_KEY = "dubinstante_lang_hint";

// Offers the other language to visitors whose browser does not match the page.
// It stands in for automatic switching, which would hide one language from crawlers
// (Googlebot browses in en-US and would never see the French pages).
const LanguageHint: React.FC = () => {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const browserLanguage = navigator.language.startsWith("fr") ? "fr" : "en";
    setVisible(
      browserLanguage !== language && !localStorage.getItem(HINT_DISMISSED_KEY),
    );
  }, [language]);

  if (!visible) return null;

  const other = language === "fr" ? "en" : "fr";
  const dismiss = () => {
    localStorage.setItem(HINT_DISMISSED_KEY, "1");
    setVisible(false);
  };

  return (
    <div
      lang={other}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 pl-4 pr-2 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl text-sm whitespace-nowrap"
    >
      <a
        href={localizedPath(pathname, other)}
        hrefLang={other}
        onClick={dismiss}
        className="font-medium text-accent hover:underline"
      >
        {other === "en"
          ? "This page is available in English →"
          : "Cette page existe en français →"}
      </a>
      <button
        onClick={dismiss}
        aria-label={other === "en" ? "Dismiss" : "Fermer"}
        className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-sunk)] transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const Layout: React.FC = () => {
  usePageMeta();
  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200 relative">
      <div className="grain-overlay" />
      <div className="vignette-overlay" />
      <Navbar />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <Footer />
      <LanguageHint />
    </div>
  );
};
