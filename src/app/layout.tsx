import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Player from "@/components/Player";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "radiodinle.com - Kesintisiz Radyo Dinle",
  description: "Türkiye'nin en popüler radyo istasyonlarını kesintisiz, ücretsiz ve yüksek kalitede dinleyin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col relative`}>
        <PlayerProvider>
          <div className="flex-1 flex flex-col relative z-10 bg-gradient-to-br from-background via-background to-card/50">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
          <Player />
        </PlayerProvider>
      </body>
    </html>
  );
}
