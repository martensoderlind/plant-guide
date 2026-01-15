type Props = {
  header: string;
  text: string;
  icon: React.ReactNode;
};

export default function ArticleMetric({ header, text, icon }: Props) {
  return (
    <div className="flex flex-col">
      <p className="text-gray-500">{header}</p>
      <div className="flex gap-2 text-gray-800">
        {icon}
        <p className="">{text}</p>
      </div>
    </div>
  );
}
