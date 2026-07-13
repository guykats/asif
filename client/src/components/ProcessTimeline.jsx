import { Users, Sparkles, FileSignature, PartyPopper, ArrowLeft } from 'lucide-react';
import { useContent } from '../lib/ContentContext';
import './ProcessTimeline.css';

const STEPS = [
  { icon: Users, prefix: 'step1' },
  { icon: Sparkles, prefix: 'step2' },
  { icon: FileSignature, prefix: 'step3' },
  { icon: PartyPopper, prefix: 'step4' },
];

export default function ProcessTimeline() {
  const { t } = useContent();

  return (
    <section className="section process" id="process">
      <div className="container">
        <span className="eyebrow">{t('process.eyebrow')}</span>
        <h2 className="process__heading">{t('process.heading')}</h2>

        <div className="process__timeline">
          {STEPS.map(({ icon: Icon, prefix }, i) => (
            <div className="process__step-wrap" key={prefix}>
              <div className="process-step">
                <div className="process-step__number">{i + 1}</div>
                <div className="process-step__icon">
                  <Icon size={24} />
                </div>
                <h3>{t(`process.${prefix}.title`)}</h3>
                <p>{t(`process.${prefix}.desc`)}</p>
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
