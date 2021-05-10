export type Product = ProductContent & {
  id: string;
};

export type ProductContent = {
  title: string;
  description: string;
};

export type ProductsRaw = { [key: string]: ProductContent };

export type SalesContent = {
  username: string;
  volume: number;
};

export type Sales = SalesContent & {
  id: string;
};

export type SalesRaw = { [key: string]: SalesContent };
