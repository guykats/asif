import { useRef, useState } from 'react';
import { ImagePlus, Image as ImageIcon } from 'lucide-react';
import { api, API_BASE } from '../../lib/api';
import { useAssets } from '../../lib/AssetsContext';

function AssetUploadCard({ label, hint, assetKey }) {
  const { assets, refresh } = useAssets();
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const currentUrl = assets[assetKey] ? `${API_BASE}${assets[assetKey]}` : null;

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      await api.uploadAsset(assetKey, file);
      refresh();
    } catch (err) {
      setError(err.message || 'העלאה נכשלה');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="asset-card">
      <div className="asset-card__preview">
        {currentUrl ? (
          <img src={currentUrl} alt={label} />
        ) : (
          <div className="asset-card__placeholder">
            <ImageIcon size={28} />
            <span>אין תמונה, מוצג placeholder באתר</span>
          </div>
        )}
      </div>
      <div className="asset-card__body">
        <h3>{label}</h3>
        <p>{hint}</p>
        {error && <p className="admin-login__error">{error}</p>}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={handleFile}
          hidden
        />
        <button type="button" className="btn btn-secondary" onClick={() => inputRef.current?.click()} disabled={uploading}>
          <ImagePlus size={16} /> {uploading ? 'מעלה...' : 'החלפת תמונה'}
        </button>
      </div>
    </div>
  );
}

export default function AssetsManager() {
  return (
    <div className="admin-panel">
      <div className="admin-panel__header">
        <h2>
          <ImagePlus size={20} /> ניהול נכסים גרפיים
        </h2>
      </div>
      <p className="admin-panel__hint">
        כאן ניתן להחליף את הלוגו ואת תמונת הרקע של מסך הפתיחה. עד להעלאת קבצים אמיתיים, האתר
        מציג placeholder עיצובי.
      </p>
      <div className="admin-assets-grid">
        <AssetUploadCard assetKey="logo" label="לוגו היישוב" hint="מומלץ קובץ PNG/SVG עם רקע שקוף" />
        <AssetUploadCard assetKey="hero" label="תמונת רקע - מסך פתיחה" hint="מומלץ תמונת נוף רחבה באיכות גבוהה" />
      </div>
    </div>
  );
}
