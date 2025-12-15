import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          const content = route.layout ? route.layout({ children: route.element }) : route.element;
          return <Route key={route.path} path={route.path} element={content} />;
        })}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
