import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

export interface ProductVariant {
  name: string;
  options: string[];
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
