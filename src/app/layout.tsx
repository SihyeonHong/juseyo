import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "주세요",
  description: "중고거래 판매 중인 상품 관리 도구",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
