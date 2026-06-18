import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "narrow" | "wide";
};

const sizes = {
  default: "max-w-[81rem]",
  narrow: "max-w-[52rem]",
  wide: "max-w-[92rem]",
};

export function Container({
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-10",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
