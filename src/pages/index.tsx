import { Hero } from "components/landing/Hero";
import { BuildFeatures } from "components/landing/BuildFeatures";
import { Primitives } from "components/landing/Primitves";
import { DarkMode } from "components/landing/DarkMode";
import { Footer } from "components/global/layout/Footer";

export default function Home(props) {
  return (
    <div>
      <Hero />
      <BuildFeatures />
      <Primitives />
      <DarkMode />
      <Footer />
    </div>
  );
}
