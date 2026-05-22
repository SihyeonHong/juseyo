"use client";

import { useTranslations } from "next-intl";

export default function ClientTestComponent() {
  const t = useTranslations("ClientTest");

  return (
    <div className="mt-4 p-4 border rounded">
      <h2>Client Component</h2>
      <p>{t("clientMessage")}</p>
    </div>
  );
}
