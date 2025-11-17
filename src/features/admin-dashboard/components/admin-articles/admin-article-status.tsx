"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { ArticleStatusType } from "@/features/articles/types";
import ToastContainer from "@/components/ToastContainer";
import { useToast } from "../../../../../hooks/toast";
import AdminArticleOptionButton from "./admin-article-option-button";
import { updateStatus } from "../../actions";

type ArticleStatus = "draft" | "published" | "archived";

type Props = {
  id: number;
  status: ArticleStatus;
};

export default function AdminArticleStatus({ id, status }: Props) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [toggleMenu, setToggleMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { toasts, removeToast, success, info } = useToast();

  const statusOptions: {
    value: ArticleStatus;
    label: string;
    color: string;
  }[] = [
    { value: "draft", label: "Draft", color: "bg-yellow-100 text-yellow-800" },
    {
      value: "published",
      label: "Published",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "archived",
      label: "Archived",
      color: "bg-gray-100 text-gray-800",
    },
  ];

  function openMenu() {
    setToggleMenu(!toggleMenu);
  }

  async function updateArticleStatus(newStatus: ArticleStatusType) {
    const result = await updateStatus(id, newStatus);
    if (!result.success) {
      info("There was an error updating the article status.");
    }
    setCurrentStatus(newStatus);
    setToggleMenu(false);
    success("Article status updated successfully.");
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
    <>
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          onClick={openMenu}
          className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full transition-colors hover:opacity-80 ${
            currentMenuStatus?.color || "bg-gray-100 text-gray-800"
          }`}
        >
          {currentMenuStatus?.label || status}
          <ChevronDown
            size={12}
            className={`transition-transform ${toggleMenu ? "rotate-180" : ""}`}
          />
        </button>

        {toggleMenu && (
          <div className="absolute top-full flex flex-col left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px] ">
            {statusOptions.map((option, idx) => (
              <AdminArticleOptionButton
                key={idx}
                option={option}
                selectStatus={updateArticleStatus}
              />
            ))}
          </div>
        )}
      </div>
      <ToastContainer
        toasts={toasts}
        onRemove={removeToast}
        position="top-right"
      />
    </>
  );
}
