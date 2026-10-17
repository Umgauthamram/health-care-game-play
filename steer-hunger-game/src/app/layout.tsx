import type { Metadata, Viewport } from "next";
import { serifFont, sansFont } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "The 4pm Hunger Game | Steer Health",
  description:
    "Why does hunger hit at 4pm even after a full Indian thali? Play the 60-second metabolic health quiz created with Steer doctors.",
  keywords: [
    "GLP-1 India",
    "metabolic health",
    "4pm hunger",
    "DEXA scan",
    "Steer health club",
    "doctor-led weight management"
  ],
  authors: [{ name: "Steer Health Club" }],
  openGraph: {
    title: "The 4pm Hunger Game | Steer",
    description: "60-second doctor-led metabolic health quiz for Indian adults.",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#153A2D"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable} h-full`}>
      <body className="h-full flex flex-col bg-[#FBF8F3] text-[#1E2220] selection:bg-[#E27D30]/20 selection:text-[#153A2D]">
        {children}
      </body>
    </html>
  );
}
