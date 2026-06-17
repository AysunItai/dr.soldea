import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { preparePostInput } from "@/lib/blog-api";
import { getAllPostsForAdmin } from "@/lib/blog-server";
import { hasDatabase, prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function revalidateBlog(slug?: string) {
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function GET() {
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "Base de données non configurée." },
      { status: 503 },
    );
  }
  const posts = await getAllPostsForAdmin();
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "Base de données non configurée." },
      { status: 503 },
    );
  }

  const body = (await request.json()) as Record<string, unknown>;
  const prepared = await preparePostInput(body);
  if ("error" in prepared) {
    return NextResponse.json({ error: prepared.error }, { status: 400 });
  }

  const post = await prisma.post.create({ data: prepared });
  revalidateBlog(post.slug);
  return NextResponse.json({ id: post.id, slug: post.slug });
}
