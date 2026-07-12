import { Users, Sparkles, FileSignature, PartyPopper, ArrowLeft } from 'lucide-react';
import './ProcessTimeline.css';

const STEPS = [
  { icon: Users, title: 'ערב היכרות', desc: 'עם ועדת קליטה' },
  { icon: Sparkles, title: 'שבת קליטה', desc: 'היכרות עם היישוב והקהילה' },
  { icon: FileSignature, title: 'חתימה על חוזה', desc: 'חוזה שכירות' },
  { icon: PartyPopper, title: 'קליטה!', desc: 'ברוכים הבאים הביתה' },
];

export default function ProcessTimeline() {
  return (
    <section className="section process" id="process">
      <div className="container">
        <span className="eyebrow">תהליך הקליטה</span>
        <h2 className="process__heading">רוצים להצטרף? כך זה עובד</h2>

        <div className="process__timeline">
          {STEPS.map((step, i) => (
            <div className="process__step-wrap" key={step.title}>
              <div className="process-step">
                <div className="process-step__number">{i + 1}</div>
                <div className="process-step__icon">
                  <step.icon size={24} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="process__arrow" aria-hidden="true">
                  <ArrowLeft size={22} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
