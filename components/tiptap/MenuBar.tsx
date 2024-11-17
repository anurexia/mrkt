"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "../ui/button";

const MenuBar = () => {
  const editor: Editor | null = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content: "enter your text here",
    editorProps: {
      attributes: {
        // - modify the class for the typography plugin to take effect
        class: "focus:outline-none min-h-[150px] prose prose-sm sm:prose-base",
      },
    },
  });

  return (
    <div className="flex flex-wrap gap-5">
      {/* headings */}
      <Button
        onClick={() =>
          editor
            ?.chain()
            .toggleHeading({
              level: 1,
            })
            .run()
        }
        variant={
          editor?.isActive("heading", { level: 1 }) ? "default" : "secondary"
        }
        type="button"
      >
        H1
      </Button>

      <Button
        onClick={() =>
          editor
            ?.chain()
            .toggleHeading({
              level: 2,
            })
            .run()
        }
        variant={
          editor?.isActive("heading", { level: 2 }) ? "default" : "secondary"
        }
        type="button"
      >
        H2
      </Button>

      <Button
        onClick={() =>
          editor
            ?.chain()
            .toggleHeading({
              level: 3,
            })
            .run()
        }
        variant={
          editor?.isActive("heading", { level: 3 }) ? "default" : "secondary"
        }
        type="button"
      >
        H3
      </Button>

      {/* bold */}
      <Button
        onClick={() => editor?.chain().toggleBold().run()}
        variant={editor?.isActive("bold") ? "default" : "secondary"}
        type="button"
      >
        Bold
      </Button>

      {/* italic */}
      <Button
        type="button"
        onClick={() => editor?.chain().toggleItalic().run()}
        variant={editor?.isActive("italic") ? "default" : "secondary"}
      >
        Italic
      </Button>

      {/* strike */}
      <Button
        type="button"
        onClick={() => editor?.chain().toggleStrike().run()}
        variant={editor?.isActive("strike") ? "default" : "secondary"}
      >
        Strike
      </Button>

      {/* Since we can't distinguish between h1, h2 and h3 in the editor, we're going to use a tailwind plugin for typography, after adding it in the config, add it to the editorProps */}
      {editor && (
        <EditorContent
          className="text-md min-h-24 w-full rounded-md border border-neutral-200 p-4 font-medium text-neutral-700"
          height={500}
          editor={editor}
        />
      )}
    </div>
  );
};

export default MenuBar;
