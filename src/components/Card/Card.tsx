import { Link } from "react-router-dom";

interface CardProps {
  name: string;
  price: number;
  imageUrl: string;
  productId: string;
}

const Card = ({ name, price, imageUrl, productId }: CardProps) => {
  return (
    <div className="flex w-44 flex-col gap-2 rounded-xl px-2 py-4 shadow-lg sm:w-48 lg:w-60">
      <img
        src={imageUrl}
        alt={name}
        className="h-32 w-full rounded-lg object-cover sm:h-36 lg:h-40"
      />
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-wrap text-center text-base font-bold leading-none sm:text-lg">
          {name}
        </h3>
        <p className="text-sm font-semibold sm:text-base">
          ${price.toLocaleString("es-CO")} COP
        </p>
        <Link
          to={`/producto/${productId}`}
          className="rounded-md bg-black px-4 py-1 text-sm text-white sm:text-base"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default Card;
