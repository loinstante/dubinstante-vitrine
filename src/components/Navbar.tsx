import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { GITHUB_REPO_URL } from '../config/downloads';
import { localizedPath } from '../seo';
import { GithubIcon } from './GithubIcon';
import { Download, Menu, X, Sun, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key and body scroll lock for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // A real link to the same page in the other language: crawlable, and each URL keeps a single language.
  const otherLanguage = language === 'fr' ? 'en' : 'fr';
  const otherLanguageHref = localizedPath(location.pathname, otherLanguage) + location.hash;
  const otherLanguageLabel = otherLanguage === 'en' ? 'English version' : 'Version française';

  const navLinks = [
    { to: '/', label: t.nav.preview, anchor: '#preview' },
    { to: '/features', label: t.nav.features },
    { to: '/pourquoi', label: t.nav.why },
    { to: '/documentation', label: t.nav.docs },
    { to: '/roadmap', label: t.nav.roadmap },
  ];

  const isLinkActive = (link: { to: string; anchor?: string }) => {
    if (link.anchor) {
      return isLanding && location.hash === link.anchor;
    }
    return location.pathname === link.to;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled
          ? 'bg-[var(--bg-main)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-8xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/assets/DubInstante.png"
            alt="DubInstante"
            className="w-7 h-7 object-contain rounded-md"
          />
          <span className="text-base font-bold tracking-tight text-[var(--text-primary)] font-display">
            DubInstante
          </span>
        </Link>

        {/* Desktop links - shown on lg and up to avoid tablet cramping */}
        <nav className="hidden lg:flex items-center gap-6" aria-label={language === 'en' ? 'Main navigation' : 'Navigation principale'}>
          {navLinks.map((link) => {
            const active = isLinkActive(link);
            const activeClass = active ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]';
            return link.anchor ? (
              isLanding ? (
                <a
                  key={link.anchor}
                  href={link.anchor}
                  aria-current={active ? 'page' : undefined}
                  className={`text-sm font-medium transition-colors ${activeClass}`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.anchor}
                  to={`/${link.anchor}`}
                  aria-current={active ? 'page' : undefined}
                  className={`text-sm font-medium transition-colors ${activeClass}`}
                >
                  {link.label}
                </Link>
              )
            ) : (
              <Link
                key={link.to}
                to={link.to}
                aria-current={active ? 'page' : undefined}
                className={`text-sm font-medium transition-colors ${activeClass}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions - shown on lg and up */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1 text-[var(--text-secondary)]">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
              title={theme === 'dark' ? t.navbar.themeLight : t.navbar.themeDark}
              aria-label={t.navbar.toggleTheme}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href={otherLanguageHref}
              hrefLang={otherLanguage}
              lang={otherLanguage}
              className="h-8 px-2 flex items-center text-xs font-mono font-semibold rounded-md hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
              title={otherLanguageLabel}
              aria-label={otherLanguageLabel}
            >
              {otherLanguage.toUpperCase()}
            </a>
          </div>

          <div className="h-4 w-px bg-[var(--border-subtle)]"></div>

          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-2 py-1.5"
            aria-label={t.navbar.sourceCode}
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <Link
            to="/download"
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.nav.download}</span>
          </Link>
        </div>

        {/* Mobile controls - shown below lg */}
        <div className="flex lg:hidden items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)]"
            aria-label={t.navbar.toggleTheme}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a
            href={otherLanguageHref}
            hrefLang={otherLanguage}
            lang={otherLanguage}
            className="h-8 px-1.5 flex items-center text-xs font-mono font-semibold text-[var(--text-secondary)]"
            aria-label={otherLanguageLabel}
          >
            {otherLanguage.toUpperCase()}
          </a>
          <button
            ref={menuButtonRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 flex items-center justify-center text-[var(--text-primary)] ml-1"
            aria-label={t.navbar.menu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[var(--bg-main)] border-b border-[var(--border-subtle)] px-4 py-5 shadow-xl"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              const activeClass = active ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]';
              return link.anchor ? (
                isLanding ? (
                  <a
                    key={link.anchor}
                    href={link.anchor}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`text-sm font-medium py-1 ${activeClass}`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.anchor}
                    to={`/${link.anchor}`}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`text-sm font-medium py-1 ${activeClass}`}
                  >
                    {link.label}
                  </Link>
                )
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`text-sm font-medium py-1 ${activeClass}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 mt-1 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <Link
                to="/download"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-accent text-white"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.nav.download}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
