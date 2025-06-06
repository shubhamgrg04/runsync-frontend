import "./globals.css";
import { ReactNode } from "react";
import { Inter, Gabarito } from "next/font/google";
import LayoutWrapper from "./components/LayoutWrapper";
import { GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });
const gabarito = Gabarito({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-gabarito",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} ${gabarito.variable}`}>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      <body className="bg-white text-gray-900">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
