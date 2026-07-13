import { Navigation, TrendingUp, HeartHandshake } from 'lucide-react';
import { useContent } from '../lib/ContentContext';
import './Infographic.css';

const STATS = [
  { icon: Navigation, prefix: 'stat1' },
  { icon: TrendingUp, prefix: 'stat2' },
  { icon: HeartHandshake, prefix: 'stat3' },
];

export default function Infographic() {
  const { t } = useContent();

  return (
    <section className="section infographic">
      <div className="container infographic__grid">
        {STATS.map(({ icon: Icon, prefix }) => (
          <div className="stat-card" key={prefix}>
            <div className="stat-card__icon">
              <Icon size={28} strokeWidth={2} />
            </div>
            <div className="stat-card__value">{t(`infographic.${prefix}.value`)}</div>
            <div className="stat-card__label">{t(`infographic.${prefix}.label`)}</div>
            <p className="stat-card__detail">{t(`infographic.${prefix}.detail`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
