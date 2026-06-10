import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://hostel-huellas.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hostel Huellas Puelo — Lago Puelo, Patagonia",
    template: "%s — Hostel Huellas Puelo",
  },
  description:
    "Hostel con alma de aventura en Lago Puelo, Patagonia. Guía de montaña, fogones, comunidad de viajeros y el Parque Nacional en la puerta.",
  keywords: [
    "hostel Lago Puelo",
    "hospedaje Patagonia",
    "trekking Lago Puelo",
    "Parque Nacional Lago Puelo",
    "hostel mochilero Patagonia",
    "guía de montaña Lago Puelo",
    "El Bolsón alojamiento",
    "Hostel Huellas",
  ],
  authors: [{ name: "Hostel Huellas Puelo" }],
  creator: "Hostel Huellas Puelo",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Hostel Huellas Puelo",
    title: "Hostel Huellas Puelo — Lago Puelo, Patagonia",
    description:
      "Hostel con alma de aventura en Lago Puelo, Patagonia. Guía de montaña, fogones, comunidad de viajeros y el Parque Nacional en la puerta.",
    images: [
      {
        url: "/hero-lake.jpg",
        width: 1200,
        height: 630,
        alt: "Lago Puelo, Patagonia — Hostel Huellas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hostel Huellas Puelo — Lago Puelo, Patagonia",
    description:
      "Hostel con alma de aventura en Lago Puelo, Patagonia. Guía de montaña, fogones, comunidad de viajeros y el Parque Nacional en la puerta.",
    images: ["/hero-lake.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
