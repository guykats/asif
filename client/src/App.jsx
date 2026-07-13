import { Routes, Route } from 'react-router-dom';
import { AssetsProvider } from './lib/AssetsContext';
import { ContentProvider } from './lib/ContentContext';
import Landing from './pages/Landing';
import Admin from './pages/Admin';

export default function App() {
  return (
    <AssetsProvider>
      <ContentProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </ContentProvider>
    </AssetsProvider>
  );
}
