"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navigation from "./(marketing)/components/Navigation";
import Footer from "./(marketing)/components/Footer";

/* ================================
   GOOGLE FONTS
   ================================ */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* ================================
   ROOT LAYOUT
   ================================ */
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased d-flex flex-column min-vh-100`}
      >
        {/* ✅ Navigation (header) */}
        <Navigation />

        {/* ✅ Main Content */}
        <main className="flex-grow-1 py-4">
          <div className="container">{children}</div>
        </main>

        {/* ✅ Footer */}
        <Footer />

        {/* ✅ Extra global styles */}
        <style jsx global>{`
          body {
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          main {
            min-height: 70vh;
          }

          footer {
            margin-top: auto;
          }
        `}</style>
      </body>
    </html>
  );
}
