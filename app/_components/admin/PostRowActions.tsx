"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type PostRowActionsProps = {
  id: string;
  title: string;
};

export function PostRowActions({ id, title }: PostRowActionsProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Supprimer « ${title} » ? Cette action est irréversible.`)) {
      return;
    }
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete failed");
      router.refresh();
    } catch {
      alert("Impossible de supprimer l'article.");
      setDeleting(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <a
        href={`/admin/posts/${id}/edit`}
        className="text-sm text-primary-deep hover:text-primary"
      >
        Modifier
      </a>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="text-sm text-muted hover:text-primary-deep disabled:opacity-50"
      >
        {deleting ? "…" : "Supprimer"}
      </button>
    </div>
  );
}
