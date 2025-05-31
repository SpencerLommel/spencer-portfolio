"use client";

export default function MyFooter() {
  return (
    <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
      <SoftButton href="https://github.com/SpencerLommel" text="GitHub" />
      <SoftButton
        href="https://www.linkedin.com/in/spencer-lommel"
        text="LinkedIn"
      />
    </div>
  );

  function SoftButton({ href, text }: { href: string; text: string }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "var(--button-bg)",
          color: "var(--text)",
          textDecoration: "none",
          borderRadius: "8px",
          fontSize: "0.95rem",
          fontWeight: 500,
          border: "1px solid var(--button-border)",
          transition: "all 0.2s ease-in-out",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "var(--button-hover)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "var(--button-bg)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {text}
      </a>
    );
  }
}
