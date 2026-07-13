import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from './api';
import { DEFAULT_CONTENT } from './content';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [overrides, setOverrides] = useState({});
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(() => {
    api
      .getContent()
      .then((data) => setOverrides(data.content || {}))
      .catch(() => setOverrides({}))
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const t = useCallback(
    (key) => {
      const value = overrides[key];
      return value !== undefined && value !== null && value !== '' ? value : DEFAULT_CONTENT[key];
    },
    [overrides]
  );

  return (
    <ContentContext.Provider value={{ t, overrides, loaded, refresh }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
