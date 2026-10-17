import { Lora, Plus_Jakarta_Sans } from "next/font/google";

export const serifFont = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"]
});

export const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});
