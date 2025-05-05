import { useNavigate } from "react-router-dom";

export function Unauthorized() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <div className="mb-6 flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Acceso no autorizado
        </h1>
        <p className="mb-6 text-gray-600">
          No tienes permisos para acceder a esta página. Por favor, regresa a la
          página de inicio o vuelve a iniciar sesión.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={handleGoHome}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-700"
          >
            Ir al inicio
          </button>
          <button
            onClick={handleGoLogin}
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition duration-200 hover:bg-gray-300"
          >
            Iniciar sesión
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Código de error: 401 Unauthorized</p>
      </div>
    </div>
  );
}
