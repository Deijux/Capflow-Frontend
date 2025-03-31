import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./Pages";
import { ModalCreate } from "./components";

const routes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];

export function AdminRoutes() {
  return (
    <>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      <ModalCreate />
    </>
  );
}
