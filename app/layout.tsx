import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import SnapPixel from "@/components/SnapPixel";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lucid — The Everyday Glass Jar",
  description:
    "A 16oz glass drinking jar with a bamboo lid and a reusable glass straw. No plastic between you and what you drink.",
  metadataBase: new URL("https://lucid-glass.vercel.app"),
  openGraph: {
    title: "Lucid — The Everyday Glass Jar",
    description:
      "A 16oz glass drinking jar with a bamboo lid and a reusable glass straw.",
    images: ["/bottle-mint.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="font-body antialiased">
        <MetaPixel />
        <SnapPixel />
        {children}
      </body>
    </html>
  );
}
