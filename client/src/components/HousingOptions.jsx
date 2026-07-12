import { Home, KeyRound, Building2 } from 'lucide-react';
import './HousingOptions.css';

export default function HousingOptions() {
  const scrollToForm = () => {
    document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section housing" id="housing">
      <div className="container">
        <span className="eyebrow">אפשרויות מגורים</span>
        <h2 className="housing__heading">אפשרויות מגורים ביישוב</h2>
        <p className="housing__intro">ביישוב קיימות 3 אפשרויות מגורים עיקריות, ולשלושתן תהליך הקליטה זהה.</p>

        <div className="housing__grid">
          <article className="housing-card">
            <div className="housing-card__icon">
              <Home size={26} />
            </div>
            <h3>שכירות</h3>
            <p className="housing-card__body">
              את המידע על האפשרויות לשכירות בישוב ניתן למצוא בלינק הבא. המידע המתעדכן הינו
              באחריות בעלי היחידות בלבד ולוועדת קליטה אין קשר למידע הרשום. באחריות בעלי הבית
              להפנות את המשפחה אל ועדת קליטה ולהמשיך את תהליך הקליטה.
            </p>
            <a
              className="btn btn-secondary housing-card__cta"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              ללוח הדירות (יתווסף)
            </a>
          </article>

          <article className="housing-card housing-card--highlight">
            <div className="housing-card__icon">
              <KeyRound size={26} />
            </div>
            <h3>שכירת קרוואן</h3>
            <p className="housing-card__body">
              ליישוב 2 שכונות קרוואנים. הרישום לרשימת ההמתנה לקרוואנים מתבצע כאן מטה. כאשר
              מתפנה קרוואן, ועדת קליטה תיצור קשר עם המשפחה שתורה הגיע. היות והביקוש למגורים
              ביישוב גבוה (ברוך השם), ההמתנה עלולה להתארך.
            </p>
            <button type="button" className="btn btn-primary housing-card__cta" onClick={scrollToForm}>
              גלול לרישום
            </button>
          </article>

          <article className="housing-card">
            <div className="housing-card__icon">
              <Building2 size={26} />
            </div>
            <h3>רכישת בית בפרויקט הבנייה</h3>
            <p className="housing-card__body">
              בימים אלה נבנה ביישוב פרויקט בנייה ב-2 שלבים. המעוניין לרכוש בית בפרויקט, ייצור
              קשר עם המשווק.
            </p>
            <a className="btn btn-secondary housing-card__cta" href="#" onClick={(e) => e.preventDefault()}>
              פרטי קשר עם המשווק
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
