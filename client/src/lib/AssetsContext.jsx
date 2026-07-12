import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api, API_BASE } from './api';

const AssetsContext = createContext(null);

export function AssetsProvider({ children }) {
  const [assets, setAssets] = useState({});
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(() => {
    api
      .getAssets()
      .then((data) => setAssets(data.assets || {}))
      .catch(() => setAssets({}))
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const resolveUrl = useCallback(
    (key) => {
      const value = assets[key];
      return value ? `${API_BASE}${value}` : null;
    },
    [assets]
  );

  return (
    <AssetsContext.Provider value={{ assets, loaded, refresh, resolveUrl }}>
      {children}
    </AssetsContext.Provider>
  );
}

export function useAssets() {
  const ctx = useContext(AssetsContext);
  if (!ctx) throw new Error('useAssets must be used within AssetsProvider');
  return ctx;
}
