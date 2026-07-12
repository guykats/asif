import { Phone, Mail } from 'lucide-react';
import Logo from './Logo';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <Logo light />
        </div>

        <div className="site-footer__contact">
          <a href="tel:+972000000000" className="site-footer__contact-item">
            <Phone size={16} />
            <span>מזכירות היישוב: 00-0000000</span>
          </a>
          <a href="mailto:info@example.org" className="site-footer__contact-item">
            <Mail size={16} />
            <span>info@example.org</span>
          </a>
        </div>

        <div className="site-footer__meta">
          <span>נופי נחמיה © {year}</span>
          <a href="#" onClick={(e) => e.preventDefault()}>הצהרת נגישות</a>
        </div>
      </div>
    </footer>
  );
}
