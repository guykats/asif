import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { api } from '../../lib/api';

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await api.changePassword(currentPassword, newPassword);
      setMessage('הסיסמה עודכנה בהצלחה');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setError(err.message || 'עדכון הסיסמה נכשל');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel__header">
        <h2>
          <KeyRound size={20} /> החלפת סיסמה
        </h2>
      </div>
      <form className="admin-password-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="currentPassword">סיסמה נוכחית</label>
          <input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="newPassword">סיסמה חדשה</label>
          <input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        {message && <p className="admin-success">{message}</p>}
        {error && <p className="admin-login__error">{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'מעדכן...' : 'עדכון סיסמה'}
        </button>
      </form>
    </div>
  );
}
