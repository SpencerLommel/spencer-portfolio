import fs from "fs";
import path from "path";
import postsData from "../../posts-content/posts.json";
import ThemeMarkdown from "../../components/ThemeMarkdown";
import Nav from "../../nav";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = postsData.find((p) => p.id === id);
  if (!post) return {};

  const siteUrl = "https://spencerlommel.com";
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : siteUrl + post.image;

  return {
    title: post.title,
    description: post.shortDescription,
    openGraph: {
      title: post.title,
      description: post.shortDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      url: `${siteUrl}/posts/${post.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.shortDescription,
      images: [imageUrl],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = postsData.find((p) => p.id === id);

  if (!post) {
    return (
      <div style={{ minHeight: "100vh", width: "100%" }}>
        <div className="content-container">
          <Nav />
          <div>Post not found</div>
        </div>
      </div>
    );
  }

  const mdPath = path.join(process.cwd(), "src/app/posts-content", post.markdown);
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
            {post.title}
          </h1>
          <div style={{ color: "var(--text)", marginBottom: "2rem" }}>
            {new Date(post.date).toLocaleDateString("en-US", {
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
