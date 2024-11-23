import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface ToolCardProps {
  href: string;
  title: string;
  description: string;
  disabled?: boolean;
}

export function ToolCard({
  href,
  title,
  description,
  disabled = false,
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className={`block ${
        disabled ? "pointer-events-none opacity-50" : "cursor-pointer"
      }`}
    >
      <Card className="group hover:opacity-90 border-2 border-sky-600/30 hover:border-sky-600/80 bg-black/50 rounded-2xl shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <CardDescription className="opacity-70">
              {description}
            </CardDescription>
          </div>
          <ChevronRightIcon className="w-6 h-6 text-zinc-600 text-muted-foreground group-hover:text-foreground transition-colors" />
        </CardHeader>
      </Card>
    </Link>
  );
}
