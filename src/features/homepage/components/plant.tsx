import Link from "next/link";
import Image from "next/image";

type Props = {
  id: number;
  image: string | undefined;
  name: string;
  color: string;
  status: string;
};
export default function Plant({ id, image, name, color, status }: Props) {
  return (
    <div className="bg-gray-50 rounded-xl px-4 pt-4 pb-14 hover:shadow-md transition-all duration-300">
      {image && (
        <Image
          className="rounded-lg object-contain w-full h-full"
          width={500}
          height={500}
          src={image}
          alt={name}
        />
        // <img
        //   src={image}
        //   alt=""
        //   className="rounded-lg object-contain w-full h-full"
        // />
      )}
      <div className="ml-auto flex flex-row justify-between">
        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p
            className={`text-sm ${
              color === "emerald"
                ? "text-emerald-600"
                : color === "yellow"
                ? "text-yellow-600"
                : "text-orange-600"
            }`}
          >
            {status}
          </p>
        </div>
        <Link
          href={"/plant-guides/" + id}
          className="mt-4 text-gray-700 hover:underline text-sm font-medium self-start justify-center"
        >
          Learn more →
        </Link>
      </div>
    </div>
  );
}
