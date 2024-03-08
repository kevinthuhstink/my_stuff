import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "SSMIF S24 Coding Challenge"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
