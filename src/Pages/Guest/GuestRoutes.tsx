import { Route, Routes } from "react-router-dom";
import { Home, Sections, CarShop, InfoProduct, Login } from "./Pages";
import ProtectedRoute from "../../middlewares/ProtectedRoutes";
import { GlobalProvider } from "../../context/Global.provider";
import { UserRole } from "../../types";

const routes = [
  {
    path: "/section/:brand",
    element: <Sections />,
    allowedRoles: [] as UserRole[],
  },
  { path: "/carrito", element: <CarShop />, allowedRoles: [] as UserRole[] },
  {
    path: "/producto/:id",
    element: <InfoProduct />,
    allowedRoles: [] as UserRole[],
  },
  { path: "/auth/login", element: <Login />, allowedRoles: [] as UserRole[] },
];

export function GuestRoutes() {
  return (
    <GlobalProvider>
      <Routes>
        <Route index element={<Home />} />
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
    </GlobalProvider>
  );
}
