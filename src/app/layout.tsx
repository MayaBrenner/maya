import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Caveat } from "next/font/google";
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

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const caveat = Caveat({
  variable: "--font-handwrite",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mayabrenner.com"),
  title: {
    default: "Maya Brenner — Product Designer",
    template: "%s | Maya Brenner",
  },
  description:
    "Product designer crafting digital experiences with the precision of print. Based in Tel Aviv.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Maya Brenner",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[--color-bg] text-[--color-ink]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[--color-ink] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[--color-bg]"
        >
          Skip to content
        </a>
        <WireframeGuard><Header /></WireframeGuard>
        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <WireframeGuard><Footer /></WireframeGuard>
      </body>
    </html>
  );
}
