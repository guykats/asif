import { useEffect, useState } from 'react';
import { Download, Trash2, Users } from 'lucide-react';
import { api } from '../../lib/api';

export default function RegistrationsTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    api
      .getRegistrations()
      .then((data) => setRows(data.registrations || []))
      .catch((err) => setError(err.message || 'שגיאה בטעינת הנתונים'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('למחוק את הרישום הזה?')) return;
    await api.deleteRegistration(id);
    load();
  };

  const handleExport = async () => {
    const token = localStorage.getItem('asif_admin_token');
    const res = await fetch(api.registrationsCsvUrl(), {
      headers: { Authorization: `Bearer ${token}` },
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrations.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel__header">
        <h2>
          <Users size={20} /> נרשמים לרשימת המתנה
          <span className="admin-panel__count">{rows.length}</span>
        </h2>
        <button type="button" className="btn btn-secondary" onClick={handleExport} disabled={rows.length === 0}>
          <Download size={16} /> ייצוא ל-CSV
        </button>
      </div>

      {loading && <p>טוען...</p>}
      {error && <p className="admin-login__error">{error}</p>}

      {!loading && rows.length === 0 && <p className="admin-panel__empty">אין רישומים עדיין.</p>}

      {!loading && rows.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>תאריך</th>
                <th>שם משפחה</th>
                <th>האיש</th>
                <th>טלפון האיש</th>
                <th>האישה</th>
                <th>טלפון האישה</th>
                <th>מס' ילדים</th>
                <th>שנות לידה</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.created_at}</td>
                  <td>{r.family_name}</td>
                  <td>{r.husband_name}</td>
                  <td dir="ltr">{r.husband_phone}</td>
                  <td>{r.wife_name}</td>
                  <td dir="ltr">{r.wife_phone}</td>
                  <td>{r.children_count}</td>
                  <td>{r.children_birth_years}</td>
                  <td>
                    <button type="button" className="admin-icon-btn" onClick={() => handleDelete(r.id)} aria-label="מחיקה">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
