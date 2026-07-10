import Image from "next/image";

interface SeparatorProps {
  variant?: "default" | "light" | "dark";
  className?: string;
  icon?: string;
  iconSize?: number;
}

export default function Separator({
  variant = "default",
  className = "",
  icon = "/svg/separator.svg",
  iconSize = 40,
}: SeparatorProps) {
  const variantStyles = {
    default: "border-gray-300",
    light: "border-white/20",
    dark: "border-gray-700",
  };

  return (
    <div
      className={`relative flex items-center justify-center w-full ${className}`}
    >
      <div className={`flex-1 border-t ${variantStyles[variant]}`} />

      {icon && (
        <div className="shrink-0 mx-4">
          <Image
            src={icon}
            alt="Separator"
            width={iconSize}
            height={iconSize}
            className="opacity-70"
          />
        </div>
      )}

      <div className={`flex-1 border-t ${variantStyles[variant]}`} />
    </div>
  );
}
