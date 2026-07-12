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
npm run seed-admin                            # פעם אחת, ליצירת/עדכון משתמש אדמין
npm start                                     # מגיש גם את client/dist וגם את ה-API
```

כברירת מחדל השרת רץ על הפורט שמוגדר במשתנה הסביבה `PORT` (ברירת מחדל 3000).

## משתני סביבה (server/.env)

```
PORT=3000
JWT_SECRET=מחרוזת אקראית וארוכה - חובה לשנות בפרודקשן
ADMIN_USERNAME=admin
ADMIN_PASSWORD=לשנות לסיסמה חזקה
```

לאחר שינוי `ADMIN_USERNAME`/`ADMIN_PASSWORD` יש להריץ שוב `npm run seed-admin` כדי שהשינוי ייכנס
לתוקף (אפשר גם פשוט להתחבר לדשבורד ולהחליף סיסמה דרך "הגדרות").

## פריסה על Hostinger

לא היה ברור איזה סוג אירוח יש בחשבון ה-Hostinger, אז הנה הוראות לשני המקרים הנפוצים:

### אופציה A: VPS / Cloud Hosting (יש גישת SSH)

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

### אופציה B: אירוח שיתופי (Shared/Business) עם תמיכת Node.js דרך hPanel

ב-hPanel של Hostinger יש תחת "מתקדם" את "Setup Node.js App":

1. מעלים את תוכן הריפו לתיקיית האתר (דרך Git deploy אם קיים, או FTP/File Manager).
2. ב-hPanel, יוצרים אפליקציית Node.js חדשה:
   - **Application root**: תיקיית `server/`
   - **Application startup file**: `src/index.js`
   - **Node.js version**: 20 ומעלה
3. פותחים את ה"Terminal" המובנה של hPanel (או SSH אם זמין) ומריצים:
   ```bash
   cd ~/<נתיב-לאתר>/client && npm install && npm run build
   cd ~/<נתיב-לאתר>/server && npm install
   npm run seed-admin
   ```
4. במסך ניהול אפליקציית ה-Node.js, מגדירים משתני סביבה: `JWT_SECRET`, `ADMIN_USERNAME`,
   `ADMIN_PASSWORD` (ואפשר גם `PORT` אם נדרש - לרוב hPanel קובע אותו אוטומטית).
5. לוחצים "Restart" על האפליקציה.
6. מוודאים שהדומיין/תת-דומיין מצביע על אפליקציית ה-Node.js הזו.

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
