"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import type { ComponentPropsWithoutRef } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "../context/ThemeContext";
import ThemeAwareImage from "./ThemeAwareImage";
import LogViewer from "./LogViewer";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeNormalizeComponents from "../../lib/rehypeNormalizeComponents";

import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";

SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("json", json);

function LogContentLoader({ src }: { src: string }) {
  const [logContent, setLogContent] = useState<string>("");

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await fetch(src);
        const content = await response.text();
        setLogContent(content);
      } catch (error) {
        console.error("Error loading log file:", error);
        setLogContent("Error loading log file");
      }
    };

    fetchLog();
  }, [src]);

  return logContent ? <LogViewer content={logContent} /> : null;
}

export default function ThemeMarkdown({ content }: { content: string }) {
  const { theme } = useTheme();

  const components: Components & { [key: string]: any } = {
    img: ({ src, alt }) => (
      <div
        style={{
          position: "relative",
          width: "100%",
          margin: "2rem 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ThemeAwareImage
          src={typeof src === "string" ? src : ""}
          alt={alt || ""}
          width={1920}
          height={1080}
          quality={100}
          priority
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "8px",
          }}
        />
      </div>
    ),
    code: ({
      inline,
      className,
      children,
      ...props
    }: ComponentPropsWithoutRef<"code"> & { inline?: boolean }) => {
      const match = /language-(\w+)/.exec(className || "");
      const code = String(children).replace(/\n$/, "");

      if (!inline && match) {
        return (
          <div style={{ position: "relative" }}>
            <SyntaxHighlighter
              // @ts-expect-error style type mismatch
              style={theme === "dark" ? oneDark : oneLight}
              language={match[1]}
              PreTag="div"
              customStyle={{
                margin: "1.5em 0",
                borderRadius: "8px",
                padding: "1em",
                fontSize: "0.9em",
              }}
              showLineNumbers={true}
              {...props}
            >
              {code}
            </SyntaxHighlighter>

            <button
              onClick={() => navigator.clipboard.writeText(code)}
              className="copy-button"
              aria-label="Copy code"
            >
              📋
            </button>
          </div>
        );
      }
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    Log: ({ src }: { src: string }) => {
      return <LogContentLoader src={src} />;
    },
  };

  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeNormalizeComponents]}
    >
      {content}
    </ReactMarkdown>
  );
}
