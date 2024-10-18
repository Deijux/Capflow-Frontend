import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Header from "../components/Header/Header";
import Sections from "../Pages/Sections/Sections";
import CarShop from "../Pages/CarShop/CarShop";
import InfoProduct from "../Pages/InfoProduct/InfoProduct";
import Menu from "../components/Menu/Menu";
import { useState } from "react";

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
          <Route path="/section" element={<Sections />} />
          <Route path="/carrito" element={<CarShop />} />
          <Route path="/producto" element={<InfoProduct />} />
        </Routes>
        <Menu menuStatus={menuStatus} />
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
