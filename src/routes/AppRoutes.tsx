import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Menu } from "../components";
import { Home, Sections, CarShop, InfoProduct, Login } from "../Pages";
import { AdminRoutes } from "../Pages";
import ProtectedRoute from "../middlewares/ProtectedRoutes";
import { useState } from "react";

const routes = [
  { path: "/section", element: <Sections />, allowedRoles: [] },
  { path: "/carrito", element: <CarShop />, allowedRoles: [] },
  { path: "/producto", element: <InfoProduct />, allowedRoles: [] },
  { path: "/auth/login", element: <Login />, allowedRoles: [] },
  { path: "/admin/*", element: <AdminRoutes />, allowedRoles: ["ROLE_ADMIN"] },
];

function AppRoutes() {
  const [menuStatus, setMenuStatus] = useState<boolean>(false);

  const handleChangeMenuStatus = () => {
    setMenuStatus((prev) => !prev);
  };

  return (
    <>
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
    </>
  );
}

export default AppRoutes;
