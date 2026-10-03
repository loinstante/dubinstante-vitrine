/**
 * DubInstante Download Configuration
 *
 * NOTE: To use your custom S3 bucket or CDN, simply update the URLs below
 * e.g., 'https://your-bucket.s3.amazonaws.com/releases/DubInstante_windows_0.12.0.zip'
 */

export interface DownloadPlatform {
  id: "windows" | "debian" | "arch";
  name: string;
  osName: string;
  osNameEn: string;
  filename: string;
  sha256: string;
  size: string;
  sizeEn: string;
  badge: string;
  badgeEn: string;
  requirements: string;
  requirementsEn: string;
  url: string;
  instructions: string;
  instructionsEn: string;
}

export const CURRENT_VERSION = "v0.12.0";
export const RELEASE_TAG = "V0.12";
export const RELEASE_DATE = "2026-10-01";
export const GITHUB_REPO_URL = "https://github.com/loinstante/DubInstante";
export const GITHUB_RELEASES_URL =
  "https://github.com/loinstante/DubInstante/releases/latest";
export const GITHUB_ANDROID_RELEASE_URL =
  "https://github.com/loinstante/DubInstante/releases/tag/V0.6.0_Android";
export const CURRENT_RELEASE_TAG = "V0.12";
export const CURRENT_RELEASE_URL =
  "https://github.com/loinstante/DubInstante/releases/tag/V0.12";

// Official GitHub Release assets base for v0.12.0
const GITHUB_ASSET_BASE = `https://github.com/loinstante/DubInstante/releases/download/${CURRENT_RELEASE_TAG}`;

// filename, size and sha256 mirror the GitHub release assets: update all three on each release.
// macOS is on hold (no Apple developer licence, so no microphone access): it is not offered here.
export const DOWNLOAD_PLATFORMS: Record<
  DownloadPlatform["id"],
  DownloadPlatform
> = {
  windows: {
    id: "windows",
    name: "Windows",
    osName: "Windows 10 & 11",
    osNameEn: "Windows 10 & 11",
    filename: "DubInstante_windows_0.12.0.zip",
    sha256: "f85ee64c6e6343d284fe2849d6d6bc2c57994b688fc4962d2e7afb51fae9de01",
    size: "106 Mo",
    sizeEn: "106 MB",
    badge: "64-bit",
    badgeEn: "64-bit",
    requirements: "Windows 10 / 11 (64-bit)",
    requirementsEn: "Windows 10 / 11 (64-bit)",
    url: `${GITHUB_ASSET_BASE}/DubInstante_windows_0.12.0.zip`,
    instructions:
      'Décompressez l\'archive .zip et lancez l\'exécutable. Si Windows SmartScreen apparaît, cliquez sur "Informations complémentaires" puis "Exécuter quand même".',
    instructionsEn:
      'Extract the .zip archive and launch the executable. If Windows SmartScreen appears, click "More info" then "Run anyway".',
  },
  debian: {
    id: "debian",
    name: "Linux (Debian)",
    osName: "Debian, Ubuntu, Mint",
    osNameEn: "Debian, Ubuntu, Mint",
    filename: "DubInstante_debian_0.12.0.zip",
    sha256: "801a8dead5c1699da87ac3ff86fbcab7c86931076ea07be449cb529216d8624b",
    size: "143 Mo",
    sizeEn: "143 MB",
    badge: "Stable",
    badgeEn: "Stable",
    requirements: "glibc 2.35+ (Ubuntu 22.04+, Debian 12+, Mint 21+)",
    requirementsEn: "glibc 2.35+ (Ubuntu 22.04+, Debian 12+, Mint 21+)",
    url: `${GITHUB_ASSET_BASE}/DubInstante_debian_0.12.0.zip`,
    instructions:
      "Décompressez l'archive, rendez l'AppImage exécutable (chmod +x DubInstante_debian_0.12.0.AppImage) et lancez-la.",
    instructionsEn:
      "Extract the archive, make the AppImage executable (chmod +x DubInstante_debian_0.12.0.AppImage) and run it.",
  },
  arch: {
    id: "arch",
    name: "Linux (Arch)",
    osName: "Arch, EndeavourOS, Manjaro",
    osNameEn: "Arch, EndeavourOS, Manjaro",
    filename: "DubInstante_arch_0.12.0.zip",
    sha256: "420fa3a71d0761e6bd57739e2266bfb155ef55b08edb669921665ae0e61a7c05",
    size: "143 Mo",
    sizeEn: "143 MB",
    badge: "Rolling",
    badgeEn: "Rolling",
    requirements: "Distribution à jour (glibc récente)",
    requirementsEn: "Up-to-date distribution (recent glibc)",
    url: `${GITHUB_ASSET_BASE}/DubInstante_arch_0.12.0.zip`,
    instructions:
      "Décompressez l'archive, rendez l'AppImage exécutable (chmod +x DubInstante_arch_0.12.0.AppImage) et lancez-la.",
    instructionsEn:
      "Extract the archive, make the AppImage executable (chmod +x DubInstante_arch_0.12.0.AppImage) and run it.",
  },
};

/**
 * Detect client operating system from browser user agent.
 * Returns null when there is no build to offer: Android, iOS/iPadOS and macOS.
 * Browser-only: call it through useClientPlatform, never during render.
 */
export function detectClientOS(): DownloadPlatform["id"] | null {
  const ua = window.navigator.userAgent.toLowerCase();
  const platform =
    (
      window.navigator as unknown as { userAgentData?: { platform?: string } }
    ).userAgentData?.platform?.toLowerCase() || "";

  if (
    /android|iphone|ipad|ipod|macintosh|mac os x/.test(ua) ||
    platform.includes("mac")
  ) {
    return null;
  }
  if (
    platform.includes("linux") ||
    ua.includes("linux") ||
    ua.includes("x11")
  ) {
    return "debian";
  }
  return "windows";
}
