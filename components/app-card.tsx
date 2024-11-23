import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface AppCardProps {
  id: string;
  title: string;
  description: string;
  featureCount: number;
  storyCount: number;
  status: "Refinement Needed" | "Ready for Review" | "Ready for Development";
  disabled?: boolean;
}

export function AppCard({
  id,
  title,
  description,
  featureCount,
  storyCount,
  status,
  disabled = false,
}: AppCardProps) {
  const statusStyles = {
    "Refinement Needed": {
      border: "border-purple-600/30 hover:border-purple-600/80",
      text: "text-purple-400",
    },
    "Ready for Review": {
      border: "border-sky-600/30 hover:border-sky-600/80",
      text: "text-sky-400",
    },
    "Ready for Development": {
      border: "border-green-600/30 hover:border-green-600/80",
      text: "text-green-400",
    },
  }[status] ?? {
    border: "border-zinc-600/30 hover:border-zinc-600/80",
    text: "text-zinc-400",
  };

  return (
    <Link
      href={`/tools/feature-planner/${id}`}
      className={`block ${disabled ? "pointer-events-none opacity-50" : ""}`}
    >
      <Card
        className={`group space-y-2 justify-between flex py-6 hover:opacity-90 border-2 ${statusStyles.border} bg-black/50 rounded-2xl shadow-md transition-all h-52 px-7`}
      >
        <div className="flex flex-col justify-between gap-4 w-96">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <CardDescription className="opacity-70 h-10">
              {description.length > 100
                ? `${description.slice(0, 100)}...`
                : description}
            </CardDescription>
          </div>
          <div className="flex items-start flex-col gap-2">
            <div className="flex items-center gap-2">
              <Badge className="text-zinc-300 font-light rounded-full bg-zinc-900 tracking-wide hover:bg-zinc-900">{`${featureCount} Features`}</Badge>
              <Badge className="text-zinc-300 font-light rounded-full bg-zinc-900 tracking-wide hover:bg-zinc-900">{`${storyCount} Stories`}</Badge>
            </div>

            <p
              className={`opacity-90 group-hover:opacity-100 text-xs font-mono mt-2 uppercase tracking-wider ${statusStyles.text} transition-opacity`}
            >
              {status}
            </p>
          </div>
        </div>

        <div className="w-20 h-full flex items-end pb-0.5 justify-end">
          <ExternalLinkIcon className="w-6 h-6 text-zinc-600 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </Card>
    </Link>
  );
}
