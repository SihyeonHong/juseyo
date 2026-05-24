import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const handleRequest = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  return handleRequest(request);
}

export const config = {
  // api, _next, 정적 파일 등을 제외한 모든 경로에 proxy 적용
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
