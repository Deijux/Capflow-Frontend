import { Card } from "../../../../components";
import { Link } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";
import { useGlobalContext } from "../../../../context/Global.context";
import { Product } from "../../../../types";

export function Home() {
  const { products } = useGlobalContext();

  if (!products) {
    return <div>Cargando productos...</div>;
  }

  return (
    <main className="flex h-dvh w-full justify-center px-3">
      <section className="w-full max-w-5xl">
        {Object.entries(products).map(([brand, brandProducts]) => (
          <div className="mt-2" key={brand}>
            <Link
              to={`/section/${brand}`}
              className="inline-flex items-center gap-1"
            >
              <h2 className="font-Poppins text-2xl font-semibold">
                {brand.toUpperCase()}
              </h2>
              <BiRightArrowAlt size={30} />
            </Link>
            <div className="w-full overflow-x-auto whitespace-nowrap">
              <div className="inline-flex gap-4 pb-4 pl-3">
                {brandProducts.slice(0, 4).map((product: Product) => (
                  <Card
                    key={product._id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imagesUrl[0]} // Mostramos la primera imagen
                    productId={product._id}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
