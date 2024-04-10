import { Inter } from "next/font/google";
import "./globals.css";
import Topbar from './components/Topbar.js'

export const metadata = {
  title: "Catalog App"
};

/**
 * add dropdown and topbar into default layout
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="w-full h-24 bg-red-300"></div>
        <main className="flex flex-row h-[calc(100vh-6rem)] w-full fixed bottom-0">
          {children}
        </main>
      </body>
    </html>
  );
}
