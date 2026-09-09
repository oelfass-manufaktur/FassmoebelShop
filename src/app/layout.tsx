import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/components/cart/cart-provider";
import { CartSheet } from "@/components/cart/cart-sheet";
import { MotionRoot } from "@/components/motion/motion-root";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fassmoebel-shop.vercel.app"),
  title: {
    default: "Fasswerk — Möbel aus recycelten Ölfässern",
    template: "%s | Fasswerk Manufaktur",
  },
  description:
    "Minibars, Stehtische, Sessel und Deko aus echten 200-Liter-Stahlfässern. Handgefertigte Unikate aus Dortmund.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Fasswerk Manufaktur",
    title: "Fasswerk — Möbel aus recycelten Ölfässern",
    description:
      "Minibars, Stehtische, Sessel und Deko aus echten 200-Liter-Stahlfässern. Handgefertigte Unikate aus Dortmund.",
    images: [
      {
        url: "/images/hero-barrel-lounge.webp",
        width: 1536,
        height: 1024,
        alt: "Fasswerk Möbel aus recycelten Stahlfässern",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // `js-ready` wird schon serverseitig gesetzt (sonst Hydration-Mismatch).
    // Es blendet `[data-reveal]` vor dem ersten Paint aus, damit die GSAP-Reveals
    // nicht flackern; die CSS-Regel greift nur ohne `prefers-reduced-motion`.
    // Ohne JavaScript hebt das <noscript>-Stylesheet das Verstecken wieder auf.
    <html
      lang="de"
      className={`dark js-ready ${inter.variable} ${cormorant.variable}`}
    >
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh antialiased">
        <CartProvider>
          <MotionRoot />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <CartSheet />
        </CartProvider>
      </body>
    </html>
  );
}
