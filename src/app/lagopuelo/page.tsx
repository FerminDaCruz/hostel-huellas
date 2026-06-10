import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/lagopuelo/Hero";
import { Introduccion } from "@/components/lagopuelo/Introduccion";
import { Actividades } from "@/components/lagopuelo/Actividades";
import { actividades } from "@/lib/actividades";
import { Temporadas } from "@/components/lagopuelo/Temporadas";
import { ComoLlegar } from "@/components/lagopuelo/ComoLlegar";
import { CtaComponent } from "@/components/shared/CtaComponent";

export const metadata = {
  title: "Lago Puelo — Qué hacer, cómo llegar y cuándo ir",
  description:
    "Guía completa de Lago Puelo, Patagonia. Parque Nacional, trekking, kayak, playa y todo lo que podés hacer cerca de Hostel Huellas Puelo.",
  alternates: { canonical: "/lagopuelo" },
  openGraph: {
    title: "Lago Puelo, Patagonia — Guía completa",
    description:
      "Parque Nacional, trekking, kayak, playa y todo lo que podés hacer en Lago Puelo. A 18 km de El Bolsón.",
    url: "/lagopuelo",
    images: [{ url: "/explore-puelo.jpg", width: 1200, height: 630, alt: "Lago Puelo, Patagonia Argentina" }],
  },
  twitter: {
    title: "Lago Puelo, Patagonia — Guía completa",
    description: "Parque Nacional, trekking, kayak y todo lo que podés hacer en Lago Puelo.",
    images: ["/explore-puelo.jpg"],
  },
};

export default function LagoPueloPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Introduccion />
        <Actividades actividades={actividades.slice(0, 6)} />
        <Temporadas />
        <ComoLlegar />
        <CtaComponent
          title="Si ya sabés que querés venir, el hostel te espera."
          label="Lago Puelo"
        />
      </main>
      <Footer />
    </>
  );
}
