import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ImagesComponent } from "@/components/galeria/ImagesComponent";
import { CtaComponent } from "@/components/shared/CtaComponent";

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
        {/* Hero */}
        <section className="relative pt-36 pb-16 md:pt-52 md:pb-20 bg-forest overflow-hidden">
          <div className="texture-grain absolute inset-0" />
          <div className="max-w-7xl mx-auto px-6 relative">
            <span className="text-[11px] uppercase tracking-[0.3em] text-wood font-semibold">
              Galería
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-medium text-paper mt-6 leading-[0.95] text-balance max-w-3xl">
              Mil palabras no alcanzan. <em>Estas fotos tampoco.</em>
            </h1>
            <p className="mt-6 text-lg text-paper/70 max-w-[48ch] leading-relaxed">
              Pero por algo se empieza.
            </p>
          </div>
        </section>

        {/* Fotos por categoría */}
        <ImagesComponent />

        {/* CTA */}
        <CtaComponent
          title="Tu foto puede estar acá el próximo año."
          label="Seguí descubriendo"
        />
      </main>
      <Footer />
    </>
  );
}
