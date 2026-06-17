import { Editor } from "@/app/_components/admin/Editor";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="font-display text-3xl md:text-4xl text-ink mb-8">
        Nouvel article
      </h1>
      <Editor
        initial={{
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          coverImage: "",
          tags: "",
          published: false,
        }}
        submitLabel="Créer l'article"
      />
    </div>
  );
}
