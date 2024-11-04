import { Link } from "react-router-dom";

interface MenuProps {
  menuStatus: boolean;
}

function Menu({ menuStatus }: MenuProps) {
  return (
    <div
      className="z-1 fixed top-14 flex h-dvh w-full max-w-44 flex-col justify-between bg-black pb-16 pl-3 pt-3 text-white transition-all"
      style={{ left: menuStatus ? 0 : "-176px" }}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">Marcas</h2>
        <ul>
          <li>
            <Link to="/section" className="transition-all hover:ml-5">
              GOORIN BROS
            </Link>
          </li>
          <li>
            <Link to="/section" className="transition-all hover:ml-5">
              MONASTERY
            </Link>
          </li>
          <li>
            <Link to="/section" className="transition-all hover:ml-5">
              NEW ERA
            </Link>
          </li>
          <li>
            <Link to="/section" className="transition-all hover:ml-5">
              VANS
            </Link>
          </li>
        </ul>
      </div>
      <Link to="/auth/login">Iniciar sesión</Link>
    </div>
  );
}

export default Menu;
