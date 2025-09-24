    import { prisma } from '@/lib/prisma';
    import ReactMarkdown from 'react-markdown';
    import remarkGfm from 'remark-gfm';
    import rehypeRaw from 'rehype-raw';
    import type { Metadata } from 'next';
    import { notFound } from 'next/navigation';

    type Props = { params: Promise<{ slug: string }> };

    export async function generateStaticParams() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        select: { slug: true }
    });
    return posts.map(p => ({ slug: p.slug }));
    }

    export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post || !post.published) return {};

    const title = post.seoTitle || post.title;
    const description = post.seoDescription || post.excerpt || undefined;
    const image = post.seoImageUrl || post.coverImageUrl || undefined;

    return {
        title,
        description,
        openGraph: {
        title,
        description,
        type: 'article',
        images: image ? [{ url: image }] : undefined
        },
        twitter: {
        card: image ? 'summary_large_image' : 'summary',
        title,
        description,
        images: image ? [image] : undefined
        }
    };
    }

    export const revalidate = 60;

    export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post || !post.published) notFound();

    return (
        <article className="prose prose-lg">
        <h1>{post.title}</h1>
        {post.coverImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.coverImageUrl} alt="" className="rounded" />
        )}
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {post.contentMD}
        </ReactMarkdown>
        </article>
    );
    }
