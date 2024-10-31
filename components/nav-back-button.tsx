"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter, usePathname } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <button onClick={() => router.back()}>
      <ArrowLeftIcon className="w-6 h-6 text-zinc-500 hover:text-zinc-400 transition-colors" />
    </button>
  );
}
