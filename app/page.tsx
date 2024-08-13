import {
  CategoryMenu,
  Hero,
  Incentives,
  IntroducingSection,
  Newsletter,
  ProductsSection,
} from "@/components";
import CookieBanner from "@/components/CookieBanner";
import Modal from "@/components/Modal";

export default function Home() {
  return (
    <>
      <CategoryMenu />
      {/* <Hero /> */}
      <Modal/>
      <CookieBanner/>
      <ProductsSection />
    </>
  );
}
