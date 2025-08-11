type Props = {
  image: string | undefined;
  name: string;
  color: string;
  status: string;
};
export default function Plant({ image, name, color, status }: Props) {
  return (
    <div className="bg-gray-50 rounded-xl px-4 pt-4 pb-14 hover:shadow-md transition-all duration-300">
      {image && (
        <img
          src={image}
          alt=""
          className="rounded-lg object-contain w-full h-full"
        />
      )}
      <div className="ml-auto">
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
    </div>
  );
}
