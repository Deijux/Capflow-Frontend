import { Card } from "../../../../components";
import { Link } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";

export function Home() {
  return (
    <main className="flex h-dvh w-full justify-center px-3">
      <section className="w-full max-w-4xl">
        <div className="mt-2">
          <Link to="/section" className="inline-flex items-center gap-1">
            <h2 className="font-Poppins text-2xl font-semibold">GOORIN BROS</h2>
            <BiRightArrowAlt size={30} />
          </Link>
          <div className="w-full overflow-x-auto whitespace-nowrap">
            <div className="inline-flex gap-4 pb-4 pl-3">
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
        <div className="mt-2">
          <Link to="/section" className="inline-flex items-center gap-1">
            <h2 className="font-Poppins text-2xl font-semibold">GOORIN BROS</h2>
            <BiRightArrowAlt size={30} />
          </Link>
          <div className="w-full overflow-x-auto whitespace-nowrap">
            <div className="inline-flex gap-4 pb-4 pl-3">
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
        <div className="mt-2">
          <Link to="/section" className="inline-flex items-center gap-1">
            <h2 className="font-Poppins text-2xl font-semibold">GOORIN BROS</h2>
            <BiRightArrowAlt size={30} />
          </Link>
          <div className="w-full overflow-x-auto whitespace-nowrap">
            <div className="inline-flex gap-4 pb-4 pl-3">
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
