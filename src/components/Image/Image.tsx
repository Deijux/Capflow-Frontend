import { useState } from "react";

interface Product {
  name: string;
  imagesUrl: string[];
}

const Image = (product: Product) => {
  const [mainImage, setMainImage] = useState(product.imagesUrl[0]);
  const handleImageClick = (imageUrl: string) => {
    setMainImage(imageUrl);
  };
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-2 rounded-xl px-2 py-4 shadow-lg">
      <img
        src={mainImage}
        alt="Main product"
        className="w-full rounded-lg object-cover"
      />
      {product.imagesUrl.length > 1 && (
        <div className="flex flex-row gap-2">
          {product.imagesUrl.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={product.name}
              className="h-20 w-20 cursor-pointer rounded-lg object-cover"
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Image;
