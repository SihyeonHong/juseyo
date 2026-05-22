import { getTranslations } from "next-intl/server";

import ClientTestComponent from "@/components/ClientTestComponent";
import ThemeToggle from "@/components/theme-toggle";

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <ThemeToggle />
      </div>
      <p className="mt-2 text-muted-foreground">{t("serverMessage")}</p>
      
      <ClientTestComponent />
    </main>
  );
}
