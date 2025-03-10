import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../styles/markdown-body.css";
import {
  diffMarkdownAtom,
  versionPaginationAtom,
  versionActiveIdAtom,
} from "../atoms/changelogAtom";
import { useAtom } from "jotai";

export const ProjectChangelog = () => {
  const [{ data: markdown, error }] = useAtom(diffMarkdownAtom);
  const [{ prev, current, next }] = useAtom(versionPaginationAtom);
  const [, setVersionActiveId] = useAtom(versionActiveIdAtom);

  if (error) {
    window.confirm("Failed to load diff document, refresh to try again?");
    location.reload();
  }

  return (
    <div className="markdown-page">
      <header className="markdown-header">
        <h1>
          Diff:{" "}
          {prev ? (
            <a
              href="#"
              onClick={() => setVersionActiveId(prev)}
              className="text-blue-600"
            >
              <code>{prev}</code> &rarr;{" "}
            </a>
          ) : (
            ""
          )}{" "}
          <code>{current}</code>{" "}
          {next ? (
            <a
              href="#"
              onClick={() => setVersionActiveId(next)}
              className="text-blue-300"
            >
              (&rarr; <code>{next}</code>)
            </a>
          ) : (
            ""
          )}
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
