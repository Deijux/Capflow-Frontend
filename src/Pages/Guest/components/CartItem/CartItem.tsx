import { Link } from "react-router-dom";
import { useProduct } from "../../../../hooks";
import { useCartShopStore } from "../../../../stores/carShopStore";

interface CartItemProps {
  productId: string;
  size: string;
  quantity: number;
}

const CartItem = ({ productId, size, quantity }: CartItemProps) => {
  const { data: product } = useProduct(productId);
  const { deleteCartShop } = useCartShopStore();
  const handleDelete = () => {
    deleteCartShop(productId, size);
  };

  const isProductInStock = product?.details.some(
    (detail) => detail.size === size && detail.stock >= quantity,
  );

  return (
    <div className="flex w-full max-w-96 flex-col items-center gap-3 rounded-lg border border-black bg-white p-3">
      <Link
        to={`/producto/${product?._id}`}
        key={productId}
        className="flex w-full max-w-96 flex-row items-center justify-center gap-6"
      >
        <img
          src={product?.imagesUrl[0]}
          alt={product?.name + " image"}
          className="w-full max-w-32 rounded-lg"
        />
        <div>
          <h3 className="text-base font-bold">{product?.name}</h3>
          <p>
            <span className="font-semibold">Talla:</span> {size}
          </p>
          <p>
            <span className="font-semibold">Cantidad:</span> {quantity}
          </p>
          <p>
            <span className="font-semibold">Precio:</span> $
            {quantity * parseFloat(product?.price.toString() || "0")} COP
          </p>
          <p className={`${isProductInStock ? "font-black" : "text-red-700"}`}>
            <span className="font-semibold">Stock: </span>
            {isProductInStock ? "Disponible" : "No disponible"}
          </p>
        </div>
      </Link>
      <button
        onClick={handleDelete}
        className="mt-2 w-full rounded-md bg-red-500 py-2 text-center text-white"
      >
        <span className="ml-1">Eliminar</span>
      </button>
    </div>
  );
};

export default CartItem;
