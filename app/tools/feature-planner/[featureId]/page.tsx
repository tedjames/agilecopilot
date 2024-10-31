import { PageHeader } from "@/components/page-header";

export default function Features({
  params,
}: {
  params: { featureId: string };
}) {
  return (
    <main className="container mx-auto p-6">
      <PageHeader
        title="Features"
        description="Create or select an existing app to get started"
        prefix="ezMAF"
      />
      <div className="prose dark:prose-invert max-w-none">
        <p>View and manage your features here.</p>
        <p>Feature ID: {params.featureId}</p>
      </div>
    </main>
  );
}
