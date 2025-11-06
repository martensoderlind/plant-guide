"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

interface TiptapEditorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
}

export default function TiptapEditor({ value, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-4",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "ml-4",
          },
        },
      }),
    ],
    immediatelyRender: false,
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  useEffect(() => {
    if (
      editor &&
      value &&
      JSON.stringify(editor.getJSON()) !== JSON.stringify(value)
    ) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border border-gray-300 text-gray-500 rounded-lg p-3 min-h-[200px]">
      <div className="toolbar">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-2"
        >
          <Bold className={editor.isActive("bold") ? "bg-gray-200" : ""} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-2"
        >
          <Italic className={editor.isActive("italic") ? "bg-gray-200" : ""} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-2"
        >
          <List
            className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
          />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="px-2"
        >
          <ListOrdered
            className={editor.isActive("orderedList") ? "bg-gray-200" : ""}
          />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
