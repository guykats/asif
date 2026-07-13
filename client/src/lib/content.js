// Every editable text on the site, grouped by section. This object is both the
// fallback content (used when nothing is saved yet) and the schema the admin
// content editor renders itself from - each entry needs a label + type so the
// editor knows how to show it.

export const CONTENT_SCHEMA = [
  {
    section: 'header',
    label: 'הדר עליון',
    fields: [
      { key: 'header.cta', label: 'כפתור הרשמה', type: 'text', default: 'רישום לרשימת המתנה לקרוואנים' },
    ],
  },
  {
    section: 'hero',
    label: 'מסך פתיחה (הירו)',
    fields: [
      { key: 'hero.eyebrow', label: 'תגית קטנה מעל הכותרת', type: 'text', default: 'נופי נחמיה · אסיף' },
      { key: 'hero.title', label: 'כותרת ראשית', type: 'text', default: 'קהילה חמה בלב הארץ' },
      { key: 'hero.subtitle', label: 'תת-כותרת', type: 'textarea', default: 'יישוב קהילתי דתי השוכן בלב השומרון ומקיים פסיפס ייחודי של קהילה, שותפות וערכיות' },
    ],
  },
  {
    section: 'about',
    label: 'על היישוב',
    fields: [
      { key: 'about.eyebrow', label: 'תגית קטנה', type: 'text', default: 'על היישוב' },
      { key: 'about.heading', label: 'כותרת', type: 'text', default: 'קהילה קטנה, עשייה גדולה' },
      { key: 'about.paragraph1', label: 'פסקה ראשונה', type: 'textarea', default: 'נופי נחמיה (אסיף) הוא יישוב קהילתי דתי הפועל כאגודה שיתופית מאז שנת 2002. ביישוב חברות כ-100 משפחות וכ-350 ילדים (בלי עין הרע), השותפים יחד ליצירת פסיפס קהילתי עשיר ותוסס. הקהילה מתאפיינת במעטפת תומכת, בערבות הדדית, בשגרת פנאי שוקקת, באירועי תוכן ותרבות, טיולים, ערבי נשים וגברים ושיעורי תורה, שמחברים ומגבשים את הקהילה יחד.' },
      { key: 'about.paragraph2', label: 'פסקה שנייה', type: 'textarea', default: 'העשייה מנווטת ע״י חברי מזכירות הנבחרים באמצעות הצבעת חברים, ותחתיה פועלות ועדות בתחומי הקהילה, החינוך, התרבות והביטחון. השותפות והעשייה היומיומית הן שמעצבות את אופיו הייחודי והחם של היישוב.' },
      { key: 'about.facility1', label: 'מבנה ציבור 1', type: 'text', default: 'מעון יום' },
      { key: 'about.facility2', label: 'מבנה ציבור 2', type: 'text', default: 'גני ילדים' },
      { key: 'about.facility3', label: 'מבנה ציבור 3', type: 'text', default: 'סניף בני עקיבא' },
      { key: 'about.facility4', label: 'מבנה ציבור 4', type: 'text', default: 'גני שעשועים' },
      { key: 'about.facility5', label: 'מבנה ציבור 5', type: 'text', default: 'ספרייה' },
      { key: 'about.facility6', label: 'מבנה ציבור 6', type: 'text', default: 'מועדון' },
      { key: 'about.facility7', label: 'מבנה ציבור 7', type: 'text', default: 'חדר חוגים' },
      { key: 'about.facility8', label: 'מבנה ציבור 8', type: 'text', default: 'מרכז עסקים' },
      { key: 'about.facility9', label: 'מבנה ציבור 9', type: 'text', default: 'מקווה נשים וגברים' },
      { key: 'about.facility10', label: 'מבנה ציבור 10', type: 'text', default: 'בית כנסת' },
      { key: 'about.climateText', label: 'קטע אקלים ומיקום', type: 'textarea', default: 'נופי נחמיה ממוקמת כ-6 דקות נסיעה מאריאל, בירת השומרון. היא שוכנת על צלעו של הר בגובה של 660 מטרים מעל פני הים, מה שמפנק את התושבים באוויר הרים צלול ובמזג אוויר נוח.' },
    ],
  },
  {
    section: 'infographic',
    label: 'אינפוגרפיקה (3 קוביות)',
    fields: [
      { key: 'infographic.stat1.value', label: 'קובייה 1 - מספר', type: 'text', default: '6 דקות' },
      { key: 'infographic.stat1.label', label: 'קובייה 1 - כותרת', type: 'text', default: 'מיקום מושלם' },
      { key: 'infographic.stat1.detail', label: 'קובייה 1 - הסבר', type: 'text', default: 'נסיעה מאריאל, בירת השומרון' },
      { key: 'infographic.stat2.value', label: 'קובייה 2 - מספר', type: 'text', default: '40%' },
      { key: 'infographic.stat2.label', label: 'קובייה 2 - כותרת', type: 'text', default: 'אינטימי - אבל בצמיחה' },
      { key: 'infographic.stat2.detail', label: 'קובייה 2 - הסבר', type: 'text', default: 'גידול עתידי תוך שנתיים' },
      { key: 'infographic.stat3.value', label: 'קובייה 3 - מספר', type: 'text', default: '100%' },
      { key: 'infographic.stat3.label', label: 'קובייה 3 - כותרת', type: 'text', default: 'איכות של אנשים' },
      { key: 'infographic.stat3.detail', label: 'קובייה 3 - הסבר', type: 'text', default: 'כל העשייה ביישוב - בהתנדבות' },
    ],
  },
  {
    section: 'housing',
    label: 'אפשרויות מגורים',
    fields: [
      { key: 'housing.eyebrow', label: 'תגית קטנה', type: 'text', default: 'אפשרויות מגורים' },
      { key: 'housing.heading', label: 'כותרת', type: 'text', default: 'אפשרויות מגורים ביישוב' },
      { key: 'housing.intro', label: 'טקסט פתיחה', type: 'textarea', default: 'ביישוב קיימות 3 אפשרויות מגורים עיקריות, ולשלושתן תהליך הקליטה זהה.' },
      { key: 'housing.rental.title', label: 'כרטיסייה 1 - כותרת', type: 'text', default: 'שכירות' },
      { key: 'housing.rental.body', label: 'כרטיסייה 1 - טקסט', type: 'textarea', default: 'את המידע על האפשרויות לשכירות בישוב ניתן למצוא בלינק הבא. המידע המתעדכן הינו באחריות בעלי היחידות בלבד ולוועדת קליטה אין קשר למידע הרשום. באחריות בעלי הבית להפנות את המשפחה אל ועדת קליטה ולהמשיך את תהליך הקליטה.' },
      { key: 'housing.rental.cta', label: 'כרטיסייה 1 - כפתור', type: 'text', default: 'ללוח הדירות (יתווסף)' },
      { key: 'housing.caravan.title', label: 'כרטיסייה 2 - כותרת', type: 'text', default: 'שכירת קרוואן' },
      { key: 'housing.caravan.body', label: 'כרטיסייה 2 - טקסט', type: 'textarea', default: 'ליישוב 2 שכונות קרוואנים. הרישום לרשימת ההמתנה לקרוואנים מתבצע כאן מטה. כאשר מתפנה קרוואן, ועדת קליטה תיצור קשר עם המשפחה שתורה הגיע. היות והביקוש למגורים ביישוב גבוה (ברוך השם), ההמתנה עלולה להתארך.' },
      { key: 'housing.caravan.cta', label: 'כרטיסייה 2 - כפתור', type: 'text', default: 'גלול לרישום' },
      { key: 'housing.purchase.title', label: 'כרטיסייה 3 - כותרת', type: 'text', default: 'רכישת בית בפרויקט הבנייה' },
      { key: 'housing.purchase.body', label: 'כרטיסייה 3 - טקסט', type: 'textarea', default: 'בימים אלה נבנה ביישוב פרויקט בנייה ב-2 שלבים. המעוניין לרכוש בית בפרויקט, ייצור קשר עם המשווק.' },
      { key: 'housing.purchase.cta', label: 'כרטיסייה 3 - כפתור', type: 'text', default: 'פרטי קשר עם המשווק' },
    ],
  },
  {
    section: 'process',
    label: 'תהליך הקליטה',
    fields: [
      { key: 'process.eyebrow', label: 'תגית קטנה', type: 'text', default: 'תהליך הקליטה' },
      { key: 'process.heading', label: 'כותרת', type: 'text', default: 'רוצים להצטרף? כך זה עובד' },
      { key: 'process.step1.title', label: 'שלב 1 - כותרת', type: 'text', default: 'ערב היכרות' },
      { key: 'process.step1.desc', label: 'שלב 1 - תיאור', type: 'text', default: 'עם ועדת קליטה' },
      { key: 'process.step2.title', label: 'שלב 2 - כותרת', type: 'text', default: 'שבת קליטה' },
      { key: 'process.step2.desc', label: 'שלב 2 - תיאור', type: 'text', default: 'היכרות עם היישוב והקהילה' },
      { key: 'process.step3.title', label: 'שלב 3 - כותרת', type: 'text', default: 'חתימה על חוזה' },
      { key: 'process.step3.desc', label: 'שלב 3 - תיאור', type: 'text', default: 'חוזה שכירות' },
      { key: 'process.step4.title', label: 'שלב 4 - כותרת', type: 'text', default: 'קליטה!' },
      { key: 'process.step4.desc', label: 'שלב 4 - תיאור', type: 'text', default: 'ברוכים הבאים הביתה' },
    ],
  },
  {
    section: 'registration',
    label: 'טופס הרשמה',
    fields: [
      { key: 'registration.eyebrow', label: 'תגית קטנה', type: 'text', default: 'הרשמה' },
      { key: 'registration.heading', label: 'כותרת', type: 'text', default: 'רישום לרשימת המתנה לקרוואנים' },
      { key: 'registration.intro', label: 'טקסט פתיחה', type: 'text', default: 'כל השדות הינם שדות חובה' },
      { key: 'registration.submitLabel', label: 'טקסט כפתור שליחה', type: 'text', default: 'שליחת רישום והצטרפות לרשימה' },
      { key: 'registration.confirmationTitle', label: 'הודעת תודה - כותרת', type: 'textarea', default: 'תודה שנרשמתם לרשימת ההמתנה לקרוואנים בנופי נחמיה' },
      { key: 'registration.confirmationBody', label: 'הודעת תודה - טקסט', type: 'textarea', default: 'במידה ויתפנה קרוואן, אנחנו ניצור קשר לפי סדר הרישום. אנא היערכותכם לכך שזמני ההמתנה ארוכים בשל ביקוש גדול ליישוב.' },
      { key: 'registration.field.familyName', label: 'שדה: שם משפחה', type: 'text', default: 'שם משפחה' },
      { key: 'registration.field.husbandName', label: 'שדה: שם פרטי (האיש)', type: 'text', default: 'שם פרטי (האיש)' },
      { key: 'registration.field.husbandPhone', label: 'שדה: טלפון (האיש)', type: 'text', default: 'טלפון (האיש)' },
      { key: 'registration.field.wifeName', label: 'שדה: שם פרטי (האישה)', type: 'text', default: 'שם פרטי (האישה)' },
      { key: 'registration.field.wifePhone', label: 'שדה: טלפון (האישה)', type: 'text', default: 'טלפון (האישה)' },
      { key: 'registration.field.childrenCount', label: 'שדה: מספר ילדים', type: 'text', default: 'מספר ילדים' },
      { key: 'registration.field.childrenBirthYears', label: 'שדה: שנות לידה', type: 'text', default: 'שנות לידה של הילדים' },
      { key: 'registration.field.childrenBirthYearsPlaceholder', label: 'דוגמה בשדה שנות לידה', type: 'text', default: 'לדוגמה: 2015, 2018, 2021' },
    ],
  },
  {
    section: 'footer',
    label: 'פוטר',
    fields: [
      { key: 'footer.orgName', label: 'שם היישוב', type: 'text', default: 'נופי נחמיה' },
      { key: 'footer.phone', label: 'טקסט טלפון', type: 'text', default: 'מזכירות היישוב: 00-0000000' },
      { key: 'footer.email', label: 'אימייל ליצירת קשר', type: 'text', default: 'info@example.org' },
      { key: 'footer.accessibilityLabel', label: 'טקסט קישור הצהרת נגישות', type: 'text', default: 'הצהרת נגישות' },
    ],
  },
];

export const DEFAULT_CONTENT = Object.fromEntries(
  CONTENT_SCHEMA.flatMap((section) => section.fields.map((field) => [field.key, field.default]))
);
