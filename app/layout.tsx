import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Echoes - Write to Your Future Self",
  description: "A calm, minimal way to send letters to your future self",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

