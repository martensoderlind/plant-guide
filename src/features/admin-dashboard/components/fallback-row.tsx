export default function FallbackRow() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-300 mr-4"></div>
          <div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
            <div className="h-3 w-20 bg-gray-200 rounded mt-2"></div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
      </td>

      <td className="px-6 py-4">
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
      </td>

      <td className="px-6 py-4 text-right">
        <div className="h-8 w-20 bg-gray-300 rounded"></div>
      </td>
    </tr>
  );
}
