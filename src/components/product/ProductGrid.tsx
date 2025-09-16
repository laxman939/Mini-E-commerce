import { Product } from "@/types/product"
import { ProductCard } from "./ProductCard"



export interface ProductVariant {
  name: string
  options: string[]
}

// export interface Product {
//   id: number
//   title: string
//   price: number
//   thumbnail: string
//   rating: number
//   category: string
//   name?: string
//   description: string
//   inStock?: boolean
//   brand: string
//   image: string
//   reviewCount: number
//   originalPrice?: number
//   variants?: ProductVariant[]
//   selectedVariant: {
//     name: string;
//     value: string;
//   };
// }

export default function ProductGrid({ products }: { products: Product[] }) {
  console.log(products)
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
