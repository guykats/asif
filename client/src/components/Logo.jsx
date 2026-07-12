import { useAssets } from '../lib/AssetsContext';

export default function Logo({ light = false }) {
  const { resolveUrl } = useAssets();
  const logoUrl = resolveUrl('logo');

  if (logoUrl) {
    return <img src={logoUrl} alt="נופי נחמיה (אסיף)" className="logo-img" />;
  }

  return (
    <div className={`logo-badge ${light ? 'logo-badge--light' : ''}`}>
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="20" fill="currentColor" opacity="0.15" />
        <path d="M20 8 L30 26 H10 Z" fill="currentColor" opacity="0.55" />
        <path d="M20 15 L26 26 H14 Z" fill="currentColor" />
      </svg>
      <span className="logo-text">
        נופי נחמיה
        <small>אסיף</small>
      </span>
    </div>
  );
}
