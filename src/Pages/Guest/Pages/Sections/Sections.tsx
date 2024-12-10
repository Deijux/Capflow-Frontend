import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { Card } from "../../../../components";
import { getProductByBrand } from "../../../../services";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../../../../types";

export function Sections() {
  const { brand } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productsData = await getProductByBrand(brand);
        setProducts(productsData);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    };

    fetchProduct();
  }, [brand]);

  if (!products) return <p>Cargando...</p>;

  return (
    <section className="flex justify-center p-3 font-Poppins">
      <div className="w-full max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-1">
          <BiArrowBack />
          Regresar al inicio
        </Link>
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
