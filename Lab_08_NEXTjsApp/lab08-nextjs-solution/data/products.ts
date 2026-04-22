export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export const products: Product[] = [
  {
    id: "1",
    title: "Mechanical Keyboard",
    description:
      "A hot-swappable keyboard with tactile switches and RGB backlighting.",
    price: 89.99,
  },
  {
    id: "2",
    title: "Wireless Mouse",
    description:
      "Ergonomic wireless mouse with silent clicks and multi-device support.",
    price: 39.5,
  },
  {
    id: "3",
    title: "27-inch Monitor",
    description:
      "QHD IPS monitor with a 144Hz refresh rate for smooth productivity.",
    price: 279.0,
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
