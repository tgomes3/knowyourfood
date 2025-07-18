import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // Remove this line
import "./globals.css";
import { GeistSans } from 'geist/font/sans'; // Import GeistSans
import { GeistMono } from 'geist/font/mono';   // Import GeistMono

// const inter = Inter({ subsets: ["latin"] }); // Remove this line

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
        className={`antialiased min-h-screen flex justify-center items-center bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
