import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <main className="p-8">
      <div className="border-border mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
      </div>

      <p className="text-muted-foreground mt-2">{t("serverMessage")}</p>
    </main>
  );
}
