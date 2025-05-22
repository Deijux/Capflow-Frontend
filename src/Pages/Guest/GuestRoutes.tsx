import { Route, Routes } from "react-router-dom";
import { Home, Sections, CartShop, InfoProduct, Login } from "./Pages";
import ProtectedRoute from "../../middlewares/ProtectedRoutes";
import { UserRole } from "../../types";
import { GuestProvider } from "../../context";

const routes = [
  {
    path: "/section/:brand",
    element: <Sections />,
    allowedRoles: [] as UserRole[],
  },
  { path: "/carrito", element: <CartShop />, allowedRoles: [] as UserRole[] },
  {
    path: "/producto/:id",
    element: <InfoProduct />,
    allowedRoles: [] as UserRole[],
  },
  { path: "/auth/login", element: <Login />, allowedRoles: [] as UserRole[] },
];

export function GuestRoutes() {
  return (
    <GuestProvider>
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
    </GuestProvider>
  );
}
