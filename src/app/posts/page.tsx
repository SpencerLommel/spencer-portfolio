"use client";

import React from "react";
import posts from "../posts-content/posts.json";
import Link from "next/link";
import Nav from "../nav";
import ThemeAwareImage from "../components/ThemeAwareImage";

export default function PostsPage() {
  return (
    <div style={{ minHeight: "100vh", width: "100%" }}>
      <div className="content-container">
        <Nav />
        <h1
          style={{ fontSize: "2rem", marginTop: "2rem", marginBottom: "2rem" }}
        >
          Posts
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {posts.map((post) => (
            <Link
              href={`/posts/${post.id}`}
              key={post.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s ease",
                  cursor: "pointer",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "200px",
                  }}
                >
                  <ThemeAwareImage
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={post.id === "post-1"}
                    style={{ objectFit: "cover" }}
                    quality={100}
                  />
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "1.5rem" }}>
                    {post.title}
                  </h2>
                  <p style={{ margin: "0", color: "var(--text)" }}>
                    {post.shortDescription}
                  </p>
                  <p
                    style={{
                      margin: "1rem 0 0 0",
                      color: "var(--text)",
                      opacity: 0.7,
                      fontSize: "0.9rem",
                    }}
                  >
                    {(() => {
                      // Helper to parse and format a date string (supports "MM-DD-YYYY", "MM-YYYY", "YYYY-MM-DD", "YYYY-MM")
                      function formatDate(dateStr: string) {
                        // MM-YYYY (no day)
                        const myMatch = dateStr.match(/^(\d{2})-(\d{4})$/);
                        if (myMatch) {
                          const [_, month, year] = myMatch;
                          // JS months are 0-based, so subtract 1
                          const date = new Date(
                            Number(year),
                            Number(month) - 1,
                            1,
                          );
                          return date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          });
                        }
                        // MM-DD-YYYY
                        const mdyMatch = dateStr.match(
                          /^(\d{2})-(\d{2})-(\d{4})$/,
                        );
                        if (mdyMatch) {
                          const [_, month, day, year] = mdyMatch;
                          const date = new Date(
                            Number(year),
                            Number(month) - 1,
                            Number(day),
                          );
                          return date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          });
                        }
                        const date = new Date(dateStr);
                        return date.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        });
                      }

                      if (post.date.includes(" - ")) {
                        const [start, end] = post.date.split(" - ");
                        const startDate = formatDate(start.trim());
                        const endDate = formatDate(end.trim());
                        return `${startDate} - ${endDate}`;
                      } else {
                        return formatDate(post.date.trim());
                      }
                    })()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
