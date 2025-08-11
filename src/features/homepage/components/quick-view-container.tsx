export default function QuickViewContainer() {
  return (
    <div className="relative">
      <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl">
        <div className="grid grid-cols-2 gap-6">
          {[
            { name: "Monstera", status: "Frisk", color: "emerald" },
            { name: "Fikus", status: "Vattna imorgon", color: "yellow" },
            { name: "Pothos", status: "Perfekt", color: "emerald" },
            { name: "Sansevieria", status: "Behöver ljus", color: "orange" },
          ].map((plant, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-300"
            >
              <div className="w-full h-16 bg-gradient-to-br from-green-200 to-emerald-300 rounded-lg mb-3"></div>
              <h3 className="font-semibold text-gray-800">{plant.name}</h3>
              <p
                className={`text-sm ${
                  plant.color === "emerald"
                    ? "text-emerald-600"
                    : plant.color === "yellow"
                    ? "text-yellow-600"
                    : "text-orange-600"
                }`}
              >
                {plant.status}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-40"></div>
    </div>
  );
}
