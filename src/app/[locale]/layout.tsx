import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { routing } from "@/i18n/routing";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "주세요",
  description: "중고거래 판매 중인 상품 관리 도구",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // locale 유효성 검증
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  // 클라이언트 컴포넌트용 메시지 로드
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
