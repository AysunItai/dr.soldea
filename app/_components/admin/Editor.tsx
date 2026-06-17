"use client";

import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/blog";

export type EditorPost = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string;
  published: boolean;
};

type EditorProps = {
  initial: EditorPost;
  submitLabel?: string;
};

type ViewMode = "write" | "preview" | "split";

export function Editor({ initial, submitLabel = "Enregistrer" }: EditorProps) {
  const [form, setForm] = useState<EditorPost>(initial);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.slug));
  const [mode, setMode] = useState<ViewMode>("split");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slugTouched && form.title) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }));
    }
  }, [form.title, slugTouched]);

  const preview = useMemo(() => form.content, [form.content]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const isNew = !form.id;
    const url = isNew ? "/api/admin/posts" : `/api/admin/posts/${form.id}`;
    const method = isNew ? "POST" : "PATCH";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string; id?: string };
      if (!res.ok) {
        setError(data.error ?? "Erreur lors de l'enregistrement.");
        setSaving(false);
        return;
      }
      window.location.href = isNew
        ? `/admin/posts/${data.id}/edit`
        : "/admin";
    } catch {
      setError("Erreur réseau. Réessayez.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-ink">Titre</span>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none ring-accent/30 focus:ring-2"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ink">Slug (URL)</span>
          <input
            required
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setForm({ ...form, slug: slugify(e.target.value) });
            }}
            className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-3 font-mono text-sm text-ink outline-none ring-accent/30 focus:ring-2"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ink">Image de couverture (URL)</span>
          <input
            value={form.coverImage}
            onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
            placeholder="/hero1.webp"
            className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none ring-accent/30 focus:ring-2"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-ink">Extrait (optionnel)</span>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={2}
            className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none ring-accent/30 focus:ring-2"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-ink">Tags (séparés par des virgules)</span>
          <input
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="grossesse, échographie, lyon"
            className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none ring-accent/30 focus:ring-2"
          />
        </label>
      </div>

      <div className="flex items-center gap-2">
        {(["write", "split", "preview"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={[
              "rounded-full px-4 py-2 text-sm transition-colors",
              mode === m
                ? "bg-ink text-white"
                : "bg-cream text-ink-soft hover:text-ink ring-1 ring-line",
            ].join(" ")}
          >
            {m === "write" ? "Écrire" : m === "split" ? "Split" : "Aperçu"}
          </button>
        ))}
      </div>

      <div
        className={[
          "grid gap-4",
          mode === "split" ? "lg:grid-cols-2" : "grid-cols-1",
        ].join(" ")}
      >
        {(mode === "write" || mode === "split") && (
          <label className="block">
            <span className="text-sm font-medium text-ink">Contenu (Markdown)</span>
            <textarea
              required
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={22}
              className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-3 font-mono text-sm text-ink outline-none ring-accent/30 focus:ring-2"
            />
          </label>
        )}

        {(mode === "preview" || mode === "split") && (
          <div className="rounded-xl border border-line bg-white p-6 overflow-auto max-h-[36rem]">
            <div className="prose-blog">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{preview || "*Aperçu vide*"}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      <label className="inline-flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => setForm({ ...form, published: e.target.checked })}
          className="h-4 w-4 rounded border-line text-primary accent-primary"
        />
        <span className="text-sm text-ink">Publier (visible sur /blog)</span>
      </label>

      {error && (
        <p className="text-sm text-primary-deep" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-white ring-1 ring-accent/40 hover:bg-ink-deep disabled:opacity-60 transition-colors"
      >
        {saving ? "Enregistrement…" : submitLabel}
      </button>
    </form>
  );
}
