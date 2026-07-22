import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PublicLayoutWrapper from "../components/layout/PublicLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Trokk | Fairer Rides. Safer Journeys.",
  description:
    "The zero-commission ride-hailing platform built around community trust, safety, and transparent pricing.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased light`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900" suppressHydrationWarning>
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}
