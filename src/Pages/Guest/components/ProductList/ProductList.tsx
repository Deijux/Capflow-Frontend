import { Card } from "../../../../components";
import { Product } from "../../../../types";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="inline-flex gap-4 pb-4 pl-3">
      {products.map((product: Product) => (
        <Card
          key={product.id}
          name={product.name}
          price={product.price}
          imageUrl={product.imagesUrl[0]}
          productId={product.id}
        />
      ))}
    </div>
  );
};
export default ProductList;
