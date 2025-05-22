'use client';

import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const isProjectsPage = pathname?.includes('/projects');

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
              backgroundColor: isProjectsPage ? "#f0e1e5" : "#f0eee5",
              color: "#333",
              fontSize: "1rem",
              fontWeight: 500,
              border: "0px solid #f0eee5",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.2s ease-in-out",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#f0e1e5";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                isProjectsPage ? "#f0e1e5" : "#f0eee5";
            }}
          >
            Projects
          </button>

          <button
            onClick={() => (window.location.href = "/posts")}
            style={{
              padding: "0.4rem 1rem",
              backgroundColor: "#f0eee5",
              color: "#333",
              fontSize: "1rem",
              fontWeight: 500,
              border: "0px solid #f0eee5",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.2s ease-in-out",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#f0e1e5";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#f0eee5";
            }}
          >
            Posts
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
}
