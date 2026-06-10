import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { habitaciones } from "@/lib/alojamiento";
import { DetailsHero } from "@/components/alojamiento/DetailsHero";
import { DetailsGallery } from "@/components/alojamiento/DetailsGallery";
import { DetailsServices } from "@/components/alojamiento/DetailsServices";
import { InfoSection } from "@/components/alojamiento/InfoSection";
import { DetailsOptions } from "@/components/alojamiento/DetailsOptions";

export function generateStaticParams() {
  return habitaciones.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const h = habitaciones.find((x) => x.slug === slug);
  if (!h) return {};
  return {
    title: `${h.title} — Hostel Huellas Puelo`,
    description: h.descLong,
  };
}

export default async function AlojamientoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const h = habitaciones.find((x) => x.slug === slug);
  if (!h) notFound();

  const otras = habitaciones.filter((x) => x.slug !== slug);

  return (
    <>
      <Header />
      <main>
        <DetailsHero h={h} />
        <DetailsGallery h={h} />
        <DetailsServices h={h} />
        <InfoSection />
        <DetailsOptions otras={otras} />
      </main>
      <Footer />
    </>
  );
}
