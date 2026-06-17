import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { preparePostInput } from "@/lib/blog-api";
import { hasDatabase, prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

function revalidateBlog(slug?: string) {
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "Base de données non configurée." },
      { status: 503 },
    );
  }

  const { id } = await context.params;
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Article introuvable." }, { status: 404 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const prepared = await preparePostInput(body, existing);
  if ("error" in prepared) {
    return NextResponse.json({ error: prepared.error }, { status: 400 });
  }

  const post = await prisma.post.update({ where: { id }, data: prepared });
  revalidateBlog(existing.slug);
  if (post.slug !== existing.slug) revalidateBlog(post.slug);
  return NextResponse.json({ id: post.id, slug: post.slug });
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "Base de données non configurée." },
      { status: 503 },
    );
  }

  const { id } = await context.params;
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Article introuvable." }, { status: 404 });
  }

  await prisma.post.delete({ where: { id } });
  revalidateBlog(existing.slug);
  return NextResponse.json({ ok: true });
}
