import { notFound } from "next/navigation";
import { Editor } from "@/app/_components/admin/Editor";
import { getPostById } from "@/lib/blog-server";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl md:text-4xl text-ink mb-8">
        Modifier l&apos;article
      </h1>
      <Editor
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          coverImage: post.coverImage ?? "",
          tags: post.tags,
          published: post.published,
        }}
        submitLabel="Enregistrer les modifications"
      />
    </div>
  );
}
