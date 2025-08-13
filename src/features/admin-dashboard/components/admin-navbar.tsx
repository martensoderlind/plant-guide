import { BarChart3, BookOpen, Leaf } from "lucide-react";

type Props = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export default function AdminNavbar({ activeTab, setActiveTab }: Props) {
  return (
    <div className="mb-8">
      <nav className="flex space-x-8">
        {[
          { id: "overview", label: "Overview", icon: BarChart3 },
          { id: "plants", label: "Plants", icon: Leaf },
          { id: "articles", label: "Articles", icon: BookOpen },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
