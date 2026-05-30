import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "WanderAI",
  description: "AI-powered travel planner",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="bg-gray-900 text-gray-50">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
