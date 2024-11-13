import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Menu } from "../components";
import { Home, Sections, CarShop, InfoProduct, Login } from "../Pages";
import { AdminRoutes } from "../Pages";
import ProtectedRoute from "../middlewares/ProtectedRoutes";
import { useState } from "react";
import { GlobalProvider } from "../context/Global.provider";
import { UserRole } from "../types";

const routes = [
  { path: "/section", element: <Sections />, allowedRoles: [] as UserRole[] },
  { path: "/carrito", element: <CarShop />, allowedRoles: [] as UserRole[] },
  {
    path: "/producto",
    element: <InfoProduct />,
    allowedRoles: [] as UserRole[],
  },
  { path: "/auth/login", element: <Login />, allowedRoles: [] as UserRole[] },
  {
    path: "/admin/*",
    element: <AdminRoutes />,
    allowedRoles: ["ROLE_ADMIN"] as UserRole[],
  },
];

function AppRoutes() {
  const [menuStatus, setMenuStatus] = useState<boolean>(false);

  const handleChangeMenuStatus = () => {
    setMenuStatus((prev) => !prev);
  };

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header handleMenuStatus={handleChangeMenuStatus} />
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
        <Menu menuStatus={menuStatus} />
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default AppRoutes;
