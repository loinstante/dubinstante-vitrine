import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// "/features/" and "/features" are the same page: drop the trailing slash once here so
// the router, the page metadata and the hydration check all see one spelling.
const pathname = window.location.pathname.replace(/(.)\/$/, "$1");
if (pathname !== window.location.pathname) {
  const { search, hash } = window.location;
  window.history.replaceState(null, "", pathname + search + hash);
}

// Hydrate only the HTML prerendered for this exact URL. In dev there is none, and
// 404.html is served for any unknown path: both render from scratch.
if (container.dataset.prerendered === pathname) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
