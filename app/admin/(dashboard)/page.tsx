import Link from "next/link";
import { PostRowActions } from "@/app/_components/admin/PostRowActions";
import { formatDate } from "@/lib/blog";
import { getAllPostsForAdmin } from "@/lib/blog-server";
import { hasDatabase } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const posts = hasDatabase() ? await getAllPostsForAdmin() : [];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-ink">Articles</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Rédigez, publiez et gérez les actualités du centre.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-white ring-1 ring-accent/40 hover:bg-ink-deep transition-colors"
        >
          Nouvel article
        </Link>
      </div>

      {!hasDatabase() && (
        <div className="mb-6 rounded-xl bg-primary-soft/40 ring-1 ring-primary/20 p-4 text-sm text-ink-soft">
          Base de données non configurée. Ajoutez{" "}
          <code className="text-ink">DATABASE_URL</code> dans{" "}
          <code className="text-ink">.env</code>, puis exécutez{" "}
          <code className="text-ink">npm run db:migrate</code>.
        </div>
      )}

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white/60 p-12 text-center">
          <p className="text-ink-soft">Aucun article pour le moment.</p>
          <Link
            href="/admin/posts/new"
            className="mt-4 inline-flex text-sm font-medium text-primary-deep hover:text-primary"
          >
            Créer le premier article →
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-cream/60 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Titre</th>
                <th className="px-5 py-3 font-medium hidden md:table-cell">Statut</th>
                <th className="px-5 py-3 font-medium hidden lg:table-cell">Date</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-line/70 last:border-0">
                  <td className="px-5 py-4">
                    <div className="font-medium text-ink">{post.title}</div>
                    <div className="text-xs text-muted mt-0.5">/blog/{post.slug}</div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span
                      className={[
                        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium",
                        post.published
                          ? "bg-primary-soft/60 text-primary-deep"
                          : "bg-cream text-muted ring-1 ring-line",
                      ].join(" ")}
                    >
                      {post.published ? "Publié" : "Brouillon"}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-muted">
                    {formatDate(post.publishedAt ?? post.updatedAt)}
                  </td>
                  <td className="px-5 py-4">
                    <PostRowActions id={post.id} title={post.title} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
