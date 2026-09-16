import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { CURRENT_VERSION, GITHUB_REPO_URL } from '../config/downloads';
import { GithubIcon } from './GithubIcon';
import { Download, Menu, X, Sun, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const navLinks = [
    { to: '/', label: t.nav.preview, anchor: '#preview' },
    { to: '/features', label: 'Fonctionnalités' },
    { to: '/documentation', label: 'Documentation' },
    { to: '/tech', label: 'Technique' },
    { to: '/download', label: t.nav.download },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled
          ? 'bg-[var(--bg-main)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/assets/DubInstante.png"
            alt="DubInstante"
            className="w-7 h-7 object-contain rounded-md"
          />
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-tight text-[var(--text-primary)] font-display">
              DubInstante
            </span>
            <span className="text-[11px] font-mono font-medium text-[var(--text-muted)]">
              {CURRENT_VERSION}
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.anchor ? (
              <a
                key={link.anchor}
                href={isLanding ? link.anchor : `/${link.anchor}`}
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 text-[var(--text-secondary)]">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
              title={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'}
              aria-label="Changer de thème"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleLanguage}
              className="h-8 px-2 flex items-center text-xs font-mono font-semibold rounded-md hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
              title="Changer de langue"
              aria-label="Changer de langue"
            >
              {language.toUpperCase()}
            </button>
          </div>

          <div className="h-4 w-px bg-[var(--border-subtle)]"></div>

          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-2 py-1.5"
            aria-label="Code source GitHub"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <Link
            to="/download"
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-accent text-ink hover:bg-accent-hover transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.nav.download}</span>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)]"
            aria-label="Changer de thème"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleLanguage}
            className="h-8 px-1.5 text-xs font-mono font-semibold text-[var(--text-secondary)]"
            aria-label="Changer de langue"
          >
            {language.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 flex items-center justify-center text-[var(--text-primary)] ml-1"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-main)] border-b border-[var(--border-subtle)] px-4 py-5">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) =>
              link.anchor ? (
                <a
                  key={link.anchor}
                  href={isLanding ? link.anchor : `/${link.anchor}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1"
                >
                  {link.label}
                </Link>
              ),
            )}
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
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-accent text-ink"
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
