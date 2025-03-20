import Style from "./Header.module.css";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/Global.context";
import { useEffect, useState } from "react";

function Header() {
  const { menuStatus, handleChangeMenuStatus } = useGlobalContext();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setIsChecked(event.target.checked);
    handleChangeMenuStatus();
  };

  useEffect(() => {
    setIsChecked(menuStatus);
  }, [menuStatus]);

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
              checked={isChecked}
              onChange={handleClick}
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
