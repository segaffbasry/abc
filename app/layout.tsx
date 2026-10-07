import type { Metadata, Viewport } from "next";
import { posthogSnippet } from "@/lib/posthog";
import "./globals.css";

// The live homepage's own title. Private demo: never indexed, never followed, no sitemap.
export const metadata: Metadata = {
  title: "ABC London Property Group",
  description: "We work hard for our clients, HNW Investors, VC'S & Developers. Your Vision Delivered By ABC London Property Group.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = { themeColor: "#161616" };

/* Runs before first paint. Unless reduced motion is requested it adds `js` (so reveal targets can start hidden
   without a flash) and `is-loading` for the preloader, which plays on every load. Without JavaScript nothing is
   hidden and the preloader never shows (see the <noscript> style). */
const boot = "(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='done';d.classList.add('logo-landed');return}d.classList.add('js','is-loading')})()";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
        <link rel="preload" href="/fonts/abril-fatface-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/open-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/media/hero.webp" as="image" media="(min-width: 768px)" />
        <link rel="preload" href="/media/hero-m.webp" as="image" media="(max-width: 767px)" />
        <noscript><style>{".preloader{display:none!important}.header-right{opacity:1!important}.header-logo{visibility:visible!important}"}</style></noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
