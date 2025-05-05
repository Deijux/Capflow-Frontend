import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./Pages";
import { ModalCreate, ModalEdit } from "./components";
import { AdminProvider } from "../../context";

const routes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];

export function AdminRoutes() {
  return (
    <AdminProvider>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      <ModalCreate />
      <ModalEdit />
    </AdminProvider>
  );
}
