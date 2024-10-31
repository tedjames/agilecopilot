import { PageHeader } from "@/components/page-header";
import { ToolCard } from "@/components/tool-card";

export default function FeaturePlanning() {
  return (
    <main className="container mx-auto p-6">
      <PageHeader
        title="AgileCopilot"
        description="A collection of tools to help you plan, research and build your app"
        hidePrefix
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ToolCard
          title="Feature & Story Planner"
          description="Break down complex apps into features, user stories, tasks and technical specs"
          href="/tools/feature-planner"
        />
        <ToolCard
          title="Market Research Agent"
          description="AI agents to research and analyze your users, competitors and opportunities"
          href="/tools/market-research"
          disabled
        />
        {/* Add more cards as needed */}
      </div>
    </main>
  );
}
