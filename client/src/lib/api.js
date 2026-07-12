const API_BASE = import.meta.env.VITE_API_BASE || '';

function authHeaders() {
  const token = localStorage.getItem('asif_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle(res) {
  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : await res.text();
  if (!res.ok) {
    const message = (data && data.error) || (data && data.errors) || 'שגיאה בשרת';
    const err = new Error(typeof message === 'string' ? message : 'שגיאה בשרת');
    err.details = data;
    throw err;
  }
  return data;
}

export const api = {
  getAssets: () => fetch(`${API_BASE}/api/assets`).then(handle),

  register: (payload) =>
    fetch(`${API_BASE}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(handle),

  login: (username, password) =>
    fetch(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then(handle),

  getRegistrations: () =>
    fetch(`${API_BASE}/api/admin/registrations`, { headers: authHeaders() }).then(handle),

  deleteRegistration: (id) =>
    fetch(`${API_BASE}/api/admin/registrations/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    }).then(handle),

  changePassword: (currentPassword, newPassword) =>
    fetch(`${API_BASE}/api/admin/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ currentPassword, newPassword }),
    }).then(handle),

  uploadAsset: (key, file) => {
    const form = new FormData();
    form.append('file', file);
    return fetch(`${API_BASE}/api/assets/${key}`, {
      method: 'POST',
      headers: authHeaders(),
      body: form,
    }).then(handle);
  },

  registrationsCsvUrl: () => `${API_BASE}/api/admin/registrations.csv`,
};

export { API_BASE };
