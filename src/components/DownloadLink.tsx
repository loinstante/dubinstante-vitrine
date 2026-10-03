import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  detectClientOS,
  DOWNLOAD_PLATFORMS,
  type DownloadPlatform,
} from "../config/downloads";

// null on the server and on the first client render, so the prerendered HTML
// and hydration agree; the visitor's platform is filled in right after mount.
export function useClientPlatform(): DownloadPlatform | null {
  const [platform, setPlatform] = useState<DownloadPlatform | null>(null);

  useEffect(() => {
    const os = detectClientOS();
    setPlatform(os ? DOWNLOAD_PLATFORMS[os] : null);
  }, []);

  return platform;
}

// Direct binary when a build exists for the visitor's OS, the download page otherwise.
export const DownloadLink: React.FC<{
  className: string;
  children: (platform: DownloadPlatform | null) => React.ReactNode;
}> = ({ className, children }) => {
  const platform = useClientPlatform();
  return platform ? (
    <a href={platform.url} className={className}>
      {children(platform)}
    </a>
  ) : (
    <Link to="/download" className={className}>
      {children(null)}
    </Link>
  );
};
