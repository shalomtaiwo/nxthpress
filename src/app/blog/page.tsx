import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';

type Search = Promise<Record<string, string | string[] | undefined>>;

export const revalidate = 60;

const PAGE_SIZE = 5;

function pickOne(v?: string | string[]) {
    return Array.isArray(v) ? v[0] : v;
}

function pageHref(base: string, tag: string | undefined, page: number) {
    const qp = new URLSearchParams();
    if (tag) qp.set('tag', tag);
    if (page > 1) qp.set('page', String(page));
    const qs = qp.toString();
    return qs ? `${base}?${qs}` : base;
}

export async function generateMetadata({ searchParams }: { searchParams: Search }): Promise<Metadata> {
    const sp = await searchParams;
    const tag = pickOne(sp.tag)?.trim();
    const page = Math.max(1, parseInt(pickOne(sp.page) ?? '1', 10) || 1);
    const title = tag ? `Blog • #${tag}` : 'Blog';
    const description = tag
        ? `Posts tagged with ${tag}. Page ${page}.`
        : `Latest posts. Page ${page}.`;
    const url = pageHref('/blog', tag, page);

    return {
        title: `${title} • NxthPress`,
        description,
        openGraph: {
            title: `${title} • NxthPress`,
            description,
            url,
            type: 'website',
        },
        twitter: {
            card: 'summary',
            title: `${title} • NxthPress`,
            description,
        },
        alternates: { canonical: url },
    };
}

export default async function BlogIndex({ searchParams }: { searchParams: Search }) {
    const sp = await searchParams;
    const tag = pickOne(sp.tag)?.trim();
    const page = Math.max(1, parseInt(pickOne(sp.page) ?? '1', 10) || 1);

    const where = {
        published: true,
        ...(tag ? { tags: { some: { tag: { name: tag } } } } : {}),
    };

    const [total, posts, allTags] = await Promise.all([
        prisma.post.count({ where }),
        prisma.post.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: PAGE_SIZE,
            skip: (page - 1) * PAGE_SIZE,
            select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                coverImageUrl: true,
                createdAt: true,
                tags: { include: { tag: true } },
            },
        }),
        prisma.tag.findMany({
            orderBy: { name: 'asc' },
            select: { name: true, _count: { select: { posts: true } } },
        }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const hasPrev = page > 1;
    const hasNext = page < totalPages;

    return (
        <div className="grid gap-6">
            <div className="flex items-end justify-between gap-4">
                <h1 className="text-3xl font-bold">Blog</h1>
                <div className="text-sm text-gray-600">
                    {total} post{total === 1 ? '' : 's'}
                    {tag ? <> in <span className="font-medium">#{tag}</span></> : null}
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Link
                    href="/blog"
                    className={`rounded border px-3 py-1 text-sm ${!tag ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'}`}
                >
                    All
                </Link>
                {allTags.map((t: unknown) => (
                    <Link
                        key={(t as any).name}
                        href={pageHref('/blog', (t as any).name, 1)}
                        className={`rounded border px-3 py-1 text-sm ${tag === (t as any).name ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'
                            }`}
                    >
                        #{(t as any).name} <span className="opacity-60">({(t as any)._count.posts})</span>
                    </Link>
                ))}
            </div>

            <div className="grid gap-4">
                {posts.map((p: unknown) => (
                    <Link
                        key={(p as any).id}
                        href={`/blog/${(p as any).slug}`}
                        className="rounded border bg-white p-4 hover:shadow"
                    >
                        {(p as any).coverImageUrl && (
                            <img
                                alt=""
                                src={(p as any).coverImageUrl}
                                className="mb-3 aspect-[16/9] w-full rounded object-cover"
                            />
                        )}
                        <div className="mb-1 text-xl font-semibold">{(p as any).title}</div>
                        {(p as any).excerpt ? <p className="text-gray-600">{(p as any).excerpt}</p> : null}
                        {(p as any).tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                {(p as any).tags.map((t: unknown) => (
                                    <span key={(t as any).tag.name} className="rounded bg-gray-100 px-2 py-1">
                                        #{(t as any).tag.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </Link>
                ))}

                {posts.length === 0 && (
                    <div className="rounded border bg-white p-6 text-gray-600">
                        No posts{tag ? <> for <span className="font-medium">#{tag}</span></> : ''} yet.
                    </div>
                )}
            </div>

            <div className="mt-2 flex items-center justify-between">
                <Link
                    aria-disabled={!hasPrev}
                    className={`rounded border px-3 py-2 ${hasPrev ? 'bg-white hover:bg-gray-50' : 'pointer-events-none opacity-50'}`}
                    href={hasPrev ? pageHref('/blog', tag, page - 1) : '#'}
                >
                    ← Prev
                </Link>

                <div className="text-sm text-gray-600">
                    Page {Math.min(page, totalPages)} / {totalPages}
                </div>

                <Link
                    aria-disabled={!hasNext}
                    className={`rounded border px-3 py-2 ${hasNext ? 'bg-white hover:bg-gray-50' : 'pointer-events-none opacity-50'}`}
                    href={hasNext ? pageHref('/blog', tag, page + 1) : '#'}
                >
                    Next →
                </Link>
            </div>
        </div>
    );
}
