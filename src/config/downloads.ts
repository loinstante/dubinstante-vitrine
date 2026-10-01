/**
 * DubInstante Download Configuration
 *
 * NOTE: To use your custom S3 bucket or CDN, simply update the URLs below
 * e.g., 'https://your-bucket.s3.amazonaws.com/releases/DubInstante-macos-0.12.0.zip'
 */

export interface DownloadPlatform {
  id: 'windows' | 'mac' | 'debian' | 'arch';
  name: string;
  osName: string;
  osNameEn: string;
  filename: string;
  fileExt: string;
  size: string;
  sizeEn: string;
  badge: string;
  badgeEn: string;
  requirements: string;
  requirementsEn: string;
  url: string;
  instructions?: string;
  instructionsEn?: string;
}

export const CURRENT_VERSION = 'v0.12.0';
export const RELEASE_TAG = 'V0.12';
export const RELEASE_DATE = 'Octobre 2026';
export const GITHUB_REPO_URL = 'https://github.com/loinstante/DubInstante';
export const GITHUB_RELEASES_URL = 'https://github.com/loinstante/DubInstante/releases/latest';
export const GITHUB_ANDROID_RELEASE_URL = 'https://github.com/loinstante/DubInstante/releases/tag/V0.6.0_Android';
export const CURRENT_RELEASE_TAG = 'V0.12';
export const CURRENT_RELEASE_URL = 'https://github.com/loinstante/DubInstante/releases/tag/V0.12';

// Official GitHub Release assets base for v0.12.0
const GITHUB_ASSET_BASE = `https://github.com/loinstante/DubInstante/releases/download/${CURRENT_RELEASE_TAG}`;

export const DOWNLOAD_PLATFORMS: Record<DownloadPlatform['id'], DownloadPlatform> = {
  mac: {
    id: 'mac',
    name: 'macOS',
    osName: 'Apple Silicon & Intel',
    osNameEn: 'Apple Silicon & Intel',
    filename: 'DubInstante_macos_0.12.0.zip',
    fileExt: '.zip',
    size: '77 Mo',
    sizeEn: '77 MB',
    badge: 'Universel',
    badgeEn: 'Universal',
    requirements: 'macOS 12.0 Monterey ou supérieur',
    requirementsEn: 'macOS 12.0 Monterey or higher',
    url: `${GITHUB_ASSET_BASE}/DubInstante_macos_0.12.0.zip`,
    instructions: 'Décompressez l\'archive .zip, puis faites un Clic droit > Ouvrir sur l\'application lors du premier lancement (version Bêta non notarisée).',
    instructionsEn: 'Extract the .zip archive, then right-click > Open the application on first launch (non-notarized Beta release).',
  },
  windows: {
    id: 'windows',
    name: 'Windows',
    osName: 'Windows 10 & 11',
    osNameEn: 'Windows 10 & 11',
    filename: 'DubInstante_windows_0.12.0.zip',
    fileExt: '.zip',
    size: '106 Mo',
    sizeEn: '106 MB',
    badge: '64-bit',
    badgeEn: '64-bit',
    requirements: 'Windows 10 / 11 (64-bit)',
    requirementsEn: 'Windows 10 / 11 (64-bit)',
    url: `${GITHUB_ASSET_BASE}/DubInstante_windows_0.12.0.zip`,
    instructions: 'Décompressez l\'archive .zip et lancez l\'exécutable. Si Windows SmartScreen apparaît, cliquez sur "Informations complémentaires" puis "Exécuter quand même".',
    instructionsEn: 'Extract the .zip archive and launch the executable. If Windows SmartScreen appears, click "More info" then "Run anyway".',
  },
  debian: {
    id: 'debian',
    name: 'Linux (Debian)',
    osName: 'Debian, Ubuntu, Mint',
    osNameEn: 'Debian, Ubuntu, Mint',
    filename: 'DubInstante_debian_0.12.0.zip',
    fileExt: '.zip',
    size: '143 Mo',
    sizeEn: '143 MB',
    badge: 'Stable',
    badgeEn: 'Stable',
    requirements: 'glibc 2.31+ (Debian 11+, Ubuntu 20.04+, Mint)',
    requirementsEn: 'glibc 2.31+ (Debian 11+, Ubuntu 20.04+, Mint)',
    url: `${GITHUB_ASSET_BASE}/DubInstante_debian_0.12.0.zip`,
    instructions: 'Décompressez l\'archive, rendez le binaire exécutable (chmod +x DubInstante) et lancez-le.',
    instructionsEn: 'Extract the archive, make the binary executable (chmod +x DubInstante) and run it.',
  },
  arch: {
    id: 'arch',
    name: 'Linux (Arch)',
    osName: 'Arch, Manjaro, Fedora',
    osNameEn: 'Arch, Manjaro, Fedora',
    filename: 'DubInstante_arch_0.12.0.zip',
    fileExt: '.zip',
    size: '143 Mo',
    sizeEn: '143 MB',
    badge: 'Rolling',
    badgeEn: 'Rolling',
    requirements: 'Distribution à jour (glibc récente)',
    requirementsEn: 'Up-to-date distribution (recent glibc)',
    url: `${GITHUB_ASSET_BASE}/DubInstante_arch_0.12.0.zip`,
    instructions: 'Décompressez l\'archive, rendez le binaire exécutable (chmod +x DubInstante) et lancez-le.',
    instructionsEn: 'Extract the archive, make the binary executable (chmod +x DubInstante) and run it.',
  },
};

/**
 * Detect client operating system from browser user agent.
 * Returns null for platforms without a native build (e.g. Android).
 */
export function detectClientOS(): DownloadPlatform['id'] | null {
  if (typeof window === 'undefined') return 'windows';

  const ua = window.navigator.userAgent.toLowerCase();
  const platform = (window.navigator as unknown as { userAgentData?: { platform?: string } }).userAgentData?.platform?.toLowerCase() || '';

  if (platform.includes('mac') || ua.includes('macintosh') || ua.includes('mac os x')) {
    return 'mac';
  }
  if (ua.includes('android')) {
    return null;
  }
  if (platform.includes('linux') || ua.includes('linux') || ua.includes('x11')) {
    return 'debian';
  }
  return 'windows';
}
