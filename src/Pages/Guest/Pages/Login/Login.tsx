import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../../../../services/LogIn";

export function Login() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!usernameRef.current || !passwordRef.current) {
      console.error("Los campos de usuario y contraseña no están definidos.");
      return;
    }

    if (usernameRef.current.value === "" || passwordRef.current.value === "") {
      console.error("Los campos no pueden estar vacíos.");
      return;
    }

    try {
      const role = await loginService({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      localStorage.setItem("role", role);

      if (role === "ROLE_ADMIN") navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
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
              ref={usernameRef}
              placeholder="Ingrese su nombre de usuario"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Contraseña</label>
            <input
              className="w-64 rounded border border-black px-2 py-1"
              type="password"
              id="password"
              ref={passwordRef}
              placeholder="Ingrese su contraseña"
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
