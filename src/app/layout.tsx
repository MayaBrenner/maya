import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Inter_Tight, Caprasimo, Cormorant_Garamond } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import WireframeGuard from "@/components/layout/WireframeGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const caprasimo = Caprasimo({
  variable: "--font-caprasimo",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mayabrenner.com"),
  title: {
    default: "Maya Brenner — Product Designer",
    template: "%s · Maya Brenner",
  },
  description:
    "Product designer crafting digital experiences. Print precision, screen warmth. Tel Aviv.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Maya Brenner",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${interTight.variable} ${jetbrainsMono.variable} ${caprasimo.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Specimen typefaces used inside case-study UX-decision illustrations. */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,500;0,600;1,400;1,500;1,600&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=gambarino@400&f[]=cabinet-grotesk@800,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[--ink] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[--cream]"
        >
          Skip to content
        </a>
        <WireframeGuard>
          <Header />
        </WireframeGuard>
        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <WireframeGuard>
          <Footer />
        </WireframeGuard>
      </body>
      <GoogleAnalytics gaId="G-P44EVR1VK0" />
    </html>
  );
}
