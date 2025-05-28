import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav";
import ThemeProviderWrapper from "@/components/theme-wrapper";
import ProviderWrapper from "@/components/provider-wrapper";
import Footer from "@/components/footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rebirth Island",
  description: `Welcome to Rebirth Island! We're dedicated
    to creating clothing that inspires confidence and self-expression. Our
    journey started with a simple idea: to craft high-quality, stylish apparel
    that makes you feel amazing.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ProviderWrapper>
          <ThemeProviderWrapper>
            <NavBar />
            <div style={{ marginTop: "100px", position: "relative" }}>
              {children}
            </div>
            <Footer />
          </ThemeProviderWrapper>
        </ProviderWrapper>
      </body>
    </html>
  );
}
