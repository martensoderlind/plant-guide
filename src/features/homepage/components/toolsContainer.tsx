import { Droplets, Leaf, Sun } from "lucide-react";

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
            <div
              key={idx}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="text-emerald-600">{feature.icon}</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
