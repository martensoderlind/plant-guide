import Link from "next/link";

type Props = {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
};

export default function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: Props) {
  const className = `flex h-10 w-10 items-center justify-center text-sm border",
    ${position === "first" || (position === "single" && "rounded-l-md")}
        ${
          isActive &&
          "z-10 bg-emerald-600 text-white border-emerald-600 rounded-md"
        }
        ${!isActive && position !== "middle" && "hover:bg-gray-100"}
        ${
          position === "single" ||
          (position === "last" &&
            "hover:bg-gray-100 hover:text-gray-900 rounded-md")
        }
        ${position === "middle" && "text-gray-300"}`;

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}
