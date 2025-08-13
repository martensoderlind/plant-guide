import { Leaf, Search, Settings } from "lucide-react";

type Props = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function AdminDashboardHeader({
  searchTerm,
  setSearchTerm,
}: Props) {
  return (
    <header className="shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Leaf className="h-8 w-8 text-emerald-600" />
            <h1 className="text-2xl font-bold">Plant guide Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Settings className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
