import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "歯科カルテシステム",
  description: "矯正歯科患者の診療履歴管理システム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
