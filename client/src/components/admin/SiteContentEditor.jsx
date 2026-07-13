import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, FileText, Save } from 'lucide-react';
import { api } from '../../lib/api';
import { useContent } from '../../lib/ContentContext';
import { CONTENT_SCHEMA, DEFAULT_CONTENT } from '../../lib/content';

function SectionAccordion({ section, values, onChange, isOpen, onToggle }) {
  return (
    <div className="content-section">
      <button type="button" className="content-section__header" onClick={onToggle}>
        <span>{section.label}</span>
        <ChevronDown size={18} className={`content-section__chevron ${isOpen ? 'is-open' : ''}`} />
      </button>
      {isOpen && (
        <div className="content-section__body">
          {section.fields.map((field) => (
            <div className="content-field" key={field.key}>
              <label htmlFor={field.key}>{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.key}
                  rows={3}
                  value={values[field.key] ?? ''}
                  onChange={(e) => onChange(field.key, e.target.value)}
                />
              ) : (
                <input
                  id={field.key}
                  type="text"
                  value={values[field.key] ?? ''}
                  onChange={(e) => onChange(field.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SiteContentEditor() {
  const { overrides, loaded, refresh } = useContent();
  const [values, setValues] = useState(DEFAULT_CONTENT);
  const [openSection, setOpenSection] = useState(CONTENT_SCHEMA[0].section);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loaded) return;
    setValues({ ...DEFAULT_CONTENT, ...overrides });
  }, [loaded, overrides]);

  const handleChange = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    setDirty(true);
    setMessage('');
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setMessage('');
    try {
      await api.updateContent(values);
      refresh();
      setDirty(false);
      setMessage('הטקסטים נשמרו ועודכנו באתר');
    } catch (err) {
      setError(err.message || 'שמירת הטקסטים נכשלה');
    } finally {
      setSaving(false);
    }
  };

  const handleResetSection = (section) => {
    setValues((v) => {
      const next = { ...v };
      section.fields.forEach((field) => {
        next[field.key] = field.default;
      });
      return next;
    });
    setDirty(true);
  };

  const sections = useMemo(() => CONTENT_SCHEMA, []);

  return (
    <div className="admin-panel">
      <div className="admin-panel__header">
        <h2>
          <FileText size={20} /> תוכן האתר
        </h2>
        <button type="button" className="btn btn-primary" onClick={handleSave} disabled={saving || !dirty}>
          <Save size={16} /> {saving ? 'שומר...' : 'שמירת כל השינויים'}
        </button>
      </div>

      <p className="admin-panel__hint">
        כל טקסט בדף הנחיתה ניתן לעריכה כאן - כותרות, פסקאות, תוויות כפתורים ופרטי קשר. לחצו על
        סקשן כדי לפתוח אותו, ערכו טקסט, ואז לחצו על "שמירת כל השינויים" למעלה.
      </p>

      {message && <p className="admin-success">{message}</p>}
      {error && <p className="admin-login__error">{error}</p>}

      <div className="content-sections">
        {sections.map((section) => (
          <SectionAccordion
            key={section.section}
            section={section}
            values={values}
            onChange={handleChange}
            isOpen={openSection === section.section}
            onToggle={() => setOpenSection(openSection === section.section ? null : section.section)}
          />
        ))}
      </div>

      {openSection && (
        <button
          type="button"
          className="content-reset-hint"
          onClick={() => handleResetSection(sections.find((s) => s.section === openSection))}
        >
          איפוס הסקשן הפתוח לברירת המחדל
        </button>
      )}
    </div>
  );
}
