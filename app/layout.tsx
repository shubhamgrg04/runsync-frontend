import "./globals.css";
import { ReactNode } from "react";
import Header from "@/components/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Header />
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
