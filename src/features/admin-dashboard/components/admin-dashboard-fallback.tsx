import FallbackRow from "./fallback-row";

type Props = {
  header?: string;
  tableHeaders: string[];
  emailPlaceHolder: boolean;
};

export default function AdminDashboardFallback({
  header,
  tableHeaders,
  emailPlaceHolder,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      {header && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{header}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((tableHeader, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {tableHeaders[index]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(6)].map((_, i) => (
              <FallbackRow key={i} emailPlaceHolder={emailPlaceHolder} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
