import { Package } from "lucide-react";

import ThemeToggle from "@/components/common/theme-toggle";
import { Button } from "@/components/shadcn-ui/button";
import { Link } from "@/i18n/routing";

export default function Header() {
  return (
    <header className="border-border/40 bg-background/92 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6 md:px-8">
        {/* 서비스 로고 및 홈 링크 */}
        <Link
          href="/"
          className="group flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <div className="from-primary to-accent-light dark:from-primary dark:to-accent flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br text-white shadow-sm transition-transform group-hover:scale-105">
            <Package className="h-4 w-4" />
          </div>
          <span className="text-foreground text-[17px] font-bold tracking-tight">
            주세요
          </span>
        </Link>

        {/* 중앙 탐색 링크 버튼들 */}
        <div className="hidden items-center gap-3 sm:flex">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Link href="/user1234">Market</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Link href="/user1234/mypage">MyPage</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Link href="/tester">Tester</Link>
          </Button>
        </div>

        {/* ThemeToggle 컴포넌트 */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
