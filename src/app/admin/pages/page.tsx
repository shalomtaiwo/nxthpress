    import { prisma } from '@/lib/prisma';
    import Link from 'next/link';
    import { togglePublish, setAsHome, deletePage } from './actions';

    export default async function PagesAdmin() {
    const pages = await prisma.page.findMany({ orderBy: [{ isHome: 'desc' }, { title: 'asc' }] });

    return (
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Pages</h1>
            <Link className="rounded bg-black px-3 py-2 text-white" href="/admin/pages/new">New Page</Link>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full border bg-white text-sm">
            <thead className="bg-gray-50">
                <tr>
                <th className="px-3 py-2 text-left">Title</th>
                <th className="px-3 py-2 text-left">Slug</th>
                <th className="px-3 py-2 text-left">Path</th>
                <th className="px-3 py-2 text-left">Home</th>
                <th className="px-3 py-2 text-left">Published</th>
                <th className="px-3 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {pages.map((p: any) => (
                <tr key={p.id} className="border-t">
                    <td className="px-3 py-2">{p.title}</td>
                    <td className="px-3 py-2">{p.slug}</td>
                    <td className="px-3 py-2">{p.path}</td>
                    <td className="px-3 py-2">{p.isHome ? 'Yes' : 'No'}</td>
                    <td className="px-3 py-2">{p.published ? 'Yes' : 'No'}</td>
                    <td className="px-3 py-2 flex gap-2">
                    <Link href={`/admin/pages/${p.id}`} className="rounded border px-3 py-1">Edit</Link>
                    {!p.isHome && (
                        <form action={async (fd) => { 'use server'; await setAsHome(p.id); }}>
                        <button className="rounded border px-3 py-1" type="submit">Set Home</button>
                        </form>
                    )}
                    <form action={async (fd) => { 'use server'; await togglePublish(p.id); }}>
                        <button className="rounded border px-3 py-1" type="submit">{p.published ? 'Unpublish' : 'Publish'}</button>
                    </form>
                    <form action={async (fd) => { 'use server'; await deletePage(p.id); }}>
                        <button className="rounded border px-3 py-1" type="submit">Delete</button>
                    </form>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
    }
