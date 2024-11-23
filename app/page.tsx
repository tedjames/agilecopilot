import { PageHeader } from "@/components/page-header";
import { ToolCard } from "@/components/tool-card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function FeaturePlanning() {
  return (
    <div className="flex min-h-screen ">
      <div className="fixed left-0 top-0 h-screen w-14 border-r bg-background p-2 flex flex-col">
        <div className="mt-auto">
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <main className="pl-14 w-full">
        <div className="container p-6">
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
          </div>
        </div>
      </main>
    </div>
  );
}
