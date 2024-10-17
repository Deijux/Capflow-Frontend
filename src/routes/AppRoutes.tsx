import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Header from "../components/Header/Header";
import Sections from "../Pages/Sections/Sections";
import CarShop from "../Pages/CarShop/CarShop";

function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/section" element={<Sections />} />
          <Route path="/carrito" element={<CarShop />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
