import { getTranslations } from "next-intl/server";

import ThemeToggle from "@/components/common/theme-toggle";
import { Link } from "@/i18n/routing";

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <ThemeToggle />
      </div>
      
      <Link href="/tester">
        Go to Tester Page
      </Link>
      <p className="mt-2 text-muted-foreground">{t("serverMessage")}</p>
      
    </main>
  );
}
