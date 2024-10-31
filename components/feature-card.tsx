import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  featureCount: number;
  storyCount: number;
}

export function FeatureCard({
  id,
  title,
  description,
  featureCount,
  storyCount,
}: FeatureCardProps) {
  return (
    <Link href={`/tools/feature-planner/${id}`} className="block">
      <Card className="group hover:opacity-90 border-2 border-sky-600/30 hover:border-sky-600/80 bg-black/50 rounded-2xl shadow-md transition-all">
        <CardHeader className="space-y-2">
          <div className="flex flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <CardDescription className="opacity-70">
                {description}
              </CardDescription>
            </div>
            <ExternalLinkIcon className="w-6 h-6 text-zinc-600 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
          <div className="flex items-start flex-col gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{`${featureCount} Features`}</Badge>
              <Badge variant="outline">{`${storyCount} Stories`}</Badge>
            </div>

            <span className={`text-xs font-medium text-sky-400`}>
              Last updated 2 days ago
            </span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
