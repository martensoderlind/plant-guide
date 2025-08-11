import { Droplets, Leaf, Sun } from "lucide-react";
import ToolCard from "./tool-card";

export default function ToolsContainer() {
  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Expert Advice",
      description: "Professional care guides for over 500 plant species",
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Watering Schedule",
      description: "Personalized reminders for each plant's unique needs",
    },
    {
      icon: <Sun className="w-8 h-8" />,
      title: "Light Optimization",
      description: "Find the perfect spot for your plants at home",
    },
  ];
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-100 mb-4">
            All you need to succeed
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Our tools and guides are designed to make plant care easy and fun,
            whether you're a beginner or an expert.
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
