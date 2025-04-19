'use client'

export default function MyFooter() {
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
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
          }}
        >
          <a
            href="https://github.com/SpencerLommel/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.4rem 1rem",
              backgroundColor: "#f0eee5",
              color: "#333",
              fontSize: "1rem",
              fontWeight: 500,
              border: "0px solid #f0eee5",
              borderRadius: "6px",
              cursor: "pointer",
              textDecoration: "none",
              transition: "background-color 0.2s ease-in-out",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "#f0e1e5";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "#f0eee5";
            }}
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/spencer-lommel/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.4rem 1rem",
              backgroundColor: "#f0eee5",
              color: "#333",
              fontSize: "1rem",
              fontWeight: 500,
              border: "0px solid #f0eee5",
              borderRadius: "6px",
              cursor: "pointer",
              textDecoration: "none",
              transition: "background-color 0.2s ease-in-out",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "#f0e1e5";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "#f0eee5";
            }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
