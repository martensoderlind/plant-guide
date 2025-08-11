import { Droplets, Leaf, Sun } from "lucide-react";
import ToolCard from "./tool-card";

export default function ToolsContainer() {
  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Expertråd",
      description: "Professionella skötselguider för över 500 växtarter",
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Bevattningsschema",
      description: "Personliga påminnelser för varje växts unika behov",
    },
    {
      icon: <Sun className="w-8 h-8" />,
      title: "Ljusoptimering",
      description: "Hitta den perfekta platsen för dina växter hemma",
    },
  ];
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-100 mb-4">
            Allt du behöver för att lyckas
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Våra verktyg och guider är designade för att göra växtskötsel enkelt
            och roligt, oavsett om du är nybörjare eller expert.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <ToolCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              key={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
