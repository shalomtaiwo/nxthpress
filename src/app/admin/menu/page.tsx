    import { prisma } from '@/lib/prisma';
    import Link from 'next/link';

    export default async function MenuAdminPage() {
    const items = await prisma.menuItem.findMany({
        orderBy: [{ location: 'asc' }, { order: 'asc' }, { label: 'asc' }],
    });

    return (
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Menu</h1>
            <Link className="rounded bg-black px-3 py-2 text-white" href="/admin/menu/new">New Item</Link>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full border bg-white text-sm">
            <thead className="bg-gray-50">
                <tr className="text-left">
                <th className="px-3 py-2">Label</th>
                <th className="px-3 py-2">Href</th>
                <th className="px-3 py-2">Location</th>
                <th className="px-3 py-2">Order</th>
                <th className="px-3 py-2">Visible</th>
                <th className="px-3 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.map((it) => (
                <tr key={it.id} className="border-t">
                    <td className="px-3 py-2">{it.label}</td>
                    <td className="px-3 py-2">{it.href}</td>
                    <td className="px-3 py-2">{it.location}</td>
                    <td className="px-3 py-2">{it.order}</td>
                    <td className="px-3 py-2">{it.visible ? 'Yes' : 'No'}</td>
                    <td className="px-3 py-2 flex gap-2">
                    <Link className="rounded border px-3 py-1" href={`/admin/menu/${it.id}`}>Edit</Link>
                    <form action={async (fd) => { 'use server'; const { toggleMenuVisibility } = await import('./actions'); await toggleMenuVisibility(it.id); }}>
                        <button className="rounded border px-3 py-1" type="submit">{it.visible ? 'Hide' : 'Unhide'}</button>
                    </form>
                    <form action={async (fd) => { 'use server'; const { deleteMenuItem } = await import('./actions'); await deleteMenuItem(it.id); }}>
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
