    import {prisma} from '@/lib/prisma';
    import { notFound } from 'next/navigation';
    import PageBuilder from '@/components/PageBuilder';
    import { buildPreviewEnterUrl, buildPreviewExitUrl } from '@/lib/preview';
    import { updatePage } from '../actions';

    type Props = { params: Promise<{ id: string }> };

    export default async function AdminEditPage({ params }: Props) {
    const { id } = await params;
    const page = await prisma.page.findUnique({ where: { id } });
    if (!page) notFound();

    const redirectPath = page.isHome ? '/' : `/pages/${page.slug}`;
    const previewUrl = buildPreviewEnterUrl(redirectPath, page.id);
    const exitUrl = buildPreviewExitUrl(redirectPath);

    async function action(formData: FormData) {
        'use server';
        if (!page) {
            throw new Error("Page not found");
        }
        await updatePage(page.id, formData);
    }

    return (
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Edit: {page.title}</h1>
            <div className="flex gap-2">
            <a href={previewUrl} className="px-4 py-2 rounded border">Preview</a>
            <a href={exitUrl} className="px-4 py-2 rounded border">Exit preview</a>
            </div>
        </div>

        <form action={action} className="space-y-6">
            <input type="hidden" name="id" value={page.id} />
            <div className="grid gap-4">
            <label className="block">
                <span className="text-sm text-gray-600">Title</span>
                <input
                name="title"
                defaultValue={page.title}
                className="w-full border rounded px-3 py-2"
                />
            </label>
            <label className="block">
                <span className="text-sm text-gray-600">Slug</span>
                <input
                name="slug"
                defaultValue={page.slug}
                className="w-full border rounded px-3 py-2"
                />
            </label>
            </div>

            <PageBuilder initial={(page.blocks as any) || []} />

            <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
                Save
            </button>
            </div>
        </form>
        </div>
    );
    }
