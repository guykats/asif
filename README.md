# נופי נחמיה (אסיף) - אתר ועדת קליטה

דף נחיתה + מערכת ניהול (דשבורד אדמין) לוועדת הקליטה של נופי נחמיה.

## מבנה הפרויקט

```
client/   אתר React (Vite) - דף הנחיתה + /admin
server/   שרת Node/Express + SQLite - API, אימות אדמין, ניהול נכסים, טופס הרשמה
```

באפליקציה המוגמרת (production) שרת ה-Node הוא שמגיש גם את קבצי האתר הבנויים (`client/dist`)
וגם את ה-API תחת `/api`. כלומר בפועל רץ **תהליך Node אחד בלבד**.

## הרצה מקומית לפיתוח

צריך שני טרמינלים פתוחים במקביל:

```bash
# טרמינל 1 - שרת
cd server
npm install
cp .env.example .env      # ואז לערוך שם משתמש/סיסמה למנהל
npm run seed-admin        # יוצר את משתמש האדמין הראשוני
npm run dev                # רץ על פורט 3000

# טרמינל 2 - קליינט
cd client
npm install
npm run dev                 # רץ על פורט 5173, מפנה קריאות /api ו-/uploads לשרת
```

גשו ל- http://localhost:5173 לאתר, ול- http://localhost:5173/admin לניהול.

## בנייה להפקה (Production build)

```bash
cd client && npm install && npm run build     # יוצר client/dist
cd ../server && npm install
npm start                                     # מגיש גם את client/dist וגם את ה-API
```

כברירת מחדל השרת רץ על הפורט שמוגדר במשתנה הסביבה `PORT` (ברירת מחדל 3000).

בהפעלה הראשונה, אם אין עדיין אף משתמש אדמין ב-DB, השרת יוצר אחד אוטומטית לפי `ADMIN_USERNAME`/
`ADMIN_PASSWORD` מה-`.env`. `npm run seed-admin` הוא כלי ידני נפרד לאיפוס סיסמה (למשל אם שכחתם
אותה) - הוא **תמיד** דורס את הסיסמה לערך שב-`.env`, ולכן לא רץ אוטומטית בכל דיפלוי, כדי שלא
יבטל בטעות סיסמה ששונתה מהדשבורד.

## משתני סביבה (server/.env)

```
PORT=3000
JWT_SECRET=מחרוזת אקראית וארוכה - חובה לשנות בפרודקשן
ADMIN_USERNAME=admin
ADMIN_PASSWORD=לשנות לסיסמה חזקה
```

## פריסה על Hostinger עם Git Deploy (hPanel) - השיטה המומלצת

זו השיטה שבה אתם משתמשים בפועל. ב-hPanel יש פיצ'ר Git (בדרך כלל תחת "מתקדם" › "Git") שמאפשר
לחבר ריפו GitHub ולמשוך ממנו קוד אוטומטית או בלחיצת כפתור.

1. **מיזגו קודם את ה-PR** (`claude/react-website-build-05bj6m` ← `main`) ב-GitHub, כדי שענף
   `main` יכיל את כל הקוד.
2. ב-hPanel, תחת הדומיין הרלוונטי, פותחים "Git" ומוסיפים:
   - **Repository**: `https://github.com/guykats/asif.git`
   - **Branch**: `main`
   - **Directory**: תיקייה כלשהי בחשבון (לדוגמה `asif-app`) - לא חובה שתהיה `public_html`,
     כי זו לא אתר סטטי אלא אפליקציית Node.
3. עושים "Deploy" (או מפעילים Auto Deployment אם קיים) - זה מושך את כל תוכן הריפו (גם
   `client/` וגם `server/`) לתיקייה שנבחרה.
4. בתיקייה שנוצרה יש סקריפט `deploy.sh` בשורש הריפו שמבצע build לקליינט + התקנת תלויות בשרת.
   אם ל-hPanel יש שדה "Deploy script"/"Post-deploy command" - הדביקו שם `bash deploy.sh`.
   אם אין שדה כזה, מריצים אותו ידנית פעם אחת דרך ה-Terminal המובנה של hPanel:
   ```bash
   cd ~/<הנתיב-לתיקייה-שנבחרה>
   bash deploy.sh
   ```
5. עדיין תחת "מתקדם", פותחים "Setup Node.js App" ומגדירים:
   - **Application root**: התיקייה שבחרתם ב-Git ›  `server` (לדוגמה `asif-app/server`)
   - **Application startup file**: `src/index.js`
   - **Node.js version**: 20 ומעלה
   - **Environment variables**: `JWT_SECRET` (מחרוזת אקראית ארוכה), `ADMIN_USERNAME`,
     `ADMIN_PASSWORD`
6. שומרים ולוחצים "Restart" על האפליקציה.
7. מוודאים שהדומיין/תת-דומיין מצביע על אפליקציית ה-Node.js הזו (לא על תיקיית `public_html`
   רגילה).

**בכל פעם שיש עדכון קוד** (push חדש ל-`main`): לוחצים "Deploy" שוב ב-Git tab (או מחכים
ל-Auto Deployment אם מופעל), ואז מריצים שוב `bash deploy.sh` (ידנית או אוטומטית, תלוי אם
hPanel תומך בהרצת סקריפט אחרי pull) - הסקריפט גם "מבקש" מהאפליקציה להתאתחל בסוף (touch
ל-`tmp/restart.txt`, קונבנציה נפוצה לשרתי Passenger); אם זה לא מספיק, יש ללחוץ "Restart"
ידנית ב-hPanel.

> אם במהלך ההגדרה מתברר שממשק ה-hPanel שלכם נראה שונה ממה שמתואר כאן (Hostinger משנים
> ממשקים לפעמים) - תארו לי מה אתם רואים ואמשיך להדריך בהתאם.

### אלטרנטיבה: VPS / Cloud Hosting (יש גישת SSH)

1. מתחברים ב-SSH לשרת.
2. משכפלים את הריפו: `git clone <repo-url> asif && cd asif`
3. בונים את הקליינט:
   ```bash
   cd client && npm install && npm run build && cd ..
   ```
4. מתקינים את תלויות השרת:
   ```bash
   cd server && npm install
   ```
5. יוצרים `server/.env` עם `JWT_SECRET` אקראי, ו-`ADMIN_USERNAME`/`ADMIN_PASSWORD` משלכם, ואז:
   ```bash
   npm run seed-admin
   ```
6. מריצים את השרת דרך מנהל תהליכים (מומלץ [pm2](https://pm2.keymetrics.io/)) כדי שישאר פעיל:
   ```bash
   npm install -g pm2
   pm2 start src/index.js --name asif-site
   pm2 save
   pm2 startup   # מאפשר הפעלה אוטומטית מחדש לאחר ריסטארט לשרת
   ```
7. מגדירים reverse proxy (Nginx, שכבר קיים כברירת מחדל ברוב שרתי Hostinger VPS) מהדומיין
   לפורט שהשרת מאזין לו (למשל 3000).

> אם יתברר שבפועל יש רק אירוח PHP קלאסי בלי אפשרות Node.js, יהיה צורך לשדרג תוכנית או
> לעבור ל-VPS - האתר הזה (React + Node + SQLite) לא ירוץ על אירוח PHP-בלבד.

### גיבוי הנתונים

בסיס הנתונים הוא קובץ SQLite יחיד ב-`server/data/asif.db`, והתמונות שהועלו נמצאות ב-
`server/uploads/`. מומלץ לגבות את שתי התיקיות האלה מדי פעם (ל-Hostinger יש גיבויים
אוטומטיים ברוב התוכניות, אבל כדאי לוודא שהתיקיות האלה כלולות).

## דשבורד ניהול (`/admin`)

- **נרשמים**: טבלת כל מי שנרשם לרשימת ההמתנה לקרוואנים, כולל ייצוא ל-CSV ומחיקת רישום.
- **נכסים גרפיים**: החלפת הלוגו ותמונת הרקע של מסך הפתיחה. עד להעלאת קבצים אמיתיים האתר
  מציג placeholder עיצובי בגווני הטבע של האתר.
- **הגדרות**: החלפת סיסמת המנהל.

ההתחברות מבוססת שם משתמש + סיסמה בודדים (מוגדרים ב-`.env` / דרך `npm run seed-admin`), עם
אפשרות להחליף סיסמה מתוך הדשבורד.

## דברים להשלים לפני עלייה לאוויר

- [ ] להחליף את הלוגו ותמונת הרקע האמיתיים (דרך הדשבורד, בלי צורך בפריסה מחדש)
- [ ] לעדכן פרטי קשר אמיתיים בפוטר (`client/src/components/Footer.jsx`)
- [ ] להוסיף קישור אמיתי ללוח הדירות להשכרה (`client/src/components/HousingOptions.jsx`)
- [ ] להוסיף פרטי קשר אמיתיים למשווק פרויקט הבנייה (`client/src/components/HousingOptions.jsx`)
- [ ] להוסיף קישור אמיתי להצהרת נגישות (`client/src/components/Footer.jsx`)
- [ ] לשנות סיסמת אדמין מברירת המחדל
