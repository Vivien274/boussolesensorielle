import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Notre Démarche & Histoire TDAH | Spoolio",
  description: "Découvre l'histoire de Vivien, créateur TDAH de Spoolio, et notre démarche artisanale pour concevoir les fidgets sensoriels 3D idéaux pour la concentration.",
  openGraph: {
    title: "Notre Démarche & Histoire TDAH | Spoolio",
    description: "Découvre l'histoire de Vivien, créateur TDAH de Spoolio, et notre démarche artisanale pour concevoir les fidgets sensoriels 3D idéaux pour la concentration.",
    url: "https://boussole.spoolio.fr/a-propos",
    type: "website",
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
