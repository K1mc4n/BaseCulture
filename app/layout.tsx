import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import { RootProvider } from "./rootProvider";
import { FarcasterMeta } from "./components/FarcasterMeta";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_PROJECT_NAME || "Base Culture",
  description:
    "A global space to discover, preserve, and share cultures — built on Base",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: process.env.NEXT_PUBLIC_PROJECT_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    siteName: "Base Culture",
    title: "Base Culture - Discover Global Cultures",
    description: "A global space to discover, preserve, and share cultures — built on Base",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/api/og?page=home` || "http://localhost:3000/api/og?page=home",
        width: 1200,
        height: 630,
        alt: "Base Culture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Base Culture",
    description: "Discover and share global cultures",
    creator: "@K1mc4n",
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
        <meta name="theme-color" content="#0052ff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <FarcasterMeta />
      </head>
      <body className={`${inter.variable} ${sourceCodePro.variable}`}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
