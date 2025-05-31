import type { CSSProperties } from "react";

export function fixSyntaxStyle(
  input: string | { [key: string]: CSSProperties },
): { [key: string]: CSSProperties } {
  return input as { [key: string]: CSSProperties };
}
