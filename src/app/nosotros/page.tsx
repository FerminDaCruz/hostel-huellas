import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Footprint } from "@/components/shared/footprint";
import { Hero } from "@/components/nosotros/Hero";
import { Historia } from "@/components/nosotros/Historia";
import { Ecosistema } from "@/components/nosotros/Ecosistema";
import { CtaFinal } from "@/components/nosotros/CtaFinal";

export const metadata = {
  title: "Nuestra Historia — Hostel Huellas Puelo",
  description:
    "La historia de Maxi y cómo nació Huellas Puelo en Lago Puelo, Patagonia. Conocé al fundador y guía de montaña detrás del hostel.",
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: "La historia de Huellas Puelo — Lago Puelo, Patagonia",
    description:
      "Maxi dejó la ciudad en 2017 para construir un lugar donde los viajeros dejen su huella. Conocé la historia detrás del hostel.",
    url: "/nosotros",
    images: [{ url: "/maxi-portrait.jpg", width: 1200, height: 630, alt: "Maxi, fundador de Hostel Huellas Puelo" }],
  },
  twitter: {
    title: "La historia de Huellas Puelo",
    description: "Maxi dejó la ciudad en 2017 para construir un lugar donde los viajeros dejen su huella.",
    images: ["/maxi-portrait.jpg"],
  },
};

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Historia />
        <Ecosistema />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
