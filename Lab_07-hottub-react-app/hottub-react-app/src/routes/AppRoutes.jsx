import { Route, Routes } from 'react-router-dom';
import { APP_ROUTES, NOT_FOUND_ELEMENT } from './routeConfig';

function AppRoutes() {
  return (
    <Routes>
      {APP_ROUTES.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={NOT_FOUND_ELEMENT} />
    </Routes>
  );
}

export default AppRoutes;
