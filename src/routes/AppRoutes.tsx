import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Menu } from "../components";
import { Home, Sections, CarShop, InfoProduct, Login } from "../Pages";
import { useState } from "react";

const routes = [
  { path: "/section", element: <Sections />, allowedRoles: [] },
  { path: "/carrito", element: <CarShop />, allowedRoles: [] },
  { path: "/producto", element: <InfoProduct />, allowedRoles: [] },
  { path: "/auth/login", element: <Login />, allowedRoles: [] },
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
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
        <Menu menuStatus={menuStatus} />
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
