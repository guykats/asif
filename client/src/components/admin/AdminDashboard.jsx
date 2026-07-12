import { useState } from 'react';
import { Users, ImagePlus, KeyRound, LogOut, ExternalLink } from 'lucide-react';
import RegistrationsTable from './RegistrationsTable';
import AssetsManager from './AssetsManager';
import ChangePasswordForm from './ChangePasswordForm';
import './admin.css';

const TABS = [
  { key: 'registrations', label: 'נרשמים', icon: Users },
  { key: 'assets', label: 'נכסים גרפיים', icon: ImagePlus },
  { key: 'settings', label: 'הגדרות', icon: KeyRound },
];

export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('registrations');
  const username = localStorage.getItem('asif_admin_username') || 'admin';

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span>ועדת קליטה</span>
          <small>נופי נחמיה (אסיף)</small>
        </div>
        <nav className="admin-nav">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              className={`admin-nav__item ${tab === key ? 'is-active' : ''}`}
              onClick={() => setTab(key)}
            >
              <Icon size={18} /> {label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <a href="/" target="_blank" rel="noreferrer" className="admin-nav__item">
            <ExternalLink size={18} /> צפייה באתר
          </a>
          <button type="button" className="admin-nav__item" onClick={onLogout}>
            <LogOut size={18} /> התנתקות
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-main__topbar">
          <h1>שלום, {username}</h1>
        </header>
        {tab === 'registrations' && <RegistrationsTable />}
        {tab === 'assets' && <AssetsManager />}
        {tab === 'settings' && <ChangePasswordForm />}
      </main>
    </div>
  );
}
