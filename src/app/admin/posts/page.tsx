    import { prisma } from '@/lib/prisma';
    import Link from 'next/link';
    import { deletePostByFormData } from './actions';
    import { auth } from '@/auth';
    import { redirect } from 'next/navigation';

    export default async function AdminPostsPage() {
    const session = await auth();
    if (!session) redirect('/');

    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: { tags: { include: { tag: true } } },
    });

    return (
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Posts</h1>
            <Link className="rounded bg-black px-3 py-2 text-white" href="/admin/posts/new">New</Link>
        </div>

        <ul className="divide-y rounded border bg-white">
            {posts.map((p) => (
            <li key={p.id} className="flex items-center justify-between p-4">
                <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-gray-500">/{p.slug}</div>
                </div>
                <div className="flex gap-2">
                <Link className="rounded border px-3 py-1" href={`/admin/posts/${p.id}`}>Edit</Link>
                <form action={deletePostByFormData}>
                    <input type="hidden" name="id" value={p.id} />
                    <button className="rounded border px-3 py-1" type="submit">Delete</button>
                </form>
                </div>
            </li>
            ))}
        </ul>
        </div>
    );
    }
