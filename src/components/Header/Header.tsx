import Style from "./Header.module.css";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

interface HeaderProps {
  handleMenuStatus: () => void;
}

function Header({ handleMenuStatus }: HeaderProps) {
  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    handleMenuStatus();
  };

  return (
    <header className="w-full bg-black p-3">
      <ul className="flex flex-row items-center justify-between">
        <li>
          <label
            htmlFor="burger"
            className={`${Style.burger} relative block h-6 w-8 cursor-pointer bg-transparent`}
          >
            <input  
              id="burger"
              type="checkbox"
              className="hidden"
              onClick={handleClick}
            />
            <span className="absolute left-0 block h-1 w-full rotate-0 rounded-lg bg-white opacity-100 transition"></span>
            <span className="absolute left-0 block h-1 w-full rotate-0 rounded-lg bg-white opacity-100 transition"></span>
            <span className="absolute left-0 block h-1 w-full rotate-0 rounded-lg bg-white opacity-100 transition"></span>
          </label>
        </li>
        <li className="pt-1 font-Mallorca text-3xl leading-none text-white">
          <Link to="/">
            <h1>CAPFLOW</h1>
          </Link>
        </li>
        <li className="cursor-pointer">
          <Link to="/carrito">
            <IoCartOutline size={30} color="fff" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
