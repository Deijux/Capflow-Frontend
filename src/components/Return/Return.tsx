import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Return = () => {
  const navigate = useNavigate();

  return (
    <button
      className="inline-flex items-center gap-1 text-lg"
      onClick={() => {
        if (window.history.state && window.history.state.idx > 0) {
          navigate(-1);
        } else {
          navigate("/");
        }
      }}
    >
      <BiArrowBack />
      Regresar
    </button>
  );
};

export default Return;
