import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WallOfFootprints } from "@/components/mainpage";
import { Footprint } from "@/components/footprint";

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
};

export default function InicioPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Historia />
        {/* <HuellaConcepto /> */}
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
