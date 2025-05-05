import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Menu } from "../components";
import { AdminRoutes, GuestRoutes } from "../Pages";
import ProtectedRoute from "../middlewares/ProtectedRoutes";
import { GlobalProvider } from "../context";
import { UserRole } from "../types";
import { Unauthorized } from "../Pages/Guest/Pages";

const routes = [
  {
    path: "/*",
    element: <GuestRoutes />,
    allowedRoles: [] as UserRole[],
  },
  {
    path: "/admin/*",
    element: <AdminRoutes />,
    allowedRoles: ["ROLE_ADMIN"] as UserRole[],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
    allowedRoles: [] as UserRole[],
  },
];

function AppRoutes() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          {routes.map(({ path, element, allowedRoles }) =>
            allowedRoles.length > 0 ? (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute allowedRoles={allowedRoles}>
                    {element}
                  </ProtectedRoute>
                }
              />
            ) : (
              <Route key={path} path={path} element={element} />
            ),
          )}
        </Routes>
        <Menu />
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default AppRoutes;
