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
  title: "Nosotros — Hostel Huellas Puelo",
  description:
    "La historia de Maxi y cómo nació Huellas Puelo en Lago Puelo, Patagonia. Conocé al fundador y guía de montaña detrás del hostel.",
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
