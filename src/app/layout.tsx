import type { Metadata } from "next";
import "./globals.css";
import { AgroProvider } from "@/context/AgroContext";

export const metadata: Metadata = {
  title: "AgroHarvest OS // Smart Precision Agriculture (Titan #31)",
  description: "Sistem otomasi hidroponik presisi dan telemetri panen organik berbasis Organic Blob Shapes & Pastel Soft Aesthetic.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#FDFBF7] text-[#2D4B32] antialiased">
        <AgroProvider>{children}</AgroProvider>
      </body>
    </html>
  );
}
