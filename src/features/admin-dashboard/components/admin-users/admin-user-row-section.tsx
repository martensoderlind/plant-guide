import Image from "next/image";

type Props = {
  username: string;
  fullname: string;
  avatarUrl: string | null;
  email: string;
};

export default function AdminUserRowSection({
  username,
  fullname,
  avatarUrl,
  email,
}: Props) {
  return (
    <div className="flex items-center">
      {avatarUrl ? (
        <Image
          className="h-10 w-10 rounded-full mr-4"
          width={500}
          height={500}
          src={avatarUrl}
          alt={`${fullname || username}'s avatar`}
        />
      ) : (
        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-4">
          <span className="text-sm font-medium text-gray-700">
            {(fullname || username).charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <div>
        <div className="flex items-center space-x-2">
          <div className="text-sm font-medium text-gray-900">
            {fullname || username}
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
            {email}
          </span>
        </div>
        <div className="text-sm text-gray-500">@{username}</div>
      </div>
    </div>
  );
}
