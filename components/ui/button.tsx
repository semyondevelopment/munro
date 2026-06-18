import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-sans font-medium tracking-tight transition-[transform,background-color,box-shadow,border-color,color] duration-300 ease-out-expo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-navy text-cream shadow-soft hover:bg-navy-700 hover:shadow-lift hover:-translate-y-0.5",
        brand:
          "bg-brand-green-deep text-cream shadow-soft hover:bg-[#447d26] hover:shadow-lift hover:-translate-y-0.5",
        accent:
          "bg-terracotta text-cream shadow-soft hover:bg-terracotta-600 hover:shadow-lift hover:-translate-y-0.5",
        secondary:
          "border border-navy/15 bg-transparent text-navy hover:border-navy/35 hover:bg-navy/[0.03]",
        onDark:
          "bg-cream text-navy shadow-soft hover:bg-sand hover:-translate-y-0.5 hover:shadow-lift",
        onDarkOutline:
          "border border-cream/25 bg-transparent text-cream hover:bg-cream/10 hover:border-cream/45",
        ghost: "text-navy hover:bg-navy/[0.05]",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-[0.95rem]",
        lg: "h-14 px-9 text-[1.02rem]",
        xl: "h-16 px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
