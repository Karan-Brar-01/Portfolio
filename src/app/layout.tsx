import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karanpreet Singh — Data Scientist & Engineer",
  description:
    "Portfolio of Karanpreet Singh — Data Science student at NIT Jalandhar (CGPA 9.13). Building AI systems, RAG pipelines, scalable ML infrastructure, and DSA tools.",
  keywords: [
    "Karanpreet Singh",
    "Data Scientist",
    "Machine Learning",
    "NIT Jalandhar",
    "RAG Pipeline",
    "Portfolio",
  ],
  openGraph: {
    title: "Karanpreet Singh — Data Scientist & Engineer",
    description:
      "Building intelligent systems at the intersection of AI, data, and software engineering.",
    type: "website",
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
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="relative">
        {/*
          Disable browser scroll-restoration before React hydrates so the
          page always starts at y=0 on every load and refresh.
        */}
        <Script
          id="scroll-restore"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `if ('scrollRestoration' in history) history.scrollRestoration = 'manual';`,
          }}
        />
        {/* Navbar — fixed, always on top, outside scroll context */}
        <Navbar />
        {/* LenisProvider wraps everything — RAF loop runs here */}
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
