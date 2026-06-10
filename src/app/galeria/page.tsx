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
  alternates: { canonical: "/galeria" },
  openGraph: {
    title: "Galería — Hostel Huellas Puelo",
    description:
      "Más de 2000 huellas de viajeros de 32 países pintadas en las paredes. Fotos reales del hostel y la Patagonia.",
    url: "/galeria",
    images: [{ url: "/wall-footprints.jpg", width: 1200, height: 630, alt: "Mural de huellas en Hostel Huellas Puelo" }],
  },
  twitter: {
    title: "Galería — Hostel Huellas Puelo",
    description: "Más de 2000 huellas de viajeros de 32 países pintadas en las paredes.",
    images: ["/wall-footprints.jpg"],
  },
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
