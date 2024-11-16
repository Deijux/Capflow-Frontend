import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../../../../services/LogIn";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const role = await loginService({ username, password });
    localStorage.setItem("role", role);
    if (role === "ROLE_ADMIN") return navigate("/admin/dashboard");
  };

  return (
    <section className="flex h-96 w-full items-center justify-center">
      <div className="flex justify-center rounded-md border py-5 shadow-md shadow-gray-300 first:w-96">
        <form onSubmit={onSubmit} className="flex w-fit flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              className="w-64 rounded border border-black px-2 py-1"
              type="text"
              id="username"
              placeholder="Ingrese su nombre de usuario"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Contraseña</label>
            <input
              className="w-64 rounded border border-black px-2 py-1"
              type="password"
              id="password"
              placeholder="Ingrese su contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="rounded bg-black py-1 text-white" type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </section>
  );
}
