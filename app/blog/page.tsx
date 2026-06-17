import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/app/_components/blog/PostCard";
import { OperaDivider } from "@/app/_components/OperaMotifs";
import { canonicalUrl, blogIndexLd } from "@/lib/seo";
import { getPublishedPosts } from "@/lib/blog-server";

export const metadata: Metadata = {
  title: "Actualités & conseils",
  description:
    "Articles et actualités du Centre d'Échographie de la Femme OPÉRA à Lyon : grossesse, échographie, santé de la femme et informations pratiques.",
  alternates: { canonical: canonicalUrl("/blog") },
  openGraph: {
    type: "website",
    url: canonicalUrl("/blog"),
    title: "Actualités & conseils · Centre d'Échographie de la Femme OPÉRA",
    description:
      "Articles et actualités du centre d'échographie à Lyon.",
  },
};

export const revalidate = 600;

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexLd()) }}
      />

      <section className="relative bg-ink-deep text-white overflow-hidden">
        <span aria-hidden className="absolute inset-x-0 top-0 h-px gold-rule" />
        <div
          aria-hidden
          className="absolute -top-24 right-0 h-[360px] w-[360px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(201,162,74,0.2), transparent 70%)",
          }}
        />
        <div className="container-page relative pt-28 pb-16 md:pt-32 md:pb-20 max-w-3xl">
          <p className="text-[11px] tracking-[0.34em] uppercase text-accent font-medium">
            Actualités
          </p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] text-balance">
            Conseils &amp;{" "}
            <span className="italic text-accent">informations</span>
          </h1>
          <p className="mt-6 text-lg text-white/75 leading-relaxed text-pretty">
            Retrouvez les articles du Centre d&apos;Échographie de la Femme
            OPÉRA : suivi de grossesse, échographie et santé de la femme.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="container-page">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-white/50 p-12 text-center">
              <p className="text-ink-soft">
                Aucun article publié pour le moment.
              </p>
              <Link
                href="/"
                className="mt-4 inline-flex text-sm font-medium text-primary-deep"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          ) : (
            <div className="space-y-12">
              {featured && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span aria-hidden className="gold-tick" />
                    <span className="text-[11px] tracking-[0.28em] uppercase text-accent-deep font-medium">
                      À la une
                    </span>
                    <OperaDivider className="flex-1 max-w-none" />
                  </div>
                  <PostCard post={featured} featured />
                </div>
              )}

              {rest.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span aria-hidden className="gold-tick" />
                    <span className="text-[11px] tracking-[0.28em] uppercase text-accent-deep font-medium">
                      Tous les articles
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
