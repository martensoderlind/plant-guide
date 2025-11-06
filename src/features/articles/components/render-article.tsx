"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RenderArticleContent({ content }: { content: any }) {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content,
    editable: false,
  });
  return <EditorContent editor={editor} />;
}
