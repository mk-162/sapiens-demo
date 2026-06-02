import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sapiens | Subscription Configurator",
  description: "Internal demo tool for modeling subscription packages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F4F6FB]">
        {children}
      </body>
    </html>
  );
}
