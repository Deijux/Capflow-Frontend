export interface SizeStock {
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
  details: SizeStock[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsByBrand {
  [brand: string]: Product[];
}

export interface productParams {
  q?: string;
}

export interface productCartShop {
  productId: string;
  quantity: number;
  price: number;
  size: string;
}
