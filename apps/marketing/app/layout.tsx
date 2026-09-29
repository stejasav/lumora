import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";

import { chakraPetch } from "@/lib/fonts";
import GrowthBanner from "@/components/sections/GrowthBanner";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Lumora",
  description: "AI Revenue Intelligence Platform",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html
      lang="en"
      className={chakraPetch.variable}
      suppressHydrationWarning
    >
      <body cz-shortcut-listen="true">
        <SmoothScroll>
          <Navbar />
          {children}
          <Container >
            <GrowthBanner />
          </Container>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}