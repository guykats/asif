import { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { api } from '../lib/api';
import { useContent } from '../lib/ContentContext';
import './RegistrationForm.css';

const initialForm = {
  familyName: '',
  husbandName: '',
  husbandPhone: '',
  wifeName: '',
  wifePhone: '',
  childrenCount: '',
  childrenBirthYears: '',
};

function validateClientSide(form) {
  const errors = {};
  const phoneRe = /^\d{10,}$/;
  const digitsOnly = (v) => v.replace(/[\s-]/g, '');

  if (!form.familyName.trim()) errors.familyName = 'שדה חובה';
  if (!form.husbandName.trim()) errors.husbandName = 'שדה חובה';
  if (!phoneRe.test(digitsOnly(form.husbandPhone))) errors.husbandPhone = 'מספר טלפון תקין (10 ספרות ומעלה)';
  if (!form.wifeName.trim()) errors.wifeName = 'שדה חובה';
  if (!phoneRe.test(digitsOnly(form.wifePhone))) errors.wifePhone = 'מספר טלפון תקין (10 ספרות ומעלה)';
  if (form.childrenCount === '' || Number(form.childrenCount) < 0 || !Number.isInteger(Number(form.childrenCount))) {
    errors.childrenCount = 'מספר ילדים לא יכול להיות שלילי';
  }
  if (!form.childrenBirthYears.trim()) errors.childrenBirthYears = 'שדה חובה';

  return errors;
}

export default function RegistrationForm() {
  const { t } = useContent();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handlePhoneChange = (field) => (e) => {
    const digits = e.target.value.replace(/[^\d]/g, '');
    setForm((f) => ({ ...f, [field]: digits }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientErrors = validateClientSide(form);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return;

    setSubmitting(true);
    setServerError('');
    try {
      await api.register({ ...form, childrenCount: Number(form.childrenCount) });
      setSubmitted(true);
    } catch (err) {
      setServerError(err.message || 'אירעה שגיאה, נסו שוב מאוחר יותר');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section registration" id="registration-form">
      <div className="container registration__inner">
        {submitted ? (
          <div className="registration__confirmation">
            <CheckCircle2 size={56} className="registration__confirmation-icon" />
            <h2>{t('registration.confirmationTitle')}</h2>
            <p>{t('registration.confirmationBody')}</p>
          </div>
        ) : (
          <>
            <span className="eyebrow eyebrow--light">{t('registration.eyebrow')}</span>
            <h2 className="registration__heading">{t('registration.heading')}</h2>
            <p className="registration__intro">{t('registration.intro')}</p>

            <form className="registration__form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="familyName">{t('registration.field.familyName')}</label>
                <input
                  id="familyName"
                  type="text"
                  value={form.familyName}
                  onChange={handleChange('familyName')}
                  aria-invalid={!!errors.familyName}
                />
                {errors.familyName && <span className="field__error">{errors.familyName}</span>}
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="husbandName">{t('registration.field.husbandName')}</label>
                  <input
                    id="husbandName"
                    type="text"
                    value={form.husbandName}
                    onChange={handleChange('husbandName')}
                    aria-invalid={!!errors.husbandName}
                  />
                  {errors.husbandName && <span className="field__error">{errors.husbandName}</span>}
                </div>
                <div className="field">
                  <label htmlFor="husbandPhone">{t('registration.field.husbandPhone')}</label>
                  <input
                    id="husbandPhone"
                    type="tel"
                    inputMode="numeric"
                    value={form.husbandPhone}
                    onChange={handlePhoneChange('husbandPhone')}
                    aria-invalid={!!errors.husbandPhone}
                  />
                  {errors.husbandPhone && <span className="field__error">{errors.husbandPhone}</span>}
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="wifeName">{t('registration.field.wifeName')}</label>
                  <input
                    id="wifeName"
                    type="text"
                    value={form.wifeName}
                    onChange={handleChange('wifeName')}
                    aria-invalid={!!errors.wifeName}
                  />
                  {errors.wifeName && <span className="field__error">{errors.wifeName}</span>}
                </div>
                <div className="field">
                  <label htmlFor="wifePhone">{t('registration.field.wifePhone')}</label>
                  <input
                    id="wifePhone"
                    type="tel"
                    inputMode="numeric"
                    value={form.wifePhone}
                    onChange={handlePhoneChange('wifePhone')}
                    aria-invalid={!!errors.wifePhone}
                  />
                  {errors.wifePhone && <span className="field__error">{errors.wifePhone}</span>}
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="childrenCount">{t('registration.field.childrenCount')}</label>
                  <input
                    id="childrenCount"
                    type="number"
                    min="0"
                    step="1"
                    value={form.childrenCount}
                    onChange={handleChange('childrenCount')}
                    aria-invalid={!!errors.childrenCount}
                  />
                  {errors.childrenCount && <span className="field__error">{errors.childrenCount}</span>}
                </div>
                <div className="field">
                  <label htmlFor="childrenBirthYears">{t('registration.field.childrenBirthYears')}</label>
                  <input
                    id="childrenBirthYears"
                    type="text"
                    placeholder={t('registration.field.childrenBirthYearsPlaceholder')}
                    value={form.childrenBirthYears}
                    onChange={handleChange('childrenBirthYears')}
                    aria-invalid={!!errors.childrenBirthYears}
                  />
                  {errors.childrenBirthYears && <span className="field__error">{errors.childrenBirthYears}</span>}
                </div>
              </div>

              {serverError && <p className="registration__server-error">{serverError}</p>}

              <button type="submit" className="btn btn-primary registration__submit" disabled={submitting}>
                <Send size={18} />
                {submitting ? 'שולח...' : t('registration.submitLabel')}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
