import {
  CategoryMenu,
  Hero,
  Incentives,
  IntroducingSection,
  Newsletter,
  ProductsSection,
} from "@/components";
import Modal from "@/components/Modal";

export default function Home() {
  return (
    <>
      <CategoryMenu />
      {/* <Hero /> */}
      <Modal/>
      <ProductsSection />
    </>
  );
}
