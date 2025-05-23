import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GeistSans } from 'geist/font/sans'; // Import GeistSans
import { GeistMono } from 'geist/font/mono';   // Import GeistMono

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Know Your Food",
  description: "Onboarding for Know Your Food app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body 
        className={`antialiased min-h-screen flex justify-center items-center bg-gradient-to-br from-[#667eea] to-[#764ba2]`}
      >
        {children}
      </body>
    </html>
  );
}
