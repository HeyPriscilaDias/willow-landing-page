import { cn } from "@/lib/utils";

interface GreyPlaceholderProps {
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "wide";
  children?: React.ReactNode;
}

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

export function GreyPlaceholder({
  className,
  aspectRatio = "video",
  children,
}: GreyPlaceholderProps) {
  return (
    <div
      className={cn(
        "bg-gray-200 rounded-xl flex items-center justify-center",
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {children}
    </div>
  );
}
