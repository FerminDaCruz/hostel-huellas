import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Footprint } from "@/components/shared/footprint";
import { ReservaForm } from "@/components/shared/ReservaForm";
import { Hero } from "@/components/contacto/Hero";
import { Canales } from "@/components/contacto/Canales";
import { Ubicacion } from "@/components/contacto/Ubicacion";
import { Faq } from "@/components/contacto/Faq";
import { Links } from "@/components/contacto/Links";

export const metadata = {
  title: "Contacto — Hostel Huellas Puelo",
  description:
    "Reservá online o escribinos por WhatsApp, Instagram o email. Hostel Huellas Puelo, Lago Puelo, Patagonia.",
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ReservaForm />
        <Canales />
        <Ubicacion />
        <Faq />
        <Links />
      </main>
      <Footer />
    </>
  );
}
