import React, { useState, useEffect } from 'react';
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
    { href: '#preview', label: t.nav.preview },
    { href: '#features', label: t.nav.features },
    { href: '#opensource', label: t.nav.opensource },
    { href: '#download', label: t.nav.download },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled
          ? 'bg-[#fafafb]/90 dark:bg-[#0a0a0c]/90 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <a href="#" className="flex items-center gap-2.5 group">
          <img
            src="/assets/DubInstante.png"
            alt="DubInstante"
            className="w-7 h-7 object-contain rounded-md"
          />
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-tight text-[#121217] dark:text-[#f3f3f6]">
              DubInstante
            </span>
            <span className="text-[11px] font-mono font-medium text-[#7a7a85] dark:text-[#8a8a9e]">
              {CURRENT_VERSION}
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#5a5a68] dark:text-[#9e9eb0] hover:text-[#121217] dark:hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme & Language toggles */}
          <div className="flex items-center gap-1 text-[#5a5a68] dark:text-[#9e9eb0]">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:text-[#121217] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
              title={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'}
              aria-label="Changer de thème"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleLanguage}
              className="h-8 px-2 flex items-center text-xs font-mono font-semibold rounded-md hover:text-[#121217] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
              title="Changer de langue"
              aria-label="Changer de langue"
            >
              {language.toUpperCase()}
            </button>
          </div>

          <div className="h-4 w-px bg-black/[0.08] dark:bg-white/[0.1]"></div>

          {/* GitHub icon link */}
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-[#5a5a68] dark:text-[#9e9eb0] hover:text-[#121217] dark:hover:text-white transition-colors px-2 py-1.5"
            aria-label="Code source GitHub"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          {/* Primary Download CTA */}
          <a
            href="#download"
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#121217] dark:bg-white text-white dark:text-[#121217] hover:bg-[#252530] dark:hover:bg-[#eaebee] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.nav.download}</span>
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center text-[#5a5a68] dark:text-[#9e9eb0]"
            aria-label="Changer de thème"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleLanguage}
            className="h-8 px-1.5 text-xs font-mono font-semibold text-[#5a5a68] dark:text-[#9e9eb0]"
            aria-label="Changer de langue"
          >
            {language.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 flex items-center justify-center text-[#121217] dark:text-white ml-1"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fafafb] dark:bg-[#0a0a0c] border-b border-black/[0.08] dark:border-white/[0.08] px-4 py-5">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#5a5a68] dark:text-[#9e9eb0] hover:text-[#121217] dark:hover:text-white py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-1 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-[#5a5a68] dark:text-[#9e9eb0]"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="#download"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#121217] dark:bg-white text-white dark:text-[#121217]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.nav.download}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

