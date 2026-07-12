import { ChevronDown } from 'lucide-react';
import { useAssets } from '../lib/AssetsContext';
import './Hero.css';

export default function Hero() {
  const { resolveUrl } = useAssets();
  const heroUrl = resolveUrl('hero');

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="top"
      className="hero"
      style={heroUrl ? { backgroundImage: `url(${heroUrl})` } : undefined}
    >
      {!heroUrl && (
        <svg className="hero__placeholder" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbead0" />
              <stop offset="100%" stopColor="#f6d9ad" />
            </linearGradient>
          </defs>
          <rect width="1200" height="700" fill="url(#sky)" />
          <circle cx="990" cy="150" r="90" fill="#ffe9b8" opacity="0.9" />
          <path d="M0 480 L220 260 L420 460 L620 210 L860 470 L1050 300 L1200 470 L1200 700 L0 700 Z" fill="#8fa876" opacity="0.55" />
          <path d="M0 560 L260 380 L520 540 L780 340 L1020 540 L1200 420 L1200 700 L0 700 Z" fill="#6f8a58" opacity="0.75" />
          <path d="M0 640 L300 520 L600 640 L900 500 L1200 620 L1200 700 L0 700 Z" fill="#4f6a3d" />
        </svg>
      )}
      <div className="hero__overlay" />
      <div className="container hero__content">
        <span className="eyebrow eyebrow--light">נופי נחמיה · אסיף</span>
        <h1 className="hero__title">קהילה חמה בלב הארץ</h1>
        <p className="hero__subtitle">
          יישוב קהילתי דתי השוכן בלב השומרון ומקיים פסיפס ייחודי של קהילה, שותפות וערכיות
        </p>
      </div>
      <button type="button" className="hero__scroll-hint" onClick={scrollToNext} aria-label="גלילה למטה">
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
