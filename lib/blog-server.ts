import "server-only";

import type { Post } from "@prisma/client";
import { slugify } from "@/lib/blog";
import { hasDatabase, prisma } from "@/lib/prisma";

/** Ensures the slug is unique in the database, appending -2, -3, … if needed. */
export async function uniqueSlug(
  title: string,
  excludeId?: string,
): Promise<string> {
  if (!hasDatabase()) return slugify(title) || "article";

  const base = slugify(title) || "article";
  let candidate = base;
  let n = 2;

  while (true) {
    const existing = await prisma.post.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!existing || existing.id === excludeId) return candidate;
    candidate = `${base}-${n}`;
    n += 1;
  }
}

export async function getPublishedPosts(): Promise<Post[]> {
  if (!hasDatabase()) return [];
  try {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  if (!hasDatabase()) return null;
  try {
    return await prisma.post.findFirst({
      where: { slug, published: true },
    });
  } catch {
    return null;
  }
}

export async function getAllPostsForAdmin(): Promise<Post[]> {
  if (!hasDatabase()) return [];
  return prisma.post.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });
}

export async function getPostById(id: string): Promise<Post | null> {
  if (!hasDatabase()) return null;
  return prisma.post.findUnique({ where: { id } });
}

export async function getRelatedPosts(
  currentId: string,
  limit = 3,
): Promise<Post[]> {
  if (!hasDatabase()) return [];
  try {
    return await prisma.post.findMany({
      where: { published: true, NOT: { id: currentId } },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getPublishedSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  if (!hasDatabase()) return [];
  try {
    return await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
  } catch {
    return [];
  }
}
