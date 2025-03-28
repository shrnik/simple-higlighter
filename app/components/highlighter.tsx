"use client";

import React, { useEffect, useRef, useState } from "react";

interface Highlight {
  id: string;
  startOffset: number;
  endOffset: number;
}

interface HighlightData {
  top: number;
  left: number;
  height: number;
  width: number;
}

interface TextHighlighterProps {
  highlightWords: string[];
  children: React.ReactNode;
}

const TextHighlighter: React.FC<TextHighlighterProps> = ({
  highlightWords,
  children,
}) => {
  const [highlights, setHighlights] = useState<HighlightData[]>([]);
  const contentRef = useRef<HTMLElement | null>(null);

  const textNodesUnder = (el: Node): Text[] => {
    let n: Node | null,
      a: Text[] = [],
      walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    while ((n = walk.nextNode())) a.push(n as Text);
    return a;
  };

  const checkText = (text: string, words: string[]): Highlight[] => {
    console.log("highlightWords", highlightWords);
    const tokens = text.split(/([\s,.!?]+)/g);
    const alerts: Highlight[] = [];
    let curPos = 0;
    let id = 0;

    tokens.forEach((t) => {
      console.log(t);
      if (t.trim().length > 0 && words.includes(t)) {
        alerts.push({
          id: (id++).toString(),
          startOffset: curPos,
          endOffset: curPos + t.length,
        });
      }
      curPos += t.length;
    });
    return alerts;
  };

  const check = (ref: HTMLElement, words: string[]) => {
    const nodes = textNodesUnder(ref);
    const highlightsData: HighlightData[] = [];

    nodes.forEach((node) => {
      const alerts = checkText(node.textContent || "", words);
      console.log(alerts);
      const ranges: { [key: string]: Range } = {};
      alerts.forEach((a) => {
        const r = document.createRange();
        r.setStart(node, a.startOffset);
        r.setEnd(node, a.endOffset);
        ranges[a.id] = r;
      });

      alerts.forEach((a) => {
        const rect = ranges[a.id].getClientRects()[0];
        if (rect) {
          highlightsData.push({
            top: rect.top,
            left: rect.left,
            height: rect.height,
            width: rect.width,
          });
        }
      });
    });

    setHighlights(highlightsData);
  };

  useEffect(() => {
    console.log("adding new highlightWords", highlightWords);
    const ref = contentRef.current;

    const handleKeyUp = () => {
      if (ref) {
        check(ref, highlightWords);
      }
    };

    if (ref) {
      ref.addEventListener("keyup", handleKeyUp);
      check(ref, highlightWords);
    }

    return () => {
      console.log("cleaning up event listener for keyup");
      if (ref) {
        ref.removeEventListener("keyup", handleKeyUp);
      }
    };
  }, [highlightWords]);

  return (
    <div className="highlight-container">
      {highlights.map((h, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: h.top + h.height - 1,
            left: h.left,
            width: h.width,
            height: 3,
            background: "rgba(255, 0, 0, 0.5)",
          }}
        ></div>
      ))}
      {React.cloneElement(children as any, {
        ref: contentRef,
      })}
    </div>
  );
};

export default TextHighlighter;
