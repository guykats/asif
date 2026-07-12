import { useState } from 'react';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem('asif_admin_token'));

  const handleLogin = (newToken, username) => {
    localStorage.setItem('asif_admin_token', newToken);
    localStorage.setItem('asif_admin_username', username);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('asif_admin_token');
    localStorage.removeItem('asif_admin_username');
    setToken(null);
  };

  if (!token) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
