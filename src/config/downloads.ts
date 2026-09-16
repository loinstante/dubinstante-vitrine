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
  filename: string;
  fileExt: string;
  size: string;
  badge: string;
  requirements: string;
  url: string;
  instructions?: string;
}

export const CURRENT_VERSION = 'v0.11.0';
export const RELEASE_DATE = 'Septembre 2026';
export const GITHUB_REPO_URL = 'https://github.com/loimathos/DubInstante';
export const GITHUB_RELEASES_URL = 'https://github.com/loimathos/DubInstante/releases/latest';

// S3 or GitHub Releases Base URL (can be customized here)
const S3_OR_CDN_BASE = 'https://github.com/loimathos/DubInstante/releases/download/' + CURRENT_VERSION;

export const DOWNLOAD_PLATFORMS: Record<DownloadPlatform['id'], DownloadPlatform> = {
  mac: {
    id: 'mac',
    name: 'macOS',
    osName: 'Apple Silicon & Intel',
    filename: `DubInstante-${CURRENT_VERSION}-macOS.dmg`,
    fileExt: '.dmg',
    size: '52 Mo',
    badge: 'Universel',
    requirements: 'macOS 12.0 Monterey ou supérieur',
    url: `${S3_OR_CDN_BASE}/DubInstante-macOS.dmg`,
    instructions: 'Sur macOS, faites un Clic droit > Ouvrir lors du premier lancement (version Bêta non notarisée).',
  },
  windows: {
    id: 'windows',
    name: 'Windows',
    osName: 'Windows 10 & 11',
    filename: `DubInstante-${CURRENT_VERSION}-Setup.exe`,
    fileExt: '.exe',
    size: '46 Mo',
    badge: '64-bit',
    requirements: 'Windows 10 / 11 (64-bit)',
    url: `${S3_OR_CDN_BASE}/DubInstante-Setup.exe`,
    instructions: 'Exécutez l\'installateur. Si Windows SmartScreen apparaît, cliquez sur "Informations complémentaires" puis "Exécuter quand même".',
  },
  linux: {
    id: 'linux',
    name: 'Linux',
    osName: 'Toutes distributions',
    filename: `DubInstante-${CURRENT_VERSION}-x86_64.AppImage`,
    fileExt: '.AppImage',
    size: '49 Mo',
    badge: 'Portable',
    requirements: 'glibc 2.31+ (Ubuntu 20.04+, Debian 11+, Fedora, Arch)',
    url: `${S3_OR_CDN_BASE}/DubInstante-x86_64.AppImage`,
    instructions: 'Rendez le fichier exécutable (chmod +x DubInstante-x86_64.AppImage) et double-cliquez dessus.',
  },
  android: {
    id: 'android',
    name: 'Android',
    osName: 'Tablette & Mobile',
    filename: `DubInstante-${CURRENT_VERSION}-arm64.apk`,
    fileExt: '.apk',
    size: '29 Mo',
    badge: 'Beta Native',
    requirements: 'Android 9.0 (Pie) ou supérieur',
    url: `${S3_OR_CDN_BASE}/DubInstante-arm64.apk`,
    instructions: 'Téléchargez l\'APK et autorisez l\'installation de sources inconnues pour installer la Bêta.',
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
