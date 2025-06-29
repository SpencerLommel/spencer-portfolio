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
            {new Date(project.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="markdown-content">
            <ThemeMarkdown content={content} />
          </div>
        </article>
      </div>
    </div>
  );
}
