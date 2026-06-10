import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ImagesComponent } from "@/components/galeria/ImagesComponent";
import { CtaComponent } from "@/components/shared/CtaComponent";
import { Hero } from "@/components/galeria/Hero";

export const metadata = {
  title: "Galería — Hostel Huellas Puelo",
  description:
    "Fotos del hostel, las huellas en las paredes, la naturaleza y los momentos de Huellas Puelo en Lago Puelo, Patagonia.",
};

export default function GaleriaPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ImagesComponent />
        <CtaComponent
          title="Tu foto puede estar acá el próximo año."
          label="Seguí descubriendo"
        />
      </main>
      <Footer />
    </>
  );
}
