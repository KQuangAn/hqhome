import EcommerceFeatures from "@/components/shared/product/ecommerce-features";
import ProductList from "@/components/shared/product/product-list";
import HeroCarousel from "@/components/shared/hero-carousel";
import CategoryBanner from "@/components/shared/category-banner";
import {
  getLatestProducts,
  getBestSellingProducts,
} from "@/lib/actions/product.actions";

export default async function Home() {
  const latestProducts = await getLatestProducts();
  const bestSellingProducts = await getBestSellingProducts();
  
  return (
    <div className="space-y-12">
      <HeroCarousel />
      <CategoryBanner />
      <div className="space-y-12">
        <ProductList titleKey="product.best_sellers" data={bestSellingProducts} />
        <ProductList titleKey="product.newest_arrivals" data={latestProducts} />
        <EcommerceFeatures />
      </div>
    </div>
  );
}
