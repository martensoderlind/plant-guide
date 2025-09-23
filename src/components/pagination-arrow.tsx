import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
};

export default function PaginationArrow({
  href,
  direction,
  isDisabled,
}: Props) {
  const className = `flex h-10 w-10 items-center justify-center rounded-md border,
    ${direction === "left" ? "mr-2 md:mr-4" : "ml-2 md:ml-4"}
    ${isDisabled ? "pointer-events-none text-gray-300" : "hover:bg-gray-100"}`;

  const icon = direction === "left" ? <ChevronLeft /> : <ChevronRight />;

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
