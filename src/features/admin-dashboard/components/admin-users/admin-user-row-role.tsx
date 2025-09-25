"use client";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { updateUserRole } from "../../actions";

type UserRole = "USER" | "ADMIN" | "AUTHOR" | "MODERATOR";

type Props = {
  id: string;
  role: string | undefined;
};

export default function AdminUserRowRole({ id, role }: Props) {
  const [currentStatus, setCurrentStatus] = useState(role);
  const [toggleMenu, setToggleMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statusOptions: {
    value: UserRole;
    label: string;
    color: string;
  }[] = [
    { value: "USER", label: "User", color: "bg-yellow-100 text-yellow-800" },
    {
      value: "ADMIN",
      label: "Admin",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "AUTHOR",
      label: "Author",
      color: "bg-gray-100 text-gray-800",
    },
    {
      value: "MODERATOR",
      label: "Moderator",
      color: "bg-blue-100 text-blue-800",
    },
  ];
  function openMenu() {
    setToggleMenu(!toggleMenu);
  }

  async function selectStatus(newRole: UserRole) {
    setToggleMenu(false);
    setCurrentStatus(newRole);
    await updateUserRole(id, newRole);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setToggleMenu(false);
      }
    }

    if (toggleMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleMenu]);
  const currentMenuStatus = statusOptions.find(
    (option) => option.value === currentStatus
  );

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {role ? (
        <button
          onClick={openMenu}
          className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full transition-colors hover:opacity-80 ${
            currentMenuStatus?.color || "bg-gray-100 text-gray-800"
          }`}
        >
          {currentMenuStatus?.label || role}
          <ChevronDown
            size={12}
            className={`transition-transform ${toggleMenu ? "rotate-180" : ""}`}
          />
        </button>
      ) : (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          No role
        </span>
      )}
      {toggleMenu && (
        <div className="absolute top-full flex flex-col left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px] ">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => selectStatus(option.value)}
              className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-gray-50 transition-colors first:rounded-t-md last:rounded-b-md ${
                role === option.value
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700"
              }`}
            >
              <span
                className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  option.value === "USER"
                    ? "bg-yellow-400"
                    : option.value === "ADMIN"
                    ? "bg-green-400"
                    : option.value === "AUTHOR"
                    ? "bg-gray-400"
                    : "bg-blue-100"
                }`}
              />
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
