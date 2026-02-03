import type { Metadata } from "next";
import { Poppins as PoppinsFont } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

const poppins = PoppinsFont({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "SG Trading & Configuration Console",
  description: "Professional trading console for high-frequency scanning, comparison, and configuration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
