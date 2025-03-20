import { useGlobalContext } from "../../context/Global.context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Menu() {
  const { menuStatus } = useGlobalContext();
  const navigate = useNavigate();
  const { brands, handleSetRole, role, handleChangeMenuStatus } =
    useGlobalContext();

  const handleLogOut = () => {
    navigate("/");
    handleSetRole("ROLE_GUEST");
  };

  return (
    <div
      className="z-1 fixed top-14 flex h-dvh w-full max-w-44 flex-col justify-between bg-black pb-16 pl-3 pt-3 text-white transition-all"
      style={{ left: menuStatus ? 0 : "-176px" }}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">Marcas</h2>
        <ul>
          {brands?.map((brand) => (
            <li key={brand}>
              <Link
                to={`/section/${brand}`}
                className="transition-all hover:ml-5"
                onClick={handleChangeMenuStatus}
              >
                {brand}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {role !== "ROLE_GUEST" && role !== null ? (
        <button
          className="inline-flex"
          onClick={() => {
            handleLogOut();
            handleChangeMenuStatus();
          }}
        >
          Cerrar sesión
        </button>
      ) : (
        <Link to="/auth/login" onClick={handleChangeMenuStatus}>
          Iniciar sesión
        </Link>
      )}
    </div>
  );
}

export default Menu;
