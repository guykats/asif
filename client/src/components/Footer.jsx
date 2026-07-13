import { Phone, Mail } from 'lucide-react';
import Logo from './Logo';
import { useContent } from '../lib/ContentContext';
import './Footer.css';

export default function Footer() {
  const { t } = useContent();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <Logo light />
        </div>

        <div className="site-footer__contact">
          <a href={`tel:${t('footer.phone').replace(/[^\d+]/g, '')}`} className="site-footer__contact-item">
            <Phone size={16} />
            <span>{t('footer.phone')}</span>
          </a>
          <a href={`mailto:${t('footer.email')}`} className="site-footer__contact-item">
            <Mail size={16} />
            <span>{t('footer.email')}</span>
          </a>
        </div>

        <div className="site-footer__meta">
          <span>{t('footer.orgName')} © {year}</span>
          <a href="#" onClick={(e) => e.preventDefault()}>{t('footer.accessibilityLabel')}</a>
        </div>
      </div>
    </footer>
  );
}
