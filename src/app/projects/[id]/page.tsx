import fs from "fs";
import path from "path";
import projectsData from "../projects.json";
import ThemeMarkdown from "../../components/ThemeMarkdown";
import Nav from "../../nav";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: Props) {
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

  const mdPath = path.join(process.cwd(), "src/app/posts", project.markdown);
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
            {new Date(project.date).toLocaleDateString()}
          </div>
          <div className="markdown-content">
            <ThemeMarkdown content={content} />
          </div>
        </article>
      </div>
    </div>
  );
}
