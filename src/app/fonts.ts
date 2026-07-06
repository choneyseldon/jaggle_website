import localFont from "next/font/local";

export const geist = localFont({
  src: "../fonts/Geist-latin.woff2",
  variable: "--font-geist",
  weight: "300 800",
  display: "swap",
});

export const geistMono = localFont({
  src: "../fonts/GeistMono-latin.woff2",
  variable: "--font-geist-mono",
  weight: "400 600",
  display: "swap",
});
