import { useCartShopStore } from "../../../../stores";
import { Link } from "react-router-dom";
import { CartItem } from "../../components";

export function CartShop() {
  const { cartShop } = useCartShopStore();
  const totalItems = cartShop.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartShop.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );

  return (
    <section className="flex w-full flex-col items-center gap-3 p-3 font-Poppins">
      <div className="flex w-full max-w-md flex-col gap-3">
        <h2 className="text-2xl font-bold">Tu carrito - {totalItems}</h2>
        <div className="flex flex-col items-center gap-3 px-3">
          {cartShop.map((item) => (
            <CartItem key={item.productId + item.size} {...item} />
          ))}
        </div>
        {totalItems > 0 ? (
          <div className="flex w-full flex-col justify-center gap-1">
            <h3 className="font-bold">
              <span className="font-semibold">Total:</span> {totalPrice} COP
            </h3>
            <button className="w-full rounded-md bg-black py-4 text-center text-white">
              Comprar ahora
            </button>
          </div>
        ) : (
          <div className="flex w-full max-w-96 flex-col items-center gap-3 rounded-lg border border-black bg-white px-3 py-2">
            <h3 className="text-2xl font-bold">Tu carrito está vacío</h3>
            <p className="text-lg">Agrega productos para ver el total</p>
            <Link
              to={"/"}
              className="w-full max-w-32 rounded-lg bg-black py-2 text-center text-white"
            >
              Ir a la tienda
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
