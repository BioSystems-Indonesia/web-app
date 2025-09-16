import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const alliance = localFont({
  src: [
    { path: "../assets/fonts/Alliance/Alliance-Regular.otf", weight: "400", style: "normal" },
    { path: "../assets/fonts/Alliance/Alliance-Bold.otf", weight: "700", style: "normal" },
    { path: "../assets/fonts/Alliance/Alliance-Medium.otf", weight: "500", style: "normal" },
    { path: "../assets/fonts/Alliance/Alliance-Light.otf", weight: "100", style: "normal" },
    { path: "../assets/fonts/Alliance/Alliance-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-alliance",
  display: "swap",       // penting untuk cegah FOUT/FOIT
});

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
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://biosystems-indonesia.com" />
        <link rel="alternate" hrefLang="en" href="https://biosystems-indonesia.com/en" />
        <link rel="alternate" hrefLang="id" href="https://biosystems-indonesia.com/id" />
        <link rel="alternate" hrefLang="x-default" href="https://biosystems-indonesia.com/en" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#EE2737" />
      </head>
      <body className={`${alliance.variable} ${alliance.className}`}>
        {children}
      </body>
    </html>
  );
}
