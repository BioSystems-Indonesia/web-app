"use client";
import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface ContentBlock {
  id: string;
  type: "text" | "image";
  content: string;
}

interface TiptapProps {
  onChange: (html: string) => void;
  initialContent: string;
}

const Tiptap: React.FC<TiptapProps> = ({ onChange, initialContent }) => {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

  useEffect(() => {
    if (initialContent && blocks.length === 0) {
      const parsed = parseHtmlToBlocks(initialContent);
      setBlocks(parsed);
    }
  }, [initialContent]);

  useEffect(() => {
    const html = blocksToHtml(blocks);
    onChange(html);
  }, [blocks]);

  const parseHtmlToBlocks = (html: string): ContentBlock[] => {
    if (!html || html === "<p>Start writing your article...</p>") {
      return [{ id: generateId(), type: "text", content: "" }];
    }

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const parsedBlocks: ContentBlock[] = [];

    const contentWrapper = tempDiv.querySelector(".article-content");

    if (contentWrapper) {
      Array.from(contentWrapper.children).forEach((child) => {
        if (child.classList.contains("image-block")) {
          const img = child.querySelector("img");
          if (img) {
            parsedBlocks.push({
              id: generateId(),
              type: "image",
              content: img.src,
            });
          }
        } else if (child.classList.contains("text-block")) {
          parsedBlocks.push({
            id: generateId(),
            type: "text",
            content: child.innerHTML,
          });
        }
      });
    } else {
      Array.from(tempDiv.children).forEach((child) => {
        if (child.tagName === "IMG") {
          parsedBlocks.push({
            id: generateId(),
            type: "image",
            content: (child as HTMLImageElement).src,
          });
        } else {
          parsedBlocks.push({
            id: generateId(),
            type: "text",
            content: child.outerHTML,
          });
        }
      });
    }

    return parsedBlocks.length > 0 ? parsedBlocks : [{ id: generateId(), type: "text", content: "" }];
  };

  const blocksToHtml = (blocks: ContentBlock[]): string => {
    const blockHtml = blocks
      .map((block) => {
        if (block.type === "image") {
          return `<div class="image-block"><img src="${block.content}" alt="Article image" /></div>`;
        }
        return `<div class="text-block">${block.content}</div>`;
      })
      .join("");

    return `<div class="article-content">${blockHtml}</div>`;
  };

  const generateId = () => {
    return `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const addTextBlock = () => {
    const newBlock: ContentBlock = {
      id: generateId(),
      type: "text",
      content: "",
    };
    setBlocks([...blocks, newBlock]);
  };

  const addImageBlock = () => {
    const newBlock: ContentBlock = {
      id: generateId(),
      type: "image",
      content: "",
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, content: string) => {
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, content } : block)));
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const moveBlockUp = (index: number) => {
    if (index === 0) return;
    const newBlocks = [...blocks];
    [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    setBlocks(newBlocks);
  };

  const moveBlockDown = (index: number) => {
    if (index === blocks.length - 1) return;
    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    setBlocks(newBlocks);
  };

  return (
    <div className="block-editor-container">
      {blocks.map((block, index) => (
        <div key={block.id} className="content-block">
          {block.type === "text" ? (
            <TextBlockEditor
              block={block}
              onUpdate={updateBlock}
              onDelete={deleteBlock}
              onMoveUp={() => moveBlockUp(index)}
              onMoveDown={() => moveBlockDown(index)}
              canMoveUp={index > 0}
              canMoveDown={index < blocks.length - 1}
            />
          ) : (
            <ImageBlock
              block={block}
              onDelete={deleteBlock}
              onUpdate={updateBlock}
              onMoveUp={() => moveBlockUp(index)}
              onMoveDown={() => moveBlockDown(index)}
              canMoveUp={index > 0}
              canMoveDown={index < blocks.length - 1}
            />
          )}
        </div>
      ))}

      <div className="add-block-buttons">
        <button type="button" className="btn-add-block" onClick={addTextBlock}>
          + Add Text Block
        </button>
        <button type="button" className="btn-add-block" onClick={addImageBlock}>
          + Add Image Block
        </button>
      </div>
    </div>
  );
};

const TextBlockEditor: React.FC<{
  block: ContentBlock;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}> = ({ block, onUpdate, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: block.content || "<p>Start writing...</p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onUpdate(block.id, editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="text-block">
      <div className="block-toolbar">
        <div className="format-buttons">
          <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "active" : ""}>
            <strong>B</strong>
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "active" : ""}>
            <em>I</em>
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive("strike") ? "active" : ""}>
            <s>S</s>
          </button>
          <div className="divider"></div>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive("heading", { level: 1 }) ? "active" : ""}>
            H1
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive("heading", { level: 2 }) ? "active" : ""}>
            H2
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive("heading", { level: 3 }) ? "active" : ""}>
            H3
          </button>
          <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive("paragraph") ? "active" : ""}>
            P
          </button>
          <div className="divider"></div>
          <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "active" : ""}>
            • List
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive("orderedList") ? "active" : ""}>
            1. List
          </button>
        </div>
        <div className="block-actions">
          {canMoveUp && (
            <button type="button" onClick={onMoveUp} className="btn-move" title="Move up">
              ↑
            </button>
          )}
          {canMoveDown && (
            <button type="button" onClick={onMoveDown} className="btn-move" title="Move down">
              ↓
            </button>
          )}
          <button type="button" onClick={() => onDelete(block.id)} className="btn-delete-block">
            🗑️
          </button>
        </div>
      </div>
      <EditorContent editor={editor} className="block-editor-content" />
    </div>
  );
};

const ImageBlock: React.FC<{
  block: ContentBlock;
  onDelete: (id: string) => void;
  onUpdate: (id: string, content: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}> = ({ block, onDelete, onUpdate, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) => {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const getCdnUrl = (imageUrl: string) => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }
    return `https://cdn.biosystems.id${imageUrl.startsWith("/") ? imageUrl : "/" + imageUrl}`;
  };

  const deleteImageFromServer = async (imageUrl: string) => {
    if (!imageUrl) return;
    try {
      let filename = imageUrl;

      if (imageUrl.startsWith("http")) {
        const url = new URL(imageUrl);
        filename = url.pathname.split("/").pop() || "";
      }

      if (!filename) {
        console.error("Filename not found");
        return;
      }

      const deleteUrl = `https://cdn.biosystems.id/v1/delete/${filename}`;
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "X-API-KEY": "JHADHSAKDHASJKHDKASHDUBVUAIBVUSAIB",
        },
      });

      if (!response.ok) {
        console.error("Failed to delete image from server");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleDeleteBlock = async () => {
    if (block.content) {
      setDeleting(true);
      await deleteImageFromServer(block.content);
      setDeleting(false);
    }
    onDelete(block.id);
  };

  const handleDeleteImage = async () => {
    if (!block.content) return;

    setDeleting(true);
    await deleteImageFromServer(block.content);
    setDeleting(false);

    onUpdate(block.id, "");
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return;
    }

    if (block.content && block.content.startsWith("/uploads/articles/")) {
      await deleteImageFromServer(block.content);
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://cdn.biosystems.id/v1/upload", {
        headers: { "X-API-KEY": "JHADHSAKDHASJKHDKASHDUBVUAIBVUSAIB" },
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await response.json();
      onUpdate(block.id, data.url);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const changeImageUrl = () => {
    const url = window.prompt("Enter image URL:", block.content);
    if (url && url !== block.content) {
      onUpdate(block.id, url);
    }
  };

  return (
    <div className="image-block">
      <div className="block-toolbar">
        <span className="block-type-label">Image Block</span>
        <div className="block-actions">
          {canMoveUp && (
            <button type="button" onClick={onMoveUp} className="btn-move" title="Move up" disabled={deleting}>
              ↑
            </button>
          )}
          {canMoveDown && (
            <button type="button" onClick={onMoveDown} className="btn-move" title="Move down" disabled={deleting}>
              ↓
            </button>
          )}
          <label className="btn-upload-image" title="Upload new image">
            {uploading ? "⏳" : "📤"}
            <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading || deleting} style={{ display: "none" }} />
          </label>
          <button type="button" onClick={changeImageUrl} className="btn-edit-image" title="Use URL instead" disabled={uploading || deleting}>
            🔗
          </button>
          {block.content && (
            <button type="button" onClick={handleDeleteImage} className="btn-clear-image" title="Remove image" disabled={uploading || deleting}>
              {deleting ? "⏳" : "🗑️"}
            </button>
          )}
          <button type="button" onClick={handleDeleteBlock} className="btn-delete-block" disabled={uploading || deleting}>
            ❌
          </button>
        </div>
      </div>
      <div className="image-preview">
        {block.content ? (
          <img src={getCdnUrl(block.content)} alt="Content" />
        ) : (
          <div className="no-image-placeholder">
            <p>No image uploaded</p>
            <label className="btn-upload-placeholder">
              Click to upload image
              <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading || deleting} style={{ display: "none" }} />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tiptap;
