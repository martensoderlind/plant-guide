type Props = {
  option: {
    value: "draft" | "published" | "archived";
    label: string;
    color: string;
  };
  selectStatus: (status: "draft" | "published" | "archived") => void;
};

export default function AdminArticleOptionButton({
  option,
  selectStatus,
}: Props) {
  return (
    <button
      onClick={() => selectStatus(option.value)}
      className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-gray-50 transition-colors first:rounded-t-md last:rounded-b-md ${
        status === option.value ? "bg-blue-50 text-blue-700" : "text-gray-700"
      }`}
    >
      <span
        className={`inline-block w-2 h-2 rounded-full mr-2 ${
          option.value === "draft"
            ? "bg-yellow-400"
            : option.value === "published"
            ? "bg-green-400"
            : "bg-gray-400"
        }`}
      />
      {option.label}
    </button>
  );
}
