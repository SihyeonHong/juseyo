"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/shadcn-ui/button";
import { ButtonGroup } from "@/components/shadcn-ui/button-group";

type ThemeOption = "light" | "dark" | "system";

const THEME_OPTIONS: { key: ThemeOption; icon: typeof Sun }[] = [
  { key: "light", icon: Sun },
  { key: "dark", icon: Moon },
  { key: "system", icon: Monitor },
];

// useEffect + setState 없이 클라이언트 마운트 여부 판별
const noop = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

// 라이트, 다크, 시스템 중 하나를 선택하는 세그먼트 컨트롤
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("displayMode");
  const mounted = useSyncExternalStore(noop, getSnapshot, getServerSnapshot);

  // Hydration 불일치 방지용 skeleton
  if (!mounted) {
    return (
      <ButtonGroup aria-label={t("label")}>
        {THEME_OPTIONS.map(({ key, icon: Icon }) => (
          <Button
            key={key}
            type="button"
            variant="outline"
            size="icon"
            disabled
            aria-label={t(key)}
          >
            <Icon className="size-4" />
          </Button>
        ))}
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroup aria-label={t("label")}>
      {THEME_OPTIONS.map(({ key, icon: Icon }) => {
        const isActive = theme === key;
        return (
          <Button
            key={key}
            type="button"
            variant={isActive ? "default" : "outline"}
            size="icon"
            onClick={() => setTheme(key)}
            aria-label={t(key)}
            aria-pressed={isActive}
          >
            <Icon className="size-4" />
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
