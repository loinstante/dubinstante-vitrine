import React from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { StudioPreview } from "./components/StudioPreview";
import { Features } from "./components/Features";
import { OpenSourceSection } from "./components/OpenSourceSection";
import { DownloadHub } from "./components/DownloadHub";
import { Footer } from "./components/Footer";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0a0c] text-[#121217] dark:text-[#f3f3f6] flex flex-col font-sans transition-colors duration-200">
          <Navbar />
          <main className="flex-1">
            <Hero />
            <StudioPreview />
            <Features />
            <OpenSourceSection />
            <DownloadHub />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;

