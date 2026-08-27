import Image from "next/image";
import { twMerge } from "tailwind-merge";

import { getInitialsFromName, inferInitialsFromEmail } from "~/utils/helpers";

const sizeMap = {
  xs: 20,
  sm: 24,
  md: 36,
  lg: 48,
} as const;

const Avatar = ({
  size = "md",
  name,
  email,
  icon,
  imageUrl,
  isLoading,
  apartment,
}: {
  size?: "xs" | "sm" | "md" | "lg";
  name: string;
  email: string;
  imageUrl?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  apartment?: number | null;
}) => {
  const initials = name?.trim()
    ? getInitialsFromName(name)
    : inferInitialsFromEmail(email);

  return (
    <span className="relative inline-flex">
      {imageUrl ? (
        <Image
          src={imageUrl}
          className="rounded-full bg-gray-50"
          width={sizeMap[size]}
          height={sizeMap[size]}
          alt=""
        />
      ) : (
        <span
          className={twMerge(
            "inline-flex h-9 w-9 items-center justify-center rounded-full bg-light-1000 dark:bg-dark-400",
            isLoading && "animate-pulse bg-light-200 dark:bg-dark-200",
            size === "xs" && "h-5 w-5",
            size === "sm" && "h-6 w-6",
            size === "lg" && "h-12 w-12",
          )}
        >
          {icon ? (
            <span className="text-[12px] text-white">{icon}</span>
          ) : (
            <span
              className={twMerge(
                "text-sm font-medium leading-none text-white",
                size === "xs" && "text-[8px]",
                size === "sm" && "text-[10px]",
                size === "lg" && "text-md",
              )}
            >
              {initials}
            </span>
          )}
        </span>
      )}
      {apartment != null && (
        <span
          className={twMerge(
            "absolute -bottom-0.5 -right-0.5 z-10 rounded-full bg-indigo-600 px-[3px] text-[7px] font-semibold leading-[10px] text-white ring-1 ring-white dark:ring-dark-100",
            size === "md" && "text-[8px] leading-[12px]",
            size === "lg" && "text-[10px] leading-[14px]",
          )}
        >
          {apartment}
        </span>
      )}
    </span>
  );
};

export default Avatar;
