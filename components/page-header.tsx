"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  description?: string;
  prefix?: string;
  hidePrefix?: boolean;
}

export function PageHeader({
  title,
  description,
  prefix,
  hidePrefix = false,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-6 gap-2 flex flex-col">
      <div className="flex items-center gap-2 flex-wrap">
        {!hidePrefix && (
          <h1 className="text-4xl font-bold text-zinc-800">
            {prefix || "AgileCopilot"}
          </h1>
        )}
        {!hidePrefix && (
          <h1 className="text-4xl font-light text-zinc-900 mx-2">{"/"}</h1>
        )}
        <h1
          className={`text-4xl font-bold  ${
            hidePrefix ? "text-zinc-700" : "text-zinc-400"
          }`}
        >
          {title}
        </h1>
      </div>

      {description && (
        <h3 className="text-zinc-400/90 text-sm ml-0.5">{description}</h3>
      )}
    </div>
  );
}
