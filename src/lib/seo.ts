    import type { Block, SeoMetaBlock } from '@/components/page-builder/types';

    export function getSeoFromBlocks(blocks: Block[]) {
    const seo = blocks.find(b => b.type === 'seo') as SeoMetaBlock | undefined;
    return seo;
    }

    export function buildPageMetadata({
    blocks,
    pageTitle,
    pagePath,
    siteName = 'NxthPress',
    }: {
    blocks: Block[];
    pageTitle: string;
    pagePath: string;
    siteName?: string;
    }) {
    const seo = getSeoFromBlocks(blocks);
    const title = seo?.title || pageTitle || siteName;
    const description = seo?.description || undefined;
    const image = seo?.image || undefined;
    const noIndex = Boolean(seo?.noIndex);

    return {
        title,
        description,
        openGraph: {
        title,
        description,
        url: pagePath,
        siteName,
        images: image ? [{ url: image }] : undefined,
        type: 'website',
        },
        twitter: {
        card: image ? 'summary_large_image' : 'summary',
        title,
        description,
        images: image ? [image] : undefined,
        },
        alternates: { canonical: pagePath },
        robots: noIndex ? { index: false, follow: false } : undefined,
    } as any;
    }

    export function buildPostMetadata({
    post,
    postPath,
    siteName = 'NxthPress',
    }: {
    post: {
        title?: string | null;
        excerpt?: string | null;
        coverImageUrl?: string | null;
        createdAt?: Date | string | null;
        updatedAt?: Date | string | null;
        author?: { name?: string | null } | null;
        tags?: Array<string> | Array<{ name?: string | null }> | null;
        seoTitle?: string | null;
        seoDescription?: string | null;
        seoImage?: string | null;
    };
    postPath: string;
    siteName?: string;
    }) {
    const title = post.seoTitle || post.title || siteName;
    const description = post.seoDescription || post.excerpt || undefined;
    const image = post.seoImage || post.coverImageUrl || undefined;

    const tagStrings: string[] | undefined = Array.isArray(post.tags)
        ? (post.tags as any[]).map(t => (typeof t === 'string' ? t : t?.name)).filter(Boolean)
        : undefined;

    return {
        title,
        description,
        openGraph: {
        type: 'article',
        title,
        description,
        url: postPath,
        siteName,
        images: image ? [{ url: image }] : undefined,
        tags: tagStrings,
        authors: post?.author?.name ? [post.author.name] : undefined,
        publishedTime: post?.createdAt ? new Date(post.createdAt).toISOString() : undefined,
        modifiedTime: post?.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
        },
        twitter: {
        card: image ? 'summary_large_image' : 'summary',
        title,
        description,
        images: image ? [image] : undefined,
        },
        alternates: { canonical: postPath },
    } as any;
    }
