import FallbackRow from "./fallback-row";

type Props = {
  header: string;
  tableHeaders: string[];
};

export default function AdminDashboardFallback({
  header,
  tableHeaders,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{header}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {tableHeaders[0]}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {tableHeaders[1]}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {tableHeaders[2]}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {tableHeaders[3]}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(6)].map((_, i) => (
              <FallbackRow key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
