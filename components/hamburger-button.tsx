import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export function HamburgerButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-10 h-10"
      aria-label="Toggle sidebar"
    >
      <HamburgerMenuIcon className="h-4 w-4" />
    </Button>
  );
}
