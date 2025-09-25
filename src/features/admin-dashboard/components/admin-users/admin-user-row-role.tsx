type Props = {
  role: string | undefined;
};

export default function AdminUserRowRole({ role }: Props) {
  return (
    <>
      {role ? (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {role}
        </span>
      ) : (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          No role
        </span>
      )}
    </>
  );
}
