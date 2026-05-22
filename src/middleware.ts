import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // 다국어 적용 경로에만 매칭
  matcher: ["/", "/(ko|en)/:path*"],
};
