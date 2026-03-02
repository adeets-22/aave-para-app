import type { Metadata } from "next";
import "./globals.css";
import ParaProvider from "@/components/para/ParaProvider";

export const metadata: Metadata = {
  title: "Aave Para — DeFi Lending",
  description: "Decentralized lending and borrowing powered by Para",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ParaProvider>{children}</ParaProvider>
      </body>
    </html>
  );
}
