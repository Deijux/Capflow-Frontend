import { Routes, Route } from "react-router-dom";

const routes = [];

function AdminRoutes() {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default AdminRoutes;
