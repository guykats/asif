import { Navigation, TrendingUp, HeartHandshake } from 'lucide-react';
import './Infographic.css';

const STATS = [
  {
    icon: Navigation,
    value: '6 דקות',
    label: 'מיקום מושלם',
    detail: 'נסיעה מאריאל, בירת השומרון',
  },
  {
    icon: TrendingUp,
    value: '40%',
    label: 'אינטימי - אבל בצמיחה',
    detail: 'גידול עתידי תוך שנתיים',
  },
  {
    icon: HeartHandshake,
    value: '100%',
    label: 'איכות של אנשים',
    detail: 'כל העשייה ביישוב - בהתנדבות',
  },
];

export default function Infographic() {
  return (
    <section className="section infographic">
      <div className="container infographic__grid">
        {STATS.map(({ icon: Icon, value, label, detail }) => (
          <div className="stat-card" key={label}>
            <div className="stat-card__icon">
              <Icon size={28} strokeWidth={2} />
            </div>
            <div className="stat-card__value">{value}</div>
            <div className="stat-card__label">{label}</div>
            <p className="stat-card__detail">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
