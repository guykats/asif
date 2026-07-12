import Logo from './Logo';
import './Header.css';

export default function Header() {
  const scrollToForm = () => {
    document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#top" className="site-header__logo-link" aria-label="נופי נחמיה - חזרה לראש העמוד">
          <Logo />
        </a>
        <button type="button" className="btn btn-primary site-header__cta" onClick={scrollToForm}>
          רישום לרשימת המתנה לקרוואנים
        </button>
      </div>
    </header>
  );
}
