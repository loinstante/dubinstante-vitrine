import React, { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Layout } from "./pages/Layout";
import { Landing } from "./pages/Landing";
import { languageFromPath, localizedPath, type Language } from "./seo";

const DownloadPage = lazy(() =>
  import("./pages/DownloadPage").then((m) => ({ default: m.DownloadPage })),
);
const DocsPage = lazy(() =>
  import("./pages/DocsPage").then((m) => ({ default: m.DocsPage })),
);
const FeaturesPage = lazy(() =>
  import("./pages/FeaturesPage").then((m) => ({ default: m.FeaturesPage })),
);
const WhyPage = lazy(() =>
  import("./pages/WhyPage").then((m) => ({ default: m.WhyPage })),
);
const RoadmapPage = lazy(() =>
  import("./pages/RoadmapPage").then((m) => ({ default: m.RoadmapPage })),
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
);

const PageLoader: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
    <div className="w-7 h-7 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    <span className="font-mono text-xs text-[var(--text-muted)]">
      DubInstante
    </span>
  </div>
);

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 60);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

// Router-agnostic tree: BrowserRouter wraps it in the browser, StaticRouter at prerender time.
export const AppRoutes: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <ThemeProvider>
      <LanguageProvider language={language}>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route
              path="/download"
              element={
                <Suspense fallback={<PageLoader />}>
                  <DownloadPage />
                </Suspense>
              }
            />
            <Route
              path="/documentation"
              element={
                <Suspense fallback={<PageLoader />}>
                  <DocsPage />
                </Suspense>
              }
            />
            <Route
              path="/features"
              element={
                <Suspense fallback={<PageLoader />}>
                  <FeaturesPage />
                </Suspense>
              }
            />
            <Route
              path="/tech"
              element={<Navigate to="/features#engine" replace />}
            />
            <Route
              path="/docs"
              element={<Navigate to="/documentation" replace />}
            />
            <Route
              path="/pourquoi"
              element={
                <Suspense fallback={<PageLoader />}>
                  <WhyPage />
                </Suspense>
              }
            />
            <Route path="/why" element={<Navigate to="/pourquoi" replace />} />
            <Route
              path="/comparatif"
              element={<Navigate to="/pourquoi" replace />}
            />
            <Route
              path="/roadmap"
              element={
                <Suspense fallback={<PageLoader />}>
                  <RoadmapPage />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<PageLoader />}>
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export const App: React.FC = () => {
  const language = languageFromPath(window.location.pathname);
  return (
    <BrowserRouter basename={localizedPath("/", language)}>
      <AppRoutes language={language} />
    </BrowserRouter>
  );
};

export default App;
