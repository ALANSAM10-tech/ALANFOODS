import type { Metadata } from "next";
import { Playfair_Display, Work_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ALAN FOODS | Purity in Every Bite",
  description: "Premium dry fruits, crunchy nuts, and authentic spices sourced for purity and flavor. Welcome to ALAN FOODS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${workSans.variable}`}>
      <body className="bg-background text-on-surface font-body-md min-h-screen">
        {children}
      </body>
    </html>
  );
}

