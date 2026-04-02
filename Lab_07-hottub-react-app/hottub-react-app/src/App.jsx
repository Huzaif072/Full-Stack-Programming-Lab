import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { initSiteInteractions } from './siteInteractions';
import AppRoutes from './routes/AppRoutes';
import { APP_ROUTES } from './routes/routeConfig';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    initSiteInteractions();
  }, [location.pathname]);

  useEffect(() => {
    const knownPaths = new Set(APP_ROUTES.map((page) => page.path));

    const onDocumentClick = (event) => {
      const anchor = event.target.closest('a[href]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      if (href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (anchor.target === '_blank') return;

      if (knownPaths.has(href)) {
        event.preventDefault();
        navigate(href);
      }
    };

    document.addEventListener('click', onDocumentClick);
    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, [navigate]);

  return (
    <AppRoutes />
  );
}

export default App;
