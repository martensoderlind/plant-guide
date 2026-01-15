import Image from "next/image";
import { CareLevel } from "../../types";

type Props = {
  imageUrl: string | null;
  name: string;
  careLevel: CareLevel;
};

export default function PlantPageHeader({ imageUrl, name, careLevel }: Props) {
  return (
    <div className="relative">
      {imageUrl && (
        <div className="mb-4 rounded-lg overflow-hidden shadow-lg">
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
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-md`}
        >
          {careLevel.text}
        </span>
      </div>
    </div>
  );
}
