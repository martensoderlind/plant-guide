import Image from "next/image";
import { CareLevel } from "../types";

type Props = {
  imageUrl: string | null;
  name: string;
  careLevel: CareLevel;
};

export default function PlantPageHeader({ imageUrl, name, careLevel }: Props) {
  return (
    <div className="relative">
      {imageUrl && (
        <div className="h-64 md:h-80 overflow-hidden">
          <Image
            width={500}
            height={500}
            className="w-full h-64 md:h-96 object-cover"
            src={imageUrl}
            alt={name}
          />
        </div>
      )}
      <div className="absolute top-4 right-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${careLevel.color}`}
        >
          {careLevel.text}
        </span>
      </div>
    </div>
  );
}
