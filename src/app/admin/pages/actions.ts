    'use server';

    import { prisma } from '@/lib/prisma';
    import { revalidatePath } from 'next/cache';
    import { z } from 'zod';

    const PageInput = z.object({
    title: z.string().min(1),
    slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
    published: z.boolean().optional(),
    isHome: z.boolean().optional(),
    blocks: z.string().transform((s) => JSON.parse(s || '[]')),
    });

    function toPath(slug: string, isHome: boolean) {
    return isHome ? '/' : `/pages/${slug}`;
    }

    export async function createPage(formData: FormData) {
    const payload = PageInput.parse({
        title: formData.get('title'),
        slug: String(formData.get('slug') || '').trim(),
        published: formData.get('published') === 'on',
        isHome: formData.get('isHome') === 'on',
        blocks: String(formData.get('blocks') || '[]'),
    });

    const path = toPath(payload.slug, !!payload.isHome);

    if (payload.isHome) {
        await prisma.page.updateMany({ data: { isHome: false }, where: { isHome: true } });
    }

    await prisma.page.create({
        data: {
        title: payload.title,
        slug: payload.slug,
        path,
        isHome: !!payload.isHome,
        published: !!payload.published,
        blocks: payload.blocks,
        },
    });

    revalidatePath('/');
    revalidatePath('/pages');
    revalidatePath('/(site)');
    }

    export async function updatePage(id: string, formData: FormData) {
    const payload = PageInput.parse({
        title: formData.get('title'),
        slug: String(formData.get('slug') || '').trim(),
        published: formData.get('published') === 'on',
        isHome: formData.get('isHome') === 'on',
        blocks: String(formData.get('blocks') || '[]'),
    });

    const path = toPath(payload.slug, !!payload.isHome);

    if (payload.isHome) {
        await prisma.page.updateMany({ data: { isHome: false }, where: { isHome: true, NOT: { id } } });
    }

    await prisma.page.update({
        where: { id },
        data: {
        title: payload.title,
        slug: payload.slug,
        path,
        isHome: !!payload.isHome,
        published: !!payload.published,
        blocks: payload.blocks,
        },
    });

    revalidatePath('/');
    revalidatePath('/pages');
    revalidatePath('/(site)');
    }

    export async function deletePage(id: string) {
    await prisma.page.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/pages');
    }

    export async function togglePublish(id: string) {
    const page = await prisma.page.findUnique({ where: { id } });
    if (!page) return;
    await prisma.page.update({ where: { id }, data: { published: !page.published } });
    revalidatePath('/');
    revalidatePath('/pages');
    }

    export async function setAsHome(id: string) {
    await prisma.$transaction([
        prisma.page.updateMany({ data: { isHome: false }, where: { isHome: true } }),
        prisma.page.update({ where: { id }, data: { isHome: true, path: '/' } }),
    ]);
    revalidatePath('/');
    revalidatePath('/pages');
    }
