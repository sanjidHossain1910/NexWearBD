import { HeroBanner } from "@/components/home/hero-banner";
import { ProductSection } from "@/components/home/product-section";
import { CategorySection } from "@/components/home/category-section";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { CustomerReviews } from "@/components/home/customer-reviews";
import { Newsletter } from "@/components/home/newsletter";
import { getHomeProducts } from "@/services/product.service";
import RecentlyViewed from "@/components/products/RecentlyViewd";
import Worning from "@/components/utility/Page-worning";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { featured, arrivals, bestSellers } = await getHomeProducts();
  return (
    <>
      <Worning />
      <HeroBanner />
      <ProductSection title="Featured Products" subtitle="Nexwear essentials picked by our team." products={featured} />
      <div className="md:mx-12 ">
        <RecentlyViewed />
      </div>
      <ProductSection title="New Arrivals" subtitle="Fresh cuts and colors just landed." products={arrivals} />
      <ProductSection title="Best Sellers" subtitle="Customer favorites with proven fit." products={bestSellers} />
      <CategorySection />
      <WhyChooseUs />
      <CustomerReviews />
      <Newsletter />
    </>
  );
}

//