export default function ContainerR({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-6xl mx-auto overflow-hidden text-gray-800">
      {children}
    </div>
  );
}
