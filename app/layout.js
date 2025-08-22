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
   METADATA (SEO & Social)
   ================================ */
export const metadata = {
  title: "Shadow Website",
  description: "Created with Next.js and Bootstrap",
  keywords: ["Next.js", "Bootstrap", "Shadow Website"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Shadow Website",
    description: "Created with Next.js and Bootstrap",
    url: "https://yourdomain.com",
    siteName: "Shadow Website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shadow Website Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadow Website",
    description: "Created with Next.js and Bootstrap",
    images: ["/images/og-image.png"],
  },
};

/* ================================
   ROOT LAYOUT
   ================================ */
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased d-flex flex-column min-vh-100`}
      >
        {/* ✅ Navigation */}
        <Navigation />

        {/* ✅ Main Content */}
        <main className="flex-grow-1 py-4">
          <div className="container">{children}</div>
        </main>

        {/* ✅ Footer */}
        <Footer />
      </body>
    </html>
  );
}
