/**
 * DubInstante Download Configuration
 * 
 * NOTE: To use your custom S3 bucket or CDN, simply update the URLs below
 * e.g., 'https://your-bucket.s3.amazonaws.com/releases/DubInstante-0.11.0.dmg'
 */

export interface DownloadPlatform {
  id: 'windows' | 'mac' | 'linux' | 'android';
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

export const CURRENT_VERSION = 'v0.11.0';
export const RELEASE_DATE = 'Septembre 2026';
export const GITHUB_REPO_URL = 'https://github.com/loinstante/DubInstante';
export const GITHUB_RELEASES_URL = 'https://github.com/loinstante/DubInstante/releases';
export const CURRENT_RELEASE_TAG = 'V0.11.0_FOUR_BUD';
export const CURRENT_RELEASE_URL = `${GITHUB_RELEASES_URL}/tag/${CURRENT_RELEASE_TAG}`;

// Official GitHub Release assets base for v0.11.0
const GITHUB_ASSET_BASE = `${GITHUB_RELEASES_URL}/download/${CURRENT_RELEASE_TAG}`;

export const DOWNLOAD_PLATFORMS: Record<DownloadPlatform['id'], DownloadPlatform> = {
  mac: {
    id: 'mac',
    name: 'macOS',
    osName: 'Apple Silicon & Intel',
    osNameEn: 'Apple Silicon & Intel',
    filename: 'DubInstante_macos_0.11.0.zip',
    fileExt: '.zip',
    size: '42 Mo',
    sizeEn: '42 MB',
    badge: 'Universel',
    badgeEn: 'Universal',
    requirements: 'macOS 12.0 Monterey ou supérieur',
    requirementsEn: 'macOS 12.0 Monterey or higher',
    url: `${GITHUB_ASSET_BASE}/DubInstante_macos_0.11.0.zip`,
    instructions: 'Décompressez l\'archive ZIP. Sur macOS, faites Clic droit > Ouvrir lors du premier lancement (version Bêta non notarisée).',
    instructionsEn: 'Extract the ZIP archive. On macOS, right-click > Open on first launch (non-notarized Beta release).',
  },
  windows: {
    id: 'windows',
    name: 'Windows',
    osName: 'Windows 10 & 11',
    osNameEn: 'Windows 10 & 11',
    filename: 'DubInstante_windows_0.11.0.zip',
    fileExt: '.zip',
    size: '55 Mo',
    sizeEn: '55 MB',
    badge: '64-bit',
    badgeEn: '64-bit',
    requirements: 'Windows 10 / 11 (64-bit)',
    requirementsEn: 'Windows 10 / 11 (64-bit)',
    url: `${GITHUB_ASSET_BASE}/DubInstante_windows_0.11.0.zip`,
    instructions: 'Décompressez l\'archive ZIP et lancez DubInstante.exe. Si Windows SmartScreen apparaît, cliquez sur "Informations complémentaires" puis "Exécuter quand même".',
    instructionsEn: 'Extract the ZIP archive and launch DubInstante.exe. If Windows SmartScreen appears, click "More info" then "Run anyway".',
  },
  linux: {
    id: 'linux',
    name: 'Linux',
    osName: 'Toutes distributions x86_64',
    osNameEn: 'All x86_64 distributions',
    filename: 'DubInstante_linux_0.11.0.zip',
    fileExt: '.zip',
    size: '29 Mo',
    sizeEn: '29 MB',
    badge: 'Portable',
    badgeEn: 'Portable',
    requirements: 'glibc 2.31+ (Ubuntu 20.04+, Debian 11+, Fedora, Arch)',
    requirementsEn: 'glibc 2.31+ (Ubuntu 20.04+, Debian 11+, Fedora, Arch)',
    url: `${GITHUB_ASSET_BASE}/DubInstante_linux_0.11.0.zip`,
    instructions: 'Décompressez l\'archive ZIP, rendez le binaire exécutable (chmod +x DubInstante) et lancez-le.',
    instructionsEn: 'Extract the ZIP archive, make the binary executable (chmod +x DubInstante) and run it.',
  },
  android: {
    id: 'android',
    name: 'Android',
    osName: 'Tablette & Mobile',
    osNameEn: 'Tablet & Mobile',
    filename: 'DubInstante_installer.apk',
    fileExt: '.apk',
    size: '105 Mo',
    sizeEn: '105 MB',
    badge: 'Beta Native',
    badgeEn: 'Native Beta',
    requirements: 'Android 9.0 (Pie) ou supérieur',
    requirementsEn: 'Android 9.0 (Pie) or higher',
    url: `${GITHUB_RELEASES_URL}/download/V0.6.0_Android/DubInstante_installer.apk`,
    instructions: 'Téléchargez l\'APK et autorisez l\'installation de sources inconnues pour installer la Bêta.',
    instructionsEn: 'Download the APK and allow installation from unknown sources to install the Beta.',
  },
};

/**
 * Detect client operating system from browser user agent
 */
export function detectClientOS(): DownloadPlatform['id'] {
  if (typeof window === 'undefined') return 'windows';

  const ua = window.navigator.userAgent.toLowerCase();
  const platform = (window.navigator as unknown as { userAgentData?: { platform?: string } }).userAgentData?.platform?.toLowerCase() || '';

  if (platform.includes('mac') || ua.includes('macintosh') || ua.includes('mac os x')) {
    return 'mac';
  }
  if (ua.includes('android')) {
    return 'android';
  }
  if (platform.includes('linux') || ua.includes('linux') || ua.includes('x11')) {
    return 'linux';
  }
  return 'windows';
}
