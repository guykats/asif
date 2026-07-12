import { useState } from 'react';
import { Lock } from 'lucide-react';
import { api } from '../../lib/api';
import './admin.css';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.login(username, password);
      onLogin(data.token, data.username);
    } catch (err) {
      setError(err.message || 'שגיאה בהתחברות');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={handleSubmit}>
        <div className="admin-login__icon">
          <Lock size={26} />
        </div>
        <h1>כניסת ועדת קליטה</h1>
        <p className="admin-login__subtitle">דשבורד ניהול - נופי נחמיה (אסיף)</p>

        <div className="field">
          <label htmlFor="username">שם משתמש</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
        </div>
        <div className="field">
          <label htmlFor="password">סיסמה</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && <p className="admin-login__error">{error}</p>}

        <button type="submit" className="btn btn-primary admin-login__submit" disabled={loading}>
          {loading ? 'מתחבר...' : 'התחברות'}
        </button>
      </form>
    </div>
  );
}
