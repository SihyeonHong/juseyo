import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en"], // 지원 locale 목록
  defaultLocale: "ko",
  localeDetection: false, // 브라우저 언어 감지 비활성화
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
