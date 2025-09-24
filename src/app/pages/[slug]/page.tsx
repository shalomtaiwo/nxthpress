import { draftMode } from 'next/headers';
import { prisma } from '@/lib/prisma';
import PageRenderer from '@/components/PageRenderer';
import { buildPageMetadata } from '@/lib/seo';

export const revalidate = 60;

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params, searchParams }: Props) {
    const { slug } = await params;
    const sp = await searchParams;
    const isDraft = (await draftMode()).isEnabled;
    const previewId = typeof sp.previewId === 'string' ? sp.previewId : undefined;

    const page = isDraft && previewId
        ? await prisma.page.findUnique({ where: { id: previewId } })
        : await prisma.page.findFirst({ where: { slug, published: true } });

    if (!page) return { title: 'Page not found • NxthPress' };

    const path = `/pages/${page.slug}`;
    const blocks = (page.blocks as any) || [];
    return buildPageMetadata({
        blocks,
        pageTitle: page.title,
        pagePath: path,
        siteName: 'NxthPress',
    });
}

export default async function PageBySlug({ params, searchParams }: Props) {
    const { slug } = await params;
    const sp = await searchParams;
    const isDraft = (await draftMode()).isEnabled;
    const previewId = typeof sp.previewId === 'string' ? sp.previewId : undefined;

    const page = isDraft && previewId
        ? await prisma.page.findUnique({ where: { id: previewId } })
        : await prisma.page.findFirst({ where: { slug, published: true } });

    if (!page) {
        return (
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-2xl font-semibold">Not found</h1>
            </div>
        );
    }

    const blocks = (page.blocks as any) || [];

    return (
        <div className="py-10">
            <div className="container mx-auto px-4 mb-8">
                <h1 className="text-3xl font-semibold">{page.title}</h1>
            </div>
            <PageRenderer blocks={blocks} />
        </div>
    );
}
