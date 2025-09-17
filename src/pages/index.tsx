import { FeaturedCategories } from '@/components/home/FeaturedCategories';
import { HeroBanner } from '@/components/home/HeroBanner';
import { TrendingProducts } from '@/components/home/TrendingProducts';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Product } from '@/types/product';


export default function Home({ products,uniqueData }: { products: Product[], uniqueData: Product[] }) {
  return (
    <>
    <Header />
     <HeroBanner />
     {uniqueData.length > 0 ? <FeaturedCategories products={uniqueData} /> : <LoadingSpinner />}
      <TrendingProducts products={products.slice(0,8)} />
      {/* <TrendingProducts/> */}
      <Footer/>
    </>
  )
}
export async function getServerSideProps() {
  const res = await fetch('https://dummyjson.com/products?limit=115');
  const data = await res.json();

  const uniqueData: Product[] = [];
  const  categories =  []
  const brands = [];
  for(const item of data.products){
    if(!uniqueData.some((prod) => prod.category === item.category)){
      uniqueData.push(item);
      categories.push(item.category);
      brands.push(item.brand);
    }
  }
  console.log(categories,brands, "categories");

  return {
    props: {
      products: data.products,
      uniqueData: uniqueData,
      categories: categories,
    },
  };
}
