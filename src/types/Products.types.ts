interface details {
  size: string;
  stock: number;
}

export interface Products {
  name: string;
  description: string;
  brand: string;
  price: number;
  details: details[];
}
