import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/footer";
import NavBarMain from './components/header';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Ailestra Education",
    template: "%s | Ailestra Education"
  },
  description: "Ailestra Education was envisioned by Sir Abdul Samad Jamal, the founder of ASJ-ERDC, which oversees several educational initiatives, including Habibian’s Academy, Blooms’ Schooling System, and ASJ-Cradle of Wisdom. As technological advancements continue to reshape the educational landscape, the demand for innovative skills and modern teaching methods has never been greater. Recognizing this need, Ailestra Education emerges as a pioneering venture that integrates cutting-edge teaching approaches and offers advanced courses designed to empower the younger generation by unlocking their true potential and master the skills necessary to thrive in a rapidly evolving world.",
  authors: [
    {
      url: 'https://abdul-hadi-millwala.vercel.app',
      name: 'Abdul Hadi Millwala',
    },
  ],
  icons: "favicon.ico",
  keywords: ["ailestra", "ailestra-education", "school", "eduction", "coaching"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased pt-16`}>
        <NavBarMain />
        {children}
        <Footer />
      </body>
    </html>
  );
}
