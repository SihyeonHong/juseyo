"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

// 테마 상태를 순환 변경하고 상태를 시각적으로 보여주는 프리미엄 토글 버튼
export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const t = useTranslations("displayMode");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration 불일치 방지용 로딩 프레임
  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        className="px-4 py-2 text-sm font-medium rounded-sm border border-border bg-card text-muted-foreground animate-pulse flex items-center gap-2 min-w-[140px]"
      >
        <span className="w-4 h-4 rounded-full bg-muted block" />
        <span>...</span>
      </button>
    );
  }

  // 테마 순환 처리: system -> light -> dark -> system
  const handleCycleTheme = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  // 아이콘 및 텍스트 맵핑 설정
  const getThemeDetails = () => {
    if (theme === "system") {
      return {
        icon: <Laptop className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />,
        label: `${t("system")} (${resolvedTheme === "dark" ? t("dark") : t("light")})`,
      };
    }
    if (theme === "dark") {
      return {
        icon: <Moon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />,
        label: t("dark"),
      };
    }
    return {
      icon: <Sun className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />,
      label: t("light"),
    };
  };

  const { icon, label } = getThemeDetails();

  return (
    <button
      type="button"
      onClick={handleCycleTheme}
      className="group px-4 py-2 text-sm font-medium rounded-sm border border-border bg-card text-foreground transition-all duration-300 hover:bg-secondary cursor-pointer flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring select-none min-w-[140px]"
      aria-label="Toggle Display Theme"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
