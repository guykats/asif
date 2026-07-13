import {
  Baby, Flower2, Flag, Trees, BookOpen, Users, Palette, Briefcase, Droplets, Landmark, MapPin,
} from 'lucide-react';
import { useContent } from '../lib/ContentContext';
import './About.css';

const FACILITY_ICONS = [Baby, Flower2, Flag, Trees, BookOpen, Users, Palette, Briefcase, Droplets, Landmark];

export default function About() {
  const { t } = useContent();

  return (
    <section id="about" className="section about">
      <div className="container">
        <span className="eyebrow">{t('about.eyebrow')}</span>
        <h2 className="about__heading">{t('about.heading')}</h2>

        <p className="about__paragraph">{t('about.paragraph1')}</p>
        <p className="about__paragraph">{t('about.paragraph2')}</p>

        <div className="about__facilities">
          {FACILITY_ICONS.map((Icon, i) => (
            <div className="facility-tag" key={i}>
              <Icon size={20} strokeWidth={2} />
              <span>{t(`about.facility${i + 1}`)}</span>
            </div>
          ))}
        </div>

        <div className="about__climate">
          <MapPin size={26} className="about__climate-icon" />
          <p>{t('about.climateText')}</p>
        </div>
      </div>
    </section>
  );
}
