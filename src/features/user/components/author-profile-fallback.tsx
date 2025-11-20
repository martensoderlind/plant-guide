import { Link, Undo2 } from "lucide-react";

export default function AuthorProfileFallback() {
  return (
    <div className="max-w-4xl mx-auto py-8 flex flex-col justify-items-center">
      <h1 className="text-xl md:text-2xl font-bold mb-4 leading-tight mx-auto">
        No article with that name exist.
      </h1>
      <Link href={"/"} className="mx-auto flex flex-row">
        <span className="text-xl md:text-xl font-bold mb-4 leading-tight mr-2">
          Return to home page
        </span>
        <Undo2 />
      </Link>
    </div>
  );
}
