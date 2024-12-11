import { Card } from "../../../../components";
import { useParams } from "react-router-dom";
import { Product } from "../../../../types";
import { useProductsByBrand } from "../../../../hooks/useProducts";
import { Return } from "../../../../components/Return/Return";

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
          <h2 className="text-3xl font-semibold">GOORIN BROS</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {products.map((product: Product) => (
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
    </section>
  );
}
