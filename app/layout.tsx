import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/Reveal";
import { themeInitScript } from "@/lib/theme";
import { JsonLd } from "@/components/ui";
import { organizationGraph } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

// next/font downloads these at build time and serves them from our own domain.
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

// Body font is not preloaded, so the headline font (the LCP text) gets the bandwidth first.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sastech Consults | AI Systems and Websites, Lagos",
    template: "%s | Sastech Consults",
  },
  description:
    "Websites that get found, operations tools and AI automation for Nigerian businesses. Earn more, save time and cut cost. Book a free 15-minute call.",
  applicationName: site.name,
  authors: [{ name: site.founder.fullName }],
  creator: site.name,
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#021626",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script may switch data-theme before React hydrates.
    <html lang="en-NG" data-theme="dark" className={`${montserrat.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <JsonLd data={organizationGraph()} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
