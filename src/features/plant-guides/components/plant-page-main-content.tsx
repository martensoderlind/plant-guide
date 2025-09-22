type Props = {
  description: string;
};

export default function PlantPageMainContent({ description }: Props) {
  return (
    <div className="mb-8">
      <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
    </div>
  );
}
