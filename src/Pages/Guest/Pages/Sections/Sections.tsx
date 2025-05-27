import { Card } from "../../../../components";
import { useParams } from "react-router-dom";
import { Product } from "../../../../types";
import { useProductsByBrand } from "../../../../hooks";
import { Return } from "../../../../components";

export function Sections() {
  const { brand } = useParams();
  const { data: products, isLoading } = useProductsByBrand(brand);

  if (isLoading) return <p>Cargando...</p>;
  if (!products) return <p>No hay productos disponibles</p>;

  return (
    <section className="flex justify-center p-3 font-Poppins">
      <div className="w-full max-w-5xl">
        <Return />
        <div>
          <h2 className="text-3xl font-semibold">{brand}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {products.map((product: Product) => (
              <Card
                key={product._id}
                name={product.name}
                price={product.price}
                imageUrl={product.imagesUrl[0]}
                productId={product._id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
