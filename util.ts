import { SalesRaw, Sales, ProductsRaw, Product } from "./types";
export const toSales = (salesRaw: SalesRaw): Sales[] => {
  if (!salesRaw) return null;
  const sales: Sales[] = [];
  /* Firebase will return you a big object not an array */
  for (const key in salesRaw) {
    sales.push({
      id: key,
      username: salesRaw[key].username,
      volume: salesRaw[key].volume,
    });
  }
  return sales;
};

export const toProducts = (productsRaw: ProductsRaw): Product[] => {
  if (!productsRaw) return null;
  const products: Product[] = [];
  /* Firebase will return you a big object not an array */
  for (const key in productsRaw) {
    products.push({
      id: key,
      title: productsRaw[key].title,
      description: productsRaw[key].description,
    });
  }
  return products;
};
