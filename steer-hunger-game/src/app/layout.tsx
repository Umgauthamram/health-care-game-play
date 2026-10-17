import type { Metadata, Viewport } from "next";
import { interFont } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Steer — India's Doctor-Led Metabolic Health Club",
  description:
    "Science, blood diagnostics, and DEXA scans for lasting metabolic weight care. Play the 60-second 4pm Hunger Game.",
  keywords: [
    "GLP-1 India",
    "metabolic health",
    "4pm hunger",
    "DEXA scan",
    "Steer health club",
    "doctor-led weight management"
  ]
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f5f1e4"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interFont.variable} h-full`}>
      <body className="h-full flex flex-col bg-[#f5f1e4] text-[#2c2e2a]">
        {children}
      </body>
    </html>
  );
}
