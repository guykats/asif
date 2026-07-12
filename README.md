# נופי נחמיה (אסיף) - אתר ועדת קליטה

דף נחיתה + מערכת ניהול (דשבורד אדמין) לוועדת הקליטה של נופי נחמיה.

## מבנה הפרויקט

```
client/    אתר React (Vite) - דף הנחיתה + /admin (קוד מקור)
backend/   שרת Laravel (PHP) + MySQL - API, אימות אדמין, ניהול נכסים, טופס הרשמה
```

**חשוב**: `backend/public/` מכיל גם את קוד ה-PHP של Laravel (`index.php`, `.htaccess`) וגם
עותק בנוי (build) של אתר ה-React (`index.html`, `assets/`). זו תיקייה אחת שמשמשת כ-web root
היחיד באתר החי - Laravel מגיש את דף הבית/העמודים דרך ה-React ואת ה-API תחת `/api/*`, הכל
מתוך תהליך PHP אחד. ראו "עדכון האתר בעתיד" למטה לגבי איך זה נשמר מעודכן.

## הרצה מקומית לפיתוח

צריך שני טרמינלים פתוחים במקביל:

```bash
# טרמינל 1 - בקאנד (Laravel)
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan admin:ensure     # יוצר משתמש אדמין ראשוני לפי ADMIN_USERNAME/ADMIN_PASSWORD מה-.env
php artisan storage:link
php artisan serve             # רץ על http://localhost:8000

# טרמינל 2 - קליינט (React, לפיתוח בלבד - עם hot reload)
cd client
npm install
npm run dev                   # רץ על http://localhost:5173, מפנה /api ו-/storage לשרת
```

בפיתוח גשו ל-http://localhost:5173 (עם hot reload). אפשר גם לגשת ישירות ל-http://localhost:8000
ולראות את הגרסה הבנויה שכבר בתוך `backend/public` (בלי hot reload).

## עדכון האתר בעתיד (חשוב!)

לחשבון ה-Hostinger **אין Node.js/npm מותקן** (רק PHP), אז אי אפשר להריץ `npm run build` על
השרת עצמו. בגלל זה, קובצי ה-build של ה-React (`backend/public/index.html`, `backend/public/assets/`)
**נשמרים ונדחפים ל-git** - זה חריג ביחס לפרויקטים רגילים, אבל הכרחי כאן.

**המשמעות**: בכל פעם שרוצים לשנות משהו בעיצוב/בתוכן של דף הנחיתה או הדשבורד - יש לבקש מקלוד
(או להריץ בעצמכם אם יש לכם Node מקומי):
```bash
cd client && npm run build
cp -r dist/assets ../backend/public/assets
cp dist/index.html dist/favicon.svg ../backend/public/
```
ואז לעשות commit+push. שינויים בקוד ה-PHP בלבד (`backend/app`, `backend/routes` וכו') לא דורשים
את זה.

## משתני סביבה מרכזיים (backend/.env)

```
APP_URL=https://asif.guykats.com
DB_CONNECTION=mysql
DB_DATABASE=...       # מה-hPanel > Databases
DB_USERNAME=...
DB_PASSWORD=...
ADMIN_USERNAME=admin
ADMIN_PASSWORD=לשנות לסיסמה חזקה
```

`php artisan admin:ensure` יוצר את משתמש האדמין **רק אם עדיין אין אף אחד** - בטוח להריץ בכל
דיפלוי, לא ידרוס סיסמה ששונתה מהדשבורד. לאיפוס ידני של הסיסמה (למשל נשכחה) יש
`php artisan admin:reset-password` - זה כן דורס תמיד.

## פריסה על Hostinger (אירוח משותף, ללא Node.js)

הבדיקה שעשינו הראתה שהתוכנית שלכם היא אירוח PHP משותף (CloudLinux/CageFS) בלי תמיכת Node.js,
אבל **עם** SSH, git ו-PHP/Composer זמינים. הדומיין `asif.guykats.com` כבר מוגדר עם `public_html`
ריק (חוץ מ-`default.php`).

### שלב 1: יצירת בסיס נתונים

ב-hPanel: Databases → MySQL Databases → צרו DB חדש + משתמש עם סיסמה. שמרו את שם ה-DB,
שם המשתמש והסיסמה.

### שלב 2: שכפול הקוד ב-SSH

```bash
cd ~/domains/asif.guykats.com
git clone https://github.com/guykats/asif.git asif-src
cd asif-src/backend
```

### שלב 3: התקנת תלויות PHP

```bash
composer install --no-dev --optimize-autoloader
```

### שלב 4: קונפיגורציה

```bash
cp .env.example .env
php artisan key:generate
```

ואז לערוך את `.env` (למשל עם `nano .env`) ולמלא:
- `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` - מה-DB שיצרתם בשלב 1 (בד"כ `DB_HOST=localhost`
  ב-Hostinger, לא `127.0.0.1` - אם `migrate` נכשל עם שגיאת חיבור, זה השינוי הראשון לנסות)
- `ADMIN_PASSWORD` - סיסמה חזקה משלכם
- `APP_URL=https://asif.guykats.com`

### שלב 5: הקמת בסיס הנתונים ואדמין

```bash
php artisan migrate --force
php artisan admin:ensure
php artisan storage:link
```

### שלב 6: חיבור הדומיין לתיקיית ה-public הנכונה

זה השלב הקריטי - `public_html` חייב להצביע על `backend/public` (לא על שורש הריפו), אחרת קוד
האפליקציה (`.env`, `vendor/` וכו') יהיה חשוף לאינטרנט.

```bash
rm -rf ~/domains/asif.guykats.com/public_html
ln -s ~/domains/asif.guykats.com/asif-src/backend/public ~/domains/asif.guykats.com/public_html
```

### שלב 7: בדיקה

גשו ל-https://asif.guykats.com - אמור להופיע דף הנחיתה. גשו ל-/admin והתחברו עם
ה-ADMIN_USERNAME/ADMIN_PASSWORD שהגדרתם.

> **הערה**: אל תשתמשו בפיצ'ר "Deploy from GitHub" של hPanel לפרויקט הזה - הוא מושך קבצים
> ישירות ל-`public_html`, מה שיחשוף את קוד השרת. השיטה הנכונה כאן היא שכפול ידני מחוץ ל-
> `public_html` + symlink, כמו למעלה.

### עדכון האתר בעתיד (אחרי שינויי קוד)

```bash
cd ~/domains/asif.guykats.com/asif-src
git pull
cd backend
composer install --no-dev --optimize-autoloader   # רק אם composer.json/lock השתנו
php artisan migrate --force                          # רק אם יש migration חדש
php artisan admin:ensure
```

אין תהליך שצריך להפעיל מחדש (PHP-FPM טוען קוד מחדש בכל בקשה), אז זה כל מה שצריך.

## דשבורד ניהול (`/admin`)

- **נרשמים**: טבלת כל מי שנרשם לרשימת ההמתנה לקרוואנים, כולל ייצוא ל-CSV ומחיקת רישום.
- **נכסים גרפיים**: החלפת הלוגו ותמונת הרקע של מסך הפתיחה. עד להעלאת קבצים אמיתיים האתר
  מציג placeholder עיצובי בגווני הטבע של האתר.
- **הגדרות**: החלפת סיסמת המנהל.

ההתחברות מבוססת שם משתמש + סיסמה בודדים, עם טוקן (Laravel Sanctum) במקום עוגיות - זהה
בהתנהגות למה שהיה קודם.

## דברים להשלים לפני עלייה לאוויר

- [ ] להחליף את הלוגו ותמונת הרקע האמיתיים (דרך הדשבורד, בלי צורך בפריסה מחדש)
- [ ] לעדכן פרטי קשר אמיתיים בפוטר (`client/src/components/Footer.jsx`)
- [ ] להוסיף קישור אמיתי ללוח הדירות להשכרה (`client/src/components/HousingOptions.jsx`)
- [ ] להוסיף פרטי קשר אמיתיים למשווק פרויקט הבנייה (`client/src/components/HousingOptions.jsx`)
- [ ] להוסיף קישור אמיתי להצהרת נגישות (`client/src/components/Footer.jsx`)
- [ ] לשנות סיסמת אדמין מברירת המחדל
