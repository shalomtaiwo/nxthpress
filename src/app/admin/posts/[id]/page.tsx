    import { prisma } from '@/lib/prisma';
    import PostForm from '@/components/PostForm';
    import { updatePost } from '../actions';
    import { notFound } from 'next/navigation';

    export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await prisma.post.findUnique({
        where: { id },
        include: { tags: { include: { tag: true } } },
    });
    if (!post) return notFound();

    return (
        <div className="prose">
        <h1>Edit Post</h1>
        <PostForm
            defaultValues={{
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt ?? '',
            contentMD: post.contentMD,
            tags: post.tags.map((t: any) => t.tag.name),
            published: post.published,
            }}
            formAction={updatePost.bind(null, post.id)}
            submitLabel="Update"
        />
        </div>
    );
    }
