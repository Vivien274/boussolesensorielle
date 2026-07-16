import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Boussole Sensorielle Spoolio | Fidgets 3D pour TDAH",
  description: "Trouve instantanément le fidget toy imprimé en 3D idéal pour tes mains selon ton besoin sensoriel immédiat. Conçu pour le TDAH et la concentration.",
  keywords: ["fidget", "fidget toy", "TDAH", "autisme", "neurodiversité", "concentration", "stress", "impression 3D", "Spoolio", "calme"],
  authors: [{ name: "Vivien - Spoolio" }],
  openGraph: {
    title: "La Boussole Sensorielle Spoolio | Fidgets 3D pour TDAH",
    description: "Trouve instantanément le fidget toy imprimé en 3D idéal pour tes mains selon ton besoin sensoriel immédiat. Conçu pour le TDAH et la concentration.",
    url: "https://boussole.spoolio.fr",
    siteName: "Spoolio",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Boussole Sensorielle Spoolio | Fidgets 3D pour TDAH",
    description: "Trouve instantanément le fidget toy imprimé en 3D idéal pour tes mains selon ton besoin sensoriel immédiat. Conçu pour le TDAH et la concentration.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
