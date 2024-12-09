export interface ProductDetail {
  size: string;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  imagesUrl: string[];
  details: ProductDetail[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsByBrand {
  [brand: string]: Product[];
}
