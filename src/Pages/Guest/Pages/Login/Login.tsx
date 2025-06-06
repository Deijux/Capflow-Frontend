import { useRef } from "react";
import { useLogin } from "../../../../hooks";

export function Login() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const login = useLogin();

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
      const role = await login.mutateAsync({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });

      if (role === "ROLE_ADMIN") window.location.href = "/admin/dashboard";
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <section className="flex h-[calc(100vh-64px)] w-full items-center justify-center">
      <div className="flex w-full max-w-[30rem] justify-center rounded-md border bg-white py-10 shadow-md shadow-gray-300">
        <form
          onSubmit={onSubmit}
          className="flex w-fit flex-col items-center gap-3"
        >
          <h2 className="text-balance text-center text-3xl font-semibold">
            Administracion CapFlow
          </h2>
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              className="rounded border border-black px-2 py-1"
              type="text"
              id="username"
              ref={usernameRef}
              placeholder="Ingrese su nombre de usuario"
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="password">Contraseña</label>
            <input
              className="rounded border border-black px-2 py-1"
              type="password"
              id="password"
              ref={passwordRef}
              placeholder="Ingrese su contraseña"
            />
          </div>
          <button
            className="h-10 w-full rounded bg-black py-1 text-lg text-white"
            type="submit"
          >
            Ingresar
          </button>
        </form>
      </div>
    </section>
  );
}
