import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "opsz", "WONK"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jason Ie",
  description: "Senior CS student focused on distributed systems, ML infrastructure, and quantitative engineering.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
