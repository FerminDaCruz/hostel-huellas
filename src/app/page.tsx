import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WallOfFootprints } from "@/components/mainpage";
import { Footprint } from "@/components/shared/footprint";

import {
  Hero,
  Historia,
  AlojamientoPreview,
  ExperienciasPreview,
  HuellaConcepto,
  PorQueHuellas,
  LagoPueloTeaser,
  CtaFinal,
} from "@/components/Inicio";

export const metadata = {
  title: "Hostel Huellas Puelo — Lago Puelo, Patagonia",
  description:
    "Hostel con alma de aventura en Lago Puelo, Patagonia. Guía de montaña, fogones, comunidad de viajeros y el Parque Nacional en la puerta.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hostel Huellas Puelo — Lago Puelo, Patagonia",
    description:
      "Hostel con alma de aventura en Lago Puelo, Patagonia. Guía de montaña, fogones, comunidad de viajeros y el Parque Nacional en la puerta.",
    url: "/",
    images: [{ url: "/hero-lake.jpg", width: 1200, height: 630, alt: "Lago Puelo desde Hostel Huellas" }],
  },
  twitter: {
    title: "Hostel Huellas Puelo — Lago Puelo, Patagonia",
    description:
      "Hostel con alma de aventura en Lago Puelo, Patagonia. Guía de montaña, fogones, comunidad de viajeros y el Parque Nacional en la puerta.",
    images: ["/hero-lake.jpg"],
  },
};

export default function InicioPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Historia />
        <PorQueHuellas />
        <AlojamientoPreview />
        <ExperienciasPreview />
        <WallOfFootprints />
        <LagoPueloTeaser />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
