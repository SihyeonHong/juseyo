import { getTranslations } from "next-intl/server";

import ClientTestComponent from "@/components/ClientTestComponent";

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-gray-600">{t("serverMessage")}</p>
      
      <ClientTestComponent />
    </main>
  );
}
