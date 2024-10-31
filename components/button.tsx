import { cn } from "@/lib/utils";
import { Button as ShadcnButton } from "@/components/ui/button";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva("rounded-2xl py-6 px-8 transition-colors", {
  variants: {
    variant: {
      primary:
        "bg-black/90 text-zinc-50 border-[0.5px] border-zinc-800 hover:bg-neutral-950",
      secondary:
        "bg-zinc-900 text-zinc-900 hover:bg-zinc-200 border-zinc-700 border-[0.5px] hover:bg-zinc-900/90",
      destructive:
        "bg-red-600 text-white hover:bg-red-600/80 border-[0.5px] border-red-200",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label?: string;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, label, icon, ...props }, ref) => {
    return (
      <ShadcnButton
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {icon && (
          <span
            className={`w-4 h-4 ${
              variant === "destructive" ? "text-white" : "text-zinc-500"
            }`}
          >
            {icon}
          </span>
        )}
        {label && <span className="text-white ml-2">{label}</span>}
      </ShadcnButton>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
