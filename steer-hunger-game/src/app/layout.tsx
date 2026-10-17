import type { Metadata, Viewport } from "next";
import { displaySerif, sansFont } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Steer — Private Doctor-Led Metabolic Health Club",
  description:
    "Endocrinology, clinical diagnostics, and DEXA body scans for lasting metabolic weight care. Experience the 60-second 4pm Hunger Game.",
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
  themeColor: "#0D1612"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displaySerif.variable} ${sansFont.variable} h-full`}>
      <body className="h-full flex flex-col bg-[#0D1612] text-[#F7F5F0]">
        {children}
      </body>
    </html>
  );
}
