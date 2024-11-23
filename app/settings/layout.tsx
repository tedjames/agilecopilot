import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed right-4 top-4 z-50">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      {children}
    </div>
  );
} 