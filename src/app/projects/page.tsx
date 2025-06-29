"use client";

import React from "react";
import projects from "../projects-content/projects.json";
import Link from "next/link";
import Nav from "../nav";
import ThemeAwareImage from "../components/ThemeAwareImage";

export default function ProjectsPage() {
  return (
    <div style={{ minHeight: "100vh", width: "100%" }}>
      <div className="content-container">
        <Nav />
        <h1
          style={{ fontSize: "2rem", marginTop: "2rem", marginBottom: "2rem" }}
        >
          Projects
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {projects.map((project) => (
            <Link
              href={`/projects/${project.id}`}
              key={project.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="project-card"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "stretch",
                  backgroundColor: "var(--card-bg)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s ease",
                  cursor: "pointer",
                  minHeight: "220px",
                }}
              >
                {/* Image on the right for desktop, on top for mobile */}
                <div
                  className="project-card-content"
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    padding: "1.2rem 2.2rem 1.2rem 1.5rem",
                  }}
                >
                  <h2 style={{ margin: "0 0 0.4rem 0", fontSize: "1.5rem" }}>
                    {project.title}
                  </h2>
                  <p style={{ margin: "0 0 0.8rem 0", color: "var(--text)" }}>
                    {project.shortDescription}
                  </p>
                  <p
                    style={{
                      margin: "0",
                      color: "var(--text)",
                      opacity: 0.7,
                      fontSize: "0.9rem",
                    }}
                  >
                    {new Date(project.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div
                  className="project-card-image-container"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1.2rem 1.5rem 1.2rem 0",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      border: "2px solid var(--border)",
                      borderRadius: "10px",
                      background: "var(--card-bg)",
                      boxSizing: "border-box",
                      overflow: "hidden",
                      width: "260px",
                      minWidth: "220px",
                      aspectRatio: "4 / 3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "200px",
                      maxHeight: "260px",
                    }}
                  >
                    <ThemeAwareImage
                      src={project.image}
                      alt={project.title}
                      fill={false}
                      width={260}
                      height={195}
                      sizes="260px"
                      priority={project.id === "project-1"}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        display: "block",
                        borderRadius: "8px",
                        background: "var(--image-bg, #222)",
                      }}
                      quality={100}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 700px) {
          .project-card {
            flex-direction: column !important;
            min-height: unset !important;
          }
          .project-card-image-container {
            order: -1;
            padding: 0 !important;
            justify-content: center !important;
            width: 100% !important;
          }
          .project-card-image-container > div {
            width: 100% !important;
            min-width: unset !important;
            height: auto !important;
            aspect-ratio: 4 / 3 !important;
            max-width: 400px;
            margin: 0 auto;
          }
          .project-card-content {
            padding: 0.8rem 1.2rem 1.2rem 1.2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
