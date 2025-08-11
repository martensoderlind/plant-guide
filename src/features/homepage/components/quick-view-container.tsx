import Plant from "./plant";

export default function QuickViewContainer() {
  const plants = [
    {
      id: 1,
      image: "/monstrea.png",
      name: "Monstera",
      status: "Frisk",
      color: "emerald",
    },
    {
      id: 2,
      image: "/fikus.png",
      name: "Fikus",
      status: "Vattna imorgon",
      color: "yellow",
    },
    {
      id: 3,
      image: "/glacier-pothos.png",
      name: "Pothos",
      status: "Perfekt",
      color: "emerald",
    },
    {
      id: 4,
      image: "/sansevieria.jpg",
      name: "Sansevieria",
      status: "Behöver ljus",
      color: "orange",
    },
  ];
  return (
    <section className="relative">
      <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {plants.map((plant, idx) => (
            <Plant
              id={plant.id}
              image={plant.image}
              key={idx}
              name={plant.name}
              color={plant.color}
              status={plant.status}
            />
          ))}
        </div>
      </div>
      <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-40"></div>
    </section>
  );
}
