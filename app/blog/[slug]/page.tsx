import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/app/_components/blog/MarkdownRenderer";
import { PostCard } from "@/app/_components/blog/PostCard";
import { formatDate, parseTags, truncateForMeta } from "@/lib/blog";
import {
  getPublishedPostBySlug,
  getRelatedPosts,
} from "@/lib/blog-server";
import { blogPostingLd, canonicalUrl, SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Article introuvable" };

  const title = post.title;
  const description = truncateForMeta(post.excerpt ?? post.title, 160);
  const url = canonicalUrl(`/blog/${post.slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: post.coverImage
        ? [{ url: post.coverImage.startsWith("http") ? post.coverImage : `${SITE_URL}${post.coverImage}` }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const tags = parseTags(post.tags);
  const related = await getRelatedPosts(post.id);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingLd(post)),
        }}
      />

      <article>
        <header className="relative bg-ink-deep text-white overflow-hidden">
          <span aria-hidden className="absolute inset-x-0 top-0 h-px gold-rule" />
          <div className="container-page relative pt-28 pb-12 md:pt-32 md:pb-16 max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors"
            >
              ← Actualités
            </Link>

            {tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-3 py-1 text-[10px] tracking-[0.16em] uppercase text-accent ring-1 ring-accent/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-balance">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-5 text-lg text-white/75 leading-relaxed text-pretty">
                {post.excerpt}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/60">
              <time dateTime={post.publishedAt?.toISOString()}>
                {formatDate(post.publishedAt)}
              </time>
              <span aria-hidden>·</span>
              <span>{post.readingTime} min de lecture</span>
            </div>
          </div>
        </header>

        {post.coverImage && (
          <div className="container-page -mt-2 relative z-10 max-w-4xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-accent/30 shadow-[0_40px_80px_-32px_rgba(7,26,51,0.45)]">
              <Image
                src={post.coverImage}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 896px, 100vw"
                priority
              />
            </div>
          </div>
        )}

        <div className="bg-cream py-14 md:py-20">
          <div className="container-page max-w-3xl">
            <MarkdownRenderer source={post.content} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-background py-16 md:py-20 border-t border-line">
          <div className="container-page">
            <h2 className="font-display text-2xl md:text-3xl text-ink mb-8">
              Continuer la lecture
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
