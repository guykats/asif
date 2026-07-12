import {
  Baby, Flower2, Flag, Trees, BookOpen, Users, Palette, Briefcase, Droplets, Landmark, MapPin,
} from 'lucide-react';
import './About.css';

const FACILITIES = [
  { label: 'מעון יום', icon: Baby },
  { label: 'גני ילדים', icon: Flower2 },
  { label: 'סניף בני עקיבא', icon: Flag },
  { label: 'גני שעשועים', icon: Trees },
  { label: 'ספרייה', icon: BookOpen },
  { label: 'מועדון', icon: Users },
  { label: 'חדר חוגים', icon: Palette },
  { label: 'מרכז עסקים', icon: Briefcase },
  { label: 'מקווה נשים וגברים', icon: Droplets },
  { label: 'בית כנסת', icon: Landmark },
];

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <span className="eyebrow">על היישוב</span>
        <h2 className="about__heading">קהילה קטנה, עשייה גדולה</h2>

        <p className="about__paragraph">
          נופי נחמיה (אסיף) הוא יישוב קהילתי דתי הפועל כאגודה שיתופית מאז שנת 2002. ביישוב חברות
          כ-100 משפחות וכ-350 ילדים (בלי עין הרע), השותפים יחד ליצירת פסיפס קהילתי עשיר ותוסס.
          הקהילה מתאפיינת במעטפת תומכת, בערבות הדדית, בשגרת פנאי שוקקת, באירועי תוכן ותרבות,
          טיולים, ערבי נשים וגברים ושיעורי תורה, שמחברים ומגבשים את הקהילה יחד.
        </p>
        <p className="about__paragraph">
          העשייה מנווטת ע״י חברי מזכירות הנבחרים באמצעות הצבעת חברים, ותחתיה פועלות ועדות בתחומי
          הקהילה, החינוך, התרבות והביטחון. השותפות והעשייה היומיומית הן שמעצבות את אופיו הייחודי
          והחם של היישוב.
        </p>

        <div className="about__facilities">
          {FACILITIES.map(({ label, icon: Icon }) => (
            <div className="facility-tag" key={label}>
              <Icon size={20} strokeWidth={2} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="about__climate">
          <MapPin size={26} className="about__climate-icon" />
          <p>
            נופי נחמיה ממוקמת כ-6 דקות נסיעה מאריאל, בירת השומרון. היא שוכנת על צלעו של הר בגובה
            של 660 מטרים מעל פני הים, מה שמפנק את התושבים באוויר הרים צלול ובמזג אוויר נוח.
          </p>
        </div>
      </div>
    </section>
  );
}
