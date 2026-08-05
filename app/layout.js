"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";

import Navigation from "./(marketing)/components/Navigation";
import Footer from "./(marketing)/components/Footer";

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

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // The dashboard ("/") is a full-bleed layout and should NOT be
  // constrained by the Bootstrap .container (max-width + padding).
  // Every other route keeps the normal centered container.
  const isFullBleed = pathname === "/";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased d-flex flex-column min-vh-100`}
      >
        <Navigation />

        <main className={isFullBleed ? "flex-grow-1" : "flex-grow-1 py-4"}>
          {isFullBleed ? children : <div className="container">{children}</div>}
        </main>

        <Footer />

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