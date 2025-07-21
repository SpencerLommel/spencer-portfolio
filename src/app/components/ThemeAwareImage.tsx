"use client";

import Image from "next/image";
import { useTheme } from "../context/ThemeContext";
import { FaRegImage } from "react-icons/fa";

interface ThemeAwareImageProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
  quality?: number;
}

export default function ThemeAwareImage(props: ThemeAwareImageProps) {
  const { theme } = useTheme();
  const {
    src,
    alt,
    quality = 100,
    width = 300,
    height = 200,
    fill,
    style,
    ...rest
  } = props;

  // If no src provided, show a default icon
  if (!src) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "var(--card-bg)",
          color: "var(--text)",
          ...style,
        }}
        aria-label={alt}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            height: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaRegImage
            style={{
              width: "100%",
              height: "100%",
              opacity: 0.5,
            }}
          />
        </div>
      </div>
    );
  }

  const themeAwareSrc =
    src && src.includes("/assets/")
      ? src.replace("/assets/", `/assets/${theme}/`)
      : src;

  if (fill) {
    return (
      <Image
        src={themeAwareSrc}
        alt={alt}
        quality={quality}
        fill
        style={style}
        {...rest}
      />
    );
  } else {
    return (
      <Image
        src={themeAwareSrc}
        alt={alt}
        quality={quality}
        width={width}
        height={height}
        style={style}
        {...rest}
      />
    );
  }
}
