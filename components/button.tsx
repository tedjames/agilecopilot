import { cn } from "@/lib/utils";
import { Button as ShadcnButton } from "@/components/ui/button";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva("rounded-2xl transition-colors", {
  variants: {
    variant: {
      primary:
        "bg-black/90 text-zinc-50 border-[0.5px] border-zinc-800 hover:bg-neutral-950",
      secondary:
        "bg-zinc-900 text-zinc-900 hover:bg-zinc-200 border-zinc-700 border-[0.5px] hover:bg-zinc-900/90",
      destructive:
        "bg-red-600 text-white hover:bg-red-600/80 border-[0.5px] border-red-200",
    },
    size: {
      small: "py-2 h-7 px-4 rounded-full",
      large: "py-6 px-8",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "large",
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label?: string;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, label, icon, ...props }, ref) => {
    return (
      <ShadcnButton
        className={cn(
          buttonVariants({ variant, size, className }),
          "flex items-center justify-center cursor-pointer"
        )}
        ref={ref}
        {...props}
      >
        {icon && (
          <span
            className={cn(
              `${variant === "destructive" ? "text-white" : "text-zinc-500"}`,
              "flex items-center justify-center",
              size === "small" ? "w-3 h-3 [&>*]:!w-3 [&>*]:!h-3" : "w-4 h-4"
            )}
          >
            {icon}
          </span>
        )}
        {label && (
          <span
            className={cn(
              "text-white",
              size === "small" ? "text-xs ml-0" : "ml-2"
            )}
          >
            {label}
          </span>
        )}
      </ShadcnButton>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
