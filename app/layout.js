import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./(marketing)/components/Navigation";
import Footer from "./(marketing)/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shadow Website",
  description: "Created with Next.js and Bootstrap",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Navigation />

        <main className="flex-grow-1 py-4">
          <div className="container">
            {children}
          </div>
        </main>

        <Footer />
      </body>
    </html>
  );
}
