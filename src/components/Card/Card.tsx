import { Link } from "react-router-dom";

interface CardProps {
  name: string;
  price: number;
  imageUrl: string;
  productId: string;
}

const Card = ({ name, price, imageUrl, productId }: CardProps) => {
  return (
    <div className="flex w-full max-w-44 flex-col gap-2 rounded-xl px-2 py-4 shadow-lg sm:max-w-48">
      <img
        src={imageUrl}
        alt={name}
        className="h-40 w-full rounded-lg object-cover"
      />
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-center text-sm font-bold">{name}</h3>
        <p className="text-sm font-semibold">$ {price.toLocaleString()}</p>
        <Link
          to={`/producto/${productId}`}
          className="rounded-md bg-black px-4 py-1 text-white"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default Card;
