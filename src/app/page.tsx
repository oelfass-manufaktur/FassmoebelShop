import { Bestsellers } from "@/components/home/bestsellers";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { CustomCta } from "@/components/home/custom-cta";
import { Hero } from "@/components/home/hero";
import { Manufaktur } from "@/components/home/manufaktur";
import { Marquee } from "@/components/home/marquee";
import { SaleStrip } from "@/components/home/sale-strip";
import { Testimonials } from "@/components/home/testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <CategoryShowcase />
      <Bestsellers />
      <Manufaktur />
      <CustomCta />
      <SaleStrip />
      <Testimonials />
    </>
  );
}
