import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://biosystems.id"),
  title: {
    template: "%s | BioSystems Indonesia",
    default: "BioSystems Indonesia - Analytical Solutions for In Vitro Diagnostics",
  },
  description:
    "BioSystems Indonesia provides laboratory instruments and reagents for clinical laboratories, hospitals, and medical facilities.",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "BioSystems Indonesia",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "https://biosystems.id/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BioSystems Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
