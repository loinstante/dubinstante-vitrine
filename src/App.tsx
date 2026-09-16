import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './pages/Layout';
import { Landing } from './pages/Landing';
import { DownloadPage } from './pages/DownloadPage';
import { DocsPage } from './pages/DocsPage';
import { TechPage } from './pages/TechPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { RoadmapPage } from './pages/RoadmapPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/documentation" element={<DocsPage />} />
              <Route path="/tech" element={<TechPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="*" element={<Landing />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
