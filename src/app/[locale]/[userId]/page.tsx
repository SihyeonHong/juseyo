interface PageProps {
  params: Promise<{ userId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { userId } = await params;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{userId}</h1>
    </main>
  );
}
