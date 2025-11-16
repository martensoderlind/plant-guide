import { PlantCategoryEnum } from "./types";

export const formatCareLevel = (level: "easy" | "medium" | "hard") => {
  const levels = {
    easy: { text: "Easy", color: "bg-green-100 text-green-800" },
    medium: {
      text: "Medium",
      color: "bg-yellow-100 text-yellow-800",
    },
    hard: { text: "Hard", color: "bg-red-100 text-red-800" },
  };
  return levels[level] || levels.easy;
};

export const formatLightRequirement = (
  light: "low" | "medium" | "bright" | "direct"
) => {
  const lights = {
    low: { text: "Low Light", intensity: "25%" },
    medium: { text: "Medium Light", intensity: "50%" },
    bright: { text: "Bright Light", intensity: "75%" },
    direct: { text: "Direct Sun", intensity: "100%" },
  };
  return lights[light] || lights.medium;
};

export const formatHumidity = (humidity: "easy" | "medium" | "hard") => {
  const humidities = {
    easy: { text: "Low Humidity", level: "Easy-going" },
    medium: { text: "Medium Humidity", level: "Moderate" },
    hard: { text: "High Humidity", level: "Demanding" },
  };
  return humidities[humidity] || humidities.easy;
};

export const formatCategory = (category: PlantCategoryEnum) => {
  return category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
