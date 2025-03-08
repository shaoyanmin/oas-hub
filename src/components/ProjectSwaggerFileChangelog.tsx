import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../styles/markdown-body.css";
const mdFileUrl = "http://localhost:5173/oas/google/calendar/v3/diff.md";

export const ProjectSwaggerFileChangelog = () => {
  const [markdown, setMarkdown] = React.useState("");

  React.useEffect(() => {
    fetch(mdFileUrl)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="markdown-page">
      <header className="markdown-header">
        <h1>
          Swagger file diff: <code>v1.0</code> &rarr; <code>v2.0</code>
        </h1>
      </header>
      <article className="markdown-body mx-auto p-2">
        <Markdown remarkPlugins={[remarkGfm]}>
          {markdown ?? "loading..."}
        </Markdown>
      </article>
    </div>
  );
};
