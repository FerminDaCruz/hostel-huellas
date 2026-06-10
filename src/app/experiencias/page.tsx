import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { actividades } from "@/lib/actividades";
import { CtaComponent } from "@/components/shared/CtaComponent";
import { Hero } from "@/components/experiencias/Hero";
import { Actividades } from "@/components/experiencias/Actividades";
import { MaxiSection } from "@/components/experiencias/MaxiSection";

export const metadata = {
  title: "Experiencias — Hostel Huellas Puelo",
  description:
    "Trekking al Cerro Currumahuida, kayak, bosques nativos y salidas personalizadas con Maxi, guía de montaña de Lago Puelo.",
  alternates: { canonical: "/experiencias" },
  openGraph: {
    title: "Experiencias en Lago Puelo — Hostel Huellas Puelo",
    description:
      "Trekking al Cerro Currumahuida, kayak, bosques nativos y salidas personalizadas con Maxi, guía de montaña de Lago Puelo.",
    url: "/experiencias",
    images: [{ url: "/exp-trek.jpg", width: 1200, height: 630, alt: "Trekking en Lago Puelo, Patagonia" }],
  },
  twitter: {
    title: "Experiencias en Lago Puelo — Hostel Huellas",
    description: "Trekking, kayak, bosques nativos y salidas con Maxi en Lago Puelo, Patagonia.",
    images: ["/exp-trek.jpg"],
  },
};

export default function ExperienciasPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Actividades actividades={actividades} />
        <MaxiSection />
        <CtaComponent
          label="¿Querés que Maxi te lleve?"
          title="Armamos un plan a tu medida."
          desc="Decinos cuántos días tenés, qué nivel de actividad preferís y qué querés ver. Maxi lo resuelve."
        />
      </main>
      <Footer />
    </>
  );
}
