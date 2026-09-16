import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const Layout: React.FC = () => (
  <div className="min-h-screen flex flex-col font-sans transition-colors duration-200 relative">
    <div className="grain-overlay" />
    <div className="vignette-overlay" />
    <Navbar />
    <main className="flex-1 relative z-10">
      <Outlet />
    </main>
    <Footer />
  </div>
);
