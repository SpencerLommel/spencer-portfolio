import fs from "fs";
import path from "path";
import projectsData from "../../projects-content/projects.json";
import ThemeMarkdown from "../../components/ThemeMarkdown";
import Nav from "../../nav";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);
  if (!project) return {};

  const siteUrl = "https://spencerlommel.com";
  const imageUrl = project.image.startsWith("http")
    ? project.image
    : siteUrl + project.image;

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: "article",
      url: `${siteUrl}/projects/${project.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDescription,
      images: [imageUrl],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", width: "100%" }}>
        <div className="content-container">
          <Nav />
          <div>Project not found</div>
        </div>
      </div>
    );
  }

  const mdPath = path.join(
    process.cwd(),
    "src/app/projects-content",
    project.markdown,
  );
  let content = "";

  try {
    content = fs.readFileSync(mdPath, "utf-8");
  } catch (error) {
    console.error("Error reading markdown file:", error);
    content = "Error loading content";
  }

  return (
    <div style={{ minHeight: "100vh", width: "100%" }}>
      <div className="content-container">
        <Nav />
        <article style={{ marginTop: "2rem" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            {project.title}
          </h1>
          <div style={{ color: "var(--text)", marginBottom: "2rem" }}>
            {(() => {
              // Helper to parse and format a date string (supports "MM-DD-YYYY", "MM-YYYY", "YYYY-MM-DD", "YYYY-MM")
              function formatDate(dateStr: string) {
                // MM-YYYY (no day)
                const myMatch = dateStr.match(/^(\d{2})-(\d{4})$/);
                if (myMatch) {
                  const [_, month, year] = myMatch;
                  // JS months are 0-based, so subtract 1
                  const date = new Date(Number(year), Number(month) - 1, 1);
                  return date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  });
                }
                // MM-DD-YYYY
                const mdyMatch = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
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

              if (project.date.includes(" - ")) {
                const [start, end] = project.date.split(" - ");
                const startDate = formatDate(start.trim());
                const endDate = formatDate(end.trim());
                return `${startDate} - ${endDate}`;
              } else {
                return formatDate(project.date.trim());
              }
            })()}
          </div>
          <div className="markdown-content">
            <ThemeMarkdown content={content} />
          </div>
        </article>
      </div>
    </div>
  );
}
