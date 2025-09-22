type CareLevel = {
  text: string;
  color: string;
  icon: string;
};

type Props = {
  imageUrl: string;
  name: string;
  careLevel: CareLevel;
};

export default function PlantPageHeader({ imageUrl, name, careLevel }: Props) {
  return (
    <div className="relative">
      {imageUrl && (
        <div className="h-64 md:h-80 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="absolute top-4 right-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${careLevel.color}`}
        >
          <span className="mr-1">{careLevel.icon}</span>
          {careLevel.text}
        </span>
      </div>
    </div>
  );
}
