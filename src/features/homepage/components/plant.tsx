type Props = {
  name: string;
  color: string;
  status: string;
};
export default function Plant({ name, color, status }: Props) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-300">
      <div className="w-full h-16 bg-gradient-to-br from-green-200 to-emerald-300 rounded-lg mb-3"></div>
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
  );
}
