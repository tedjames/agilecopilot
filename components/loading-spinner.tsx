import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
}

export function LoadingSpinner({ className, size = 24 }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Loader
        className={cn("animate-spin text-white", className)}
        size={size}
      />
    </div>
  );
}
