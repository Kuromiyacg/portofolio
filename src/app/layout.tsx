import type { Metadata, Viewport } from "next";
import {
  Instrument_Serif,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import portfolio from "@/data/portfolio";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
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

export const viewport: Viewport = {
  themeColor: "#F5F1EA",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `${portfolio.personal.name} — ${portfolio.personal.role}`,
  description: portfolio.personal.shortBio,
  keywords: [
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "React",
    "LifeTrack AI",
    "Web Software",
    portfolio.personal.name,
  ],
  authors: [{ name: portfolio.personal.name }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${portfolio.personal.name} — ${portfolio.personal.role}`,
    description: portfolio.personal.shortBio,
    type: "website",
    locale: "en_US",
    siteName: portfolio.personal.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolio.personal.name} — ${portfolio.personal.role}`,
    description: portfolio.personal.shortBio,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-[100dvh] bg-background text-foreground font-sans antialiased overflow-x-clip">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-full focus:bg-foreground focus:text-surface-1 focus:text-sm focus:font-medium focus:shadow-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
