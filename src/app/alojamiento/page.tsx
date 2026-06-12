import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CtaComponent } from "@/components/shared/CtaComponent";
import { Hero } from "@/components/alojamiento/Hero";
import { Habitaciones } from "@/components/alojamiento/Habitaciones";
import { InfoSection } from "@/components/alojamiento/InfoSection";

export const metadata = {
  title: "Alojamiento — Hostel Huellas Puelo",
  description:
    "Dorms compartidos, habitaciones privadas con vista a la montaña y departamento en Lago Puelo. Precios y disponibilidad.",
  alternates: { canonical: "/alojamiento" },
  openGraph: {
    title: "Alojamiento — Hostel Huellas Puelo",
    description:
      "Dorms compartidos, habitaciones privadas con vista a la montaña y departamento en Lago Puelo. Precios y disponibilidad.",
    url: "/alojamiento",
    images: [{ url: "/assets/habitaciones/dorm-1.jpg", width: 1200, height: 630, alt: "Habitaciones en Hostel Huellas Puelo" }],
  },
  twitter: {
    title: "Alojamiento — Hostel Huellas Puelo",
    description: "Dorms compartidos, habitaciones privadas y departamento en Lago Puelo, Patagonia.",
    images: ["/assets/habitaciones/dorm-1.jpg"],
  },
};

export default function AlojamientoPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Habitaciones />
        <InfoSection />
        <CtaComponent
          title="Escribinos y armamos el plan a tu medida."
          label="¿Tenés dudas?"
        />
      </main>
      <Footer />
    </>
  );
}
