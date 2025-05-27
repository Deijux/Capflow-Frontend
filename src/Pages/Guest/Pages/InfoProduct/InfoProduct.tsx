import { useParams } from "react-router-dom";
import { useState } from "react";
import { Return, Image } from "../../../../components";
import { useProduct } from "../../../../hooks";
import { useCartShopStore } from "../../../../stores";

export function InfoProduct() {
  const { id } = useParams();
  const { cartShop, setCartShop } = useCartShopStore();
  const { data: product, isLoading } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const [quantityProduct, setQuantityProduct] = useState(0);
  const [size, setSize] = useState(undefined as string | undefined);

  if (isLoading) return <p>Cargando...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  const handleQuantityChange = (operation: string) => {
    setQuantity(
      (prev) =>
        operation === "increment"
          ? Math.min(prev + 1, quantityProduct) // No superar el stock disponible.
          : Math.max(prev - 1, 1), // No permitir menos de 1.
    );
  };

  const handleAddToCart = () => {
    if (!size) {
      alert("Por favor selecciona una talla");
      return;
    }

    if (quantity > quantityProduct) {
      alert("No hay suficiente stock disponible");
      return;
    }

    const existingProduct = cartShop.find(
      (item) => item.productId === product._id && item.size === size,
    );

    if (existingProduct) {
      setCartShop(
        cartShop.map((item) =>
          item.productId === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
    } else {
      setCartShop([
        ...cartShop,
        { productId: product._id, quantity, size, price: product.price },
      ]);
    }
  };

  return (
    <section className="flex flex-col items-center py-3 font-Poppins">
      <div className="w-full max-w-5xl pb-2">
        <Return />
      </div>
      <div className="w-full max-w-xl lg:max-w-full">
        <div className="flex flex-col justify-center gap-4 px-6 lg:flex-row lg:gap-5 xl:gap-14">
          <Image {...product} />
          <div className="flex flex-col gap-2 lg:w-full lg:max-w-96">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <p className="text-lg">{product.description}</p>
            <div>
              <h4 className="text-xl font-semibold">
                $ {product.price.toLocaleString("es-CO")} COP
              </h4>
              <span className="text-slate-700">Impuesto incluido</span>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-xl font-semibold">Tallas</h4>
              <ul className="flex flex-row flex-wrap gap-2">
                {product.details.map((detail) => (
                  <li
                    key={detail.size}
                    onClick={() => {
                      setQuantityProduct(detail.stock);
                      setSize(detail.size);
                    }}
                    className={`w-full max-w-[72px] cursor-pointer rounded-lg border border-black py-2 text-center text-lg font-semibold transition-colors duration-200 hover:bg-black hover:text-white ${
                      detail.stock === 0 ? "opacity-50" : ""
                    }`}
                    style={{
                      backgroundColor: size == detail.size ? "black" : "white",
                      color: size == detail.size ? "white" : "black",
                    }}
                  >
                    {detail.size}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Cantidad</h4>
              <div className="flex w-full max-w-24 justify-between rounded-md border border-black px-3 py-2">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  disabled={quantityProduct === 0}
                  className="disabled:cursor-not-allowed disabled:opacity-50"
                >
                  -
                </button>
                <select
                  name="cantidadProducto"
                  id="cantidadProducto"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={quantityProduct === 0}
                >
                  {Array.from({ length: quantityProduct }, (_, i) => i + 1).map(
                    (value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ),
                  )}
                </select>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  disabled={quantityProduct === 0}
                  className="disabled:cursor-not-allowed disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>
            {size && (
              <h4 className="medium">
                {quantityProduct > 0 && size
                  ? `Unidades disponibles: ${quantityProduct}`
                  : `No tenemos unidades disponibles`}
              </h4>
            )}
            {!size && (
              <h4 className="medium">
                Selecciona una talla para ver la disponibilidad
              </h4>
            )}
            <div className="flex flex-col gap-4">
              <button
                className="w-full rounded-md bg-black py-5 text-xl font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: quantityProduct === 0 ? "gray" : "black",
                }}
                disabled={quantityProduct === 0}
              >
                Comprar Ahora
              </button>
              <button
                className="w-full rounded-md border-2 border-black py-4 text-xl font-medium transition-colors duration-200 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: quantityProduct === 0 ? "gray" : "white",
                  color: quantityProduct === 0 ? "white" : "black",
                  borderColor: quantityProduct === 0 ? "transparent" : "black",
                }}
                onClick={handleAddToCart}
                disabled={quantityProduct === 0}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
