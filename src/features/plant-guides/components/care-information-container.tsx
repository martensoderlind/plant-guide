type Props = {
  children: React.ReactNode;
  color: string;
  icon?: React.ReactNode;
  description?: string;
};

export default function CareInformationContainer({
  children,
  color,
  icon,
  description,
}: Props) {
  return (
    <div className={`bg-${color}-50 rounded-lg p-4`}>
      <div className="flex items-center mb-3">
        {<div className={`h-6 w-6 text-${color}-600 mr-2`}>{icon}</div>}
        <h3 className={`text-lg font-semibold text-${color}-900`}>
          {description}
        </h3>
      </div>
      {children}
    </div>
  );
}
``;
