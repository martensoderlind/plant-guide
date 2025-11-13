"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RenderArticleContent({ content }: { content: any }) {
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
    content,
    editable: false,
  });
  return <EditorContent editor={editor} />;
}
