"use client";
import Image from "next/image";
import TextHighlighter from "./components/highlighter";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("highlight");
  const [editableContent, setEditableContent] = useState(
    "This is editable content. Click to edit directly. highlight"
  );

  return (
    <div className="max-w-md mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Text Highlighter Example
        </h1>
        <p className="text-muted-foreground">
          Simple example to show how to highlight specific words in a text
          without polluting the contentEditable dom with extra tags or elements.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="standard-input"
            className="text-sm text-muted-foreground space-y-2"
          >
            Word/ words to highlight(separated by ";")
          </label>
          <Input
            id="standard-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground space-y-2">
            Content Editable to highlight
          </label>
          <TextHighlighter highlightWords={inputValue.split(";")}>
            <div
              id="editable-div"
              contentEditable={true}
              className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onBlur={(e) => setEditableContent(e.currentTarget.innerHTML)}
              dangerouslySetInnerHTML={{ __html: editableContent }}
            />
          </TextHighlighter>
        </div>
      </div>
    </div>
  );
}
