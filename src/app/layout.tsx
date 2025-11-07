import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://biosystems-indonesia.com'),
  title: {
    template: '%s | BioSystems Indonesia',
    default: 'BioSystems Indonesia - Analytical Solutions for In Vitro Diagnostics'
  },
  description: "Leading provider of analytical solutions for in vitro diagnostics since 1981. Reliable systems for laboratory technicians worldwide.",
  keywords: ['biosystems', 'in vitro diagnostics', 'analytical solutions', 'laboratory', 'IVD', 'biotechnology'],
  authors: [{ name: 'BioSystems Indonesia' }],
  creator: 'BioSystems Indonesia',
  publisher: 'BioSystems Indonesia',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['id_ID'],
    siteName: 'BioSystems Indonesia',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BioSystems Indonesia - Analytical Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@biosystems_id',
    creator: '@biosystems_id',
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
