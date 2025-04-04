import { useGlobalContext } from "../../context/Global.context";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Menu() {
  const location = useLocation();
  const navigate = useNavigate();
  const { menuStatus } = useGlobalContext();
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
              <div className="inline-block cursor-pointer [&>*:nth-child(odd)]:hover:ml-5">
                <Link
                  to={`/section/${brand}`}
                  className="transition-all"
                  onClick={handleChangeMenuStatus}
                >
                  {brand}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {role !== "ROLE_GUEST" && role !== null ? (
        location.pathname === "/admin/dashboard" ? (
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
          <Link to="/admin/dashboard" onClick={handleChangeMenuStatus}>
            Regresar al panel
          </Link>
        )
      ) : (
        <Link to="/auth/login" onClick={handleChangeMenuStatus}>
          Iniciar sesión
        </Link>
      )}
    </div>
  );
}

export default Menu;
