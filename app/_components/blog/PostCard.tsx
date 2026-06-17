import Link from "next/link";
import type { Post } from "@prisma/client";
import { formatDate, parseTags } from "@/lib/blog";

type PostCardProps = {
  post: Post;
  featured?: boolean;
};

export function PostCard({ post, featured = false }: PostCardProps) {
  const tags = parseTags(post.tags);

  return (
    <article
      className={
        featured
          ? "card-gold-top group relative overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-white via-[#fbf7f0] to-champagne ring-1 ring-accent/35 shadow-[0_24px_60px_-32px_rgba(11,31,58,0.16)] transition-all duration-500 hover:-translate-y-1 hover:ring-accent/55 hover:shadow-[0_40px_80px_-28px_rgba(201,162,74,0.22)] lg:grid lg:grid-cols-[1.2fr_1fr]"
          : "card-gold-top group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-b from-white via-[#fbf7f0] to-champagne ring-1 ring-accent/35 shadow-[0_24px_60px_-32px_rgba(11,31,58,0.14)] transition-all duration-500 hover:-translate-y-1.5 hover:ring-accent/55 hover:shadow-[0_40px_80px_-28px_rgba(201,162,74,0.22)]"
      }
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        {post.coverImage && (
          <div
            className={
              featured
                ? "relative aspect-[16/10] lg:aspect-auto lg:min-h-full overflow-hidden"
                : "relative aspect-[16/10] overflow-hidden border-b border-accent/15"
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        )}

        <div className={featured ? "flex flex-col justify-center p-7 md:p-9" : "flex flex-1 flex-col p-6 sm:p-7"}>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/90 px-3 py-1 text-[10px] tracking-[0.16em] uppercase text-accent-deep ring-1 ring-accent/25"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h2
            className={
              featured
                ? "font-display text-3xl md:text-4xl text-ink leading-snug text-balance group-hover:text-primary-deep transition-colors"
                : "font-display text-2xl text-ink leading-snug text-balance group-hover:text-primary-deep transition-colors"
            }
          >
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="mt-3 text-sm text-ink-soft leading-relaxed text-pretty line-clamp-3">
              {post.excerpt}
            </p>
          )}

          <div className="mt-auto pt-5 flex items-center justify-between text-xs text-muted border-t border-accent/20">
            <time dateTime={post.publishedAt?.toISOString()}>
              {formatDate(post.publishedAt)}
            </time>
            <span>{post.readingTime} min de lecture</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
