import React, { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigationType,
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

const scrollPositions = new Map<string, number>();

const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    let rafId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;
    let isRestoring = true;

    const handleScroll = () => {
      if (!isRestoring) {
        scrollPositions.set(pathname, window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    if (hash) {
      isRestoring = false;
      timerId = setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 60);
    } else if (
      (pathname === "/" || navigationType === "POP") &&
      scrollPositions.has(pathname)
    ) {
      const savedY = scrollPositions.get(pathname) ?? 0;
      rafId = requestAnimationFrame(() => {
        window.scrollTo({ top: savedY, left: 0, behavior: "instant" });
        isRestoring = false;
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      rafId = requestAnimationFrame(() => {
        isRestoring = false;
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      if (timerId !== undefined) clearTimeout(timerId);
    };
  }, [pathname, hash, navigationType]);

  return null;
};

// Router-agnostic tree: BrowserRouter wraps it in the browser, StaticRouter at prerender time.
export const AppRoutes: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <ThemeProvider>
      <LanguageProvider language={language}>
        <ScrollManager />
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
