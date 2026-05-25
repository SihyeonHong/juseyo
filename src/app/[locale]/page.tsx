import { getTranslations } from "next-intl/server";



export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <main className="p-8">
      <div className="mb-6 border-b border-border pb-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
      </div>

      <p className="mt-2 text-muted-foreground">{t("serverMessage")}</p>
      
    </main>
  );
}
