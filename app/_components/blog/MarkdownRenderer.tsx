import { renderMarkdown } from "@/lib/markdown";

type MarkdownRendererProps = {
  source: string;
};

export async function MarkdownRenderer({ source }: MarkdownRendererProps) {
  const html = await renderMarkdown(source);
  return (
    <div
      className="prose-blog"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
