import { Card, SearchBar } from "../../../../components";
import { Link } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";
import { useGuestContext } from "../../../../context/Guest/Guest.context";
import { Product } from "../../../../types";

export function Home() {
  const { productsListed } = useGuestContext();

  if (!productsListed) {
    return <div>Cargando productos...</div>;
  }

  return (
    <main className="mt-2 flex min-h-dvh w-full flex-col items-center gap-2 px-3">
      <SearchBar />
      <section className="w-full max-w-5xl">
        {Object.entries(productsListed).map(([brand, brandProducts]) => (
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
