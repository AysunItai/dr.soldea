import {
  calculateReadingTime,
  deriveExcerpt,
  slugify,
} from "@/lib/blog";
import { uniqueSlug } from "@/lib/blog-server";

export type PostInput = {
  title?: unknown;
  slug?: unknown;
  excerpt?: unknown;
  content?: unknown;
  coverImage?: unknown;
  tags?: unknown;
  published?: unknown;
};

export type PreparedPost = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  tags: string;
  published: boolean;
  readingTime: number;
  publishedAt: Date | null;
};

export async function preparePostInput(
  body: PostInput,
  existing?: {
    id: string;
    slug: string;
    published: boolean;
    publishedAt: Date | null;
  },
): Promise<PreparedPost | { error: string }> {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";

  if (!title) return { error: "Le titre est obligatoire." };
  if (!content) return { error: "Le contenu est obligatoire." };

  const published = body.published === true;
  const rawSlug =
    typeof body.slug === "string" && body.slug.trim()
      ? slugify(body.slug)
      : slugify(title);
  const slug = rawSlug
    ? await uniqueSlug(rawSlug, existing?.id)
    : await uniqueSlug(title, existing?.id);

  const excerptRaw =
    typeof body.excerpt === "string" ? body.excerpt.trim() : "";
  const excerpt = excerptRaw || deriveExcerpt(content);

  const coverImage =
    typeof body.coverImage === "string" && body.coverImage.trim()
      ? body.coverImage.trim()
      : null;

  const tags = typeof body.tags === "string" ? body.tags.trim() : "";

  let publishedAt: Date | null = existing?.publishedAt ?? null;
  if (published && !publishedAt) {
    publishedAt = new Date();
  }
  if (!published) {
    publishedAt = null;
  }

  return {
    title,
    slug,
    excerpt,
    content,
    coverImage,
    tags,
    published,
    readingTime: calculateReadingTime(content),
    publishedAt,
  };
}
