'use client';

import { usePathname } from 'next/navigation';
import { useTheme } from './context/ThemeContext';

export default function Nav() {
  const pathname = usePathname();
  const isProjectsPage = pathname?.includes('/projects');
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <div
        style={{
          display: "flex",
          paddingTop: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0rem",
        }}
      >
        <h1 
          onClick={() => window.location.href = "/"}
          style={{ 
            fontSize: "1.75rem", 
            fontWeight: 600, 
            margin: 0,
            cursor: "pointer",
            transition: "opacity 0.2s ease-in-out",
            color: 'var(--text)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = "0.7";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          Spencer Lommel
        </h1>

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
          }}
        >
          <button
            onClick={() => (window.location.href = "/projects")}
            style={{
              padding: "0.4rem 1rem",
              backgroundColor: isProjectsPage ? "var(--button-hover)" : "var(--button-bg)",
              color: "var(--text)",
              fontSize: "1rem",
              fontWeight: 500,
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.2s ease-in-out",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "var(--button-hover)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                isProjectsPage ? "var(--button-hover)" : "var(--button-bg)";
            }}
          >
            Projects
          </button>

          <button
            onClick={toggleTheme}
            style={{
              padding: "0.4rem 1rem",
              backgroundColor: "var(--button-bg)",
              color: "var(--text)",
              fontSize: "1rem",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
}
