import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "[YOUR NAME] — Full-Stack Developer",
  description:
    "Full-stack developer building functional digital experiences, websites, and software products.",
  keywords: [
    "Full-Stack Developer",
    "Web Builder",
    "Portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
  ],
  authors: [{ name: "[YOUR NAME]" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "[YOUR NAME] — Full-Stack Developer",
    description:
      "Full-stack developer building functional digital experiences, websites, and software products.",
    type: "website",
    locale: "en_US",
    siteName: "[YOUR NAME] Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "[YOUR NAME] — Full-Stack Developer",
    description:
      "Full-stack developer building functional digital experiences, websites, and software products.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-accent selection:text-background overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
