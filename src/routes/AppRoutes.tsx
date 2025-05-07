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
        <div className="flex min-h-[calc(100vh-64px)] flex-col bg-gray-100">
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
        </div>
        <Menu />
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default AppRoutes;
