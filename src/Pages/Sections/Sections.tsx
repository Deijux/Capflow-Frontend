import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { Card } from "../../components";

function Sections() {
  return (
    <section className="flex justify-center p-3 font-Poppins">
      <div className="w-full max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-1">
          <BiArrowBack />
          Regresar al inicio
        </Link>
        <div>
          <h2 className="text-2xl font-semibold">GOORIN BROS</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sections;
