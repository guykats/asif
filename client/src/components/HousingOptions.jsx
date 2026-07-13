import { Home, KeyRound, Building2 } from 'lucide-react';
import { useContent } from '../lib/ContentContext';
import './HousingOptions.css';

export default function HousingOptions() {
  const { t } = useContent();

  const scrollToForm = () => {
    document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section housing" id="housing">
      <div className="container">
        <span className="eyebrow">{t('housing.eyebrow')}</span>
        <h2 className="housing__heading">{t('housing.heading')}</h2>
        <p className="housing__intro">{t('housing.intro')}</p>

        <div className="housing__grid">
          <article className="housing-card">
            <div className="housing-card__icon">
              <Home size={26} />
            </div>
            <h3>{t('housing.rental.title')}</h3>
            <p className="housing-card__body">{t('housing.rental.body')}</p>
            <a
              className="btn btn-secondary housing-card__cta"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              {t('housing.rental.cta')}
            </a>
          </article>

          <article className="housing-card housing-card--highlight">
            <div className="housing-card__icon">
              <KeyRound size={26} />
            </div>
            <h3>{t('housing.caravan.title')}</h3>
            <p className="housing-card__body">{t('housing.caravan.body')}</p>
            <button type="button" className="btn btn-primary housing-card__cta" onClick={scrollToForm}>
              {t('housing.caravan.cta')}
            </button>
          </article>

          <article className="housing-card">
            <div className="housing-card__icon">
              <Building2 size={26} />
            </div>
            <h3>{t('housing.purchase.title')}</h3>
            <p className="housing-card__body">{t('housing.purchase.body')}</p>
            <a className="btn btn-secondary housing-card__cta" href="#" onClick={(e) => e.preventDefault()}>
              {t('housing.purchase.cta')}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
