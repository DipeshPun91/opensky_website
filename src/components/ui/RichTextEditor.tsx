"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import {
  FiBold,
  FiItalic,
  FiList,
  FiLink,
  FiCode,
  FiRotateCcw,
  FiRotateCw,
  FiImage,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiAlignJustify,
  FiMinus,
  FiUnderline as FiUnderlineIcon,
  FiCornerDownLeft,
} from "react-icons/fi";
import {
  MdFormatListNumbered,
  MdFormatQuote,
  MdHighlight,
} from "react-icons/md";

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-md text-sm transition disabled:cursor-not-allowed disabled:opacity-30 ${
        active
          ? "bg-sky-500/20 text-sky-400"
          : "text-gray-400 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", previousUrl || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-white/10 bg-gray-900/60 p-2">
      {/* Text formatting */}
      <ToolbarButton
        label="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <FiBold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <FiItalic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Underline"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <FiUnderlineIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Strikethrough"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <FiMinus className="h-4 w-4" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-white/10" />

      {/* Headings */}
      <ToolbarButton
        label="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <span className="text-xs font-bold">H2</span>
      </ToolbarButton>
      <ToolbarButton
        label="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <span className="text-xs font-bold">H3</span>
      </ToolbarButton>
      <ToolbarButton
        label="Heading 4"
        active={editor.isActive("heading", { level: 4 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      >
        <span className="text-xs font-bold">H4</span>
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-white/10" />

      {/* Lists */}
      <ToolbarButton
        label="Bullet List"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <FiList className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Numbered List"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <MdFormatListNumbered className="h-4 w-4" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-white/10" />

      {/* Alignment */}
      <ToolbarButton
        label="Align Left"
        active={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <FiAlignLeft className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Align Center"
        active={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <FiAlignCenter className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Align Right"
        active={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <FiAlignRight className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Justify"
        active={editor.isActive({ textAlign: "justify" })}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        <FiAlignJustify className="h-4 w-4" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-white/10" />

      {/* Blocks */}
      <ToolbarButton
        label="Quote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <MdFormatQuote className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Code Block"
        active={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <FiCode className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Highlight"
        active={editor.isActive("highlight")}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <MdHighlight className="h-4 w-4" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-white/10" />

      {/* Links & Images */}
      <ToolbarButton
        label="Link"
        active={editor.isActive("link")}
        onClick={setLink}
      >
        <FiLink className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Image" onClick={addImage}>
        <FiImage className="h-4 w-4" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-white/10" />

      {/* Hard break */}
      <ToolbarButton
        label="Hard Break"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <FiCornerDownLeft className="h-4 w-4" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-white/10" />

      {/* Undo/Redo */}
      <ToolbarButton
        label="Undo"
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <FiRotateCcw className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Redo"
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <FiRotateCw className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
}

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: { class: "tiptap-link" },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Highlight,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap-content",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-gray-900/60">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />

      <style jsx global>{`
        .tiptap-content {
          min-height: 16rem;
          padding: 0.75rem 1rem;
          color: #e5e7eb;
          font-size: 0.875rem;
          line-height: 1.7;
        }
        .tiptap-content:focus {
          outline: none;
        }
        .tiptap-content p {
          margin: 0 0 0.9em;
        }
        .tiptap-content h2 {
          margin: 1.2em 0 0.5em;
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
        }
        .tiptap-content h3 {
          margin: 1.1em 0 0.5em;
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
        }
        .tiptap-content h4 {
          margin: 1em 0 0.5em;
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
        }
        .tiptap-content ul,
        .tiptap-content ol {
          margin: 0 0 0.9em;
          padding-left: 1.4em;
        }
        .tiptap-content ul {
          list-style: disc;
        }
        .tiptap-content ol {
          list-style: decimal;
        }
        .tiptap-content blockquote {
          margin: 0 0 0.9em;
          padding-left: 1em;
          border-left: 3px solid rgba(56, 189, 248, 0.5);
          color: #9ca3af;
          font-style: italic;
        }
        .tiptap-content pre {
          margin: 0 0 0.9em;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          background: #111827;
          overflow-x: auto;
          font-size: 0.8rem;
        }
        .tiptap-content pre code {
          color: #e5e7eb;
        }
        .tiptap-content code {
          font-family: ui-monospace, monospace;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.1rem 0.3rem;
          border-radius: 0.2rem;
          font-size: 0.8em;
        }
        .tiptap-content a.tiptap-link {
          color: #38bdf8;
          text-decoration: underline;
          cursor: pointer;
        }
        .tiptap-content a.tiptap-link:hover {
          color: #7dd3fc;
        }
        .tiptap-content .tiptap-image {
          max-width: 100%;
          height: auto;
          margin: 1em 0;
          border-radius: 0.5rem;
        }
        .tiptap-content .highlight {
          background: rgba(56, 189, 248, 0.2);
          padding: 0.1rem 0.2rem;
          border-radius: 0.2rem;
        }
        .tiptap-content ul[data-type="taskList"] {
          list-style: none;
          padding-left: 0;
        }
        .tiptap-content ul[data-type="taskList"] li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }
        .tiptap-content ul[data-type="taskList"] li input[type="checkbox"] {
          margin-top: 0.3rem;
          accent-color: #38bdf8;
        }
      `}</style>
    </div>
  );
}
