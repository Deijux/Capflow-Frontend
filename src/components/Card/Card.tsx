import img from "../../assets/GOORIN-BROS-PANTHER.webp";
import { Link } from "react-router-dom";

function Card() {
  return (
    <div className="flex w-full max-w-44 flex-col gap-2 rounded-xl px-2 py-4 shadow-lg sm:max-w-48">
      <img src={img} alt="Image" />
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-center text-sm font-bold">GOORIN BROS PANTHER</h3>
        <p className="text-sm font-semibold">$ 220.000</p>
        <Link
          to={"/producto"}
          className="rounded-md bg-black px-4 py-1 text-white"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
}

export default Card;
