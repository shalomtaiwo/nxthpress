    'use server';

    import { prisma } from '@/lib/prisma';
    import { uploadImageFromBuffer } from '@/lib/cloudinary';
    import { revalidatePath } from 'next/cache';
    import { z } from 'zod';

    const PostInput = z.object({
    title: z.string().min(3),
    slug: z.string().min(3),
    excerpt: z.string().optional(),
    contentMD: z.string().min(1),
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    seoImageUrl: z.string().optional(),
    });

    export async function createPost(formData: FormData) {
    const payload = PostInput.parse({
        title: formData.get('title'),
        slug: formData.get('slug'),
        excerpt: formData.get('excerpt') ?? undefined,
        contentMD: formData.get('contentMD'),
        tags:
        (formData.get('tags') as string)
            ?.split(',')
            .map(t => t.trim())
            .filter(Boolean) ?? [],
        published: formData.get('published') === 'on',
        seoTitle: formData.get('seoTitle') ? String(formData.get('seoTitle')) : undefined,
        seoDescription: formData.get('seoDescription') ? String(formData.get('seoDescription')) : undefined,
        seoImageUrl: formData.get('seoImageUrl') ? String(formData.get('seoImageUrl')) : undefined,
    });

    let coverImageUrl: string | undefined;
    const coverFile = formData.get('cover') as File | null;
    if (coverFile && coverFile.size > 0) {
        const bytes = await coverFile.arrayBuffer();
        const buf = Buffer.from(bytes);
        const res = await uploadImageFromBuffer(buf, payload.slug);
        coverImageUrl = res.secure_url;
    }

    let seoImageUrl: string | undefined = payload.seoImageUrl || undefined;
    const seoFile = formData.get('seoImage') as File | null;
    if (seoFile && seoFile.size > 0) {
        const bytes = await seoFile.arrayBuffer();
        const buf = Buffer.from(bytes);
        const res = await uploadImageFromBuffer(buf, `${payload.slug}-seo`);
        seoImageUrl = res.secure_url;
    }

    const tagIds: string[] = [];
    for (const name of payload.tags ?? []) {
        const tag = await prisma.tag.upsert({
        where: { name },
        create: { name },
        update: {},
        select: { id: true },
        });
        tagIds.push(tag.id);
    }

    await prisma.post.create({
        data: {
        title: payload.title,
        slug: payload.slug,
        excerpt: payload.excerpt,
        contentMD: payload.contentMD,
        coverImageUrl,
        published: payload.published ?? false,
        seoTitle: payload.seoTitle || null,
        seoDescription: payload.seoDescription || null,
        seoImageUrl: seoImageUrl || null,
        tags: { create: tagIds.map(tagId => ({ tagId })) },
        },
    });

    revalidatePath('/blog');
    revalidatePath('/admin/posts');
    revalidatePath(`/blog/${payload.slug}`);
    }

    export async function updatePost(id: string, formData: FormData) {
    const payload = PostInput.parse({
        title: formData.get('title'),
        slug: formData.get('slug'),
        excerpt: formData.get('excerpt') ?? undefined,
        contentMD: formData.get('contentMD'),
        tags:
        (formData.get('tags') as string)
            ?.split(',')
            .map(t => t.trim())
            .filter(Boolean) ?? [],
        published: formData.get('published') === 'on',
        seoTitle: formData.get('seoTitle') ? String(formData.get('seoTitle')) : undefined,
        seoDescription: formData.get('seoDescription') ? String(formData.get('seoDescription')) : undefined,
        seoImageUrl: formData.get('seoImageUrl') ? String(formData.get('seoImageUrl')) : undefined,
    });

    let coverImageUrl: string | undefined;
    const coverFile = formData.get('cover') as File | null;
    if (coverFile && coverFile.size > 0) {
        const bytes = await coverFile.arrayBuffer();
        const buf = Buffer.from(bytes);
        const res = await uploadImageFromBuffer(buf, payload.slug);
        coverImageUrl = res.secure_url;
    }

    let seoImageUrl: string | undefined = payload.seoImageUrl || undefined;
    const seoFile = formData.get('seoImage') as File | null;
    if (seoFile && seoFile.size > 0) {
        const bytes = await seoFile.arrayBuffer();
        const buf = Buffer.from(bytes);
        const res = await uploadImageFromBuffer(buf, `${payload.slug}-seo`);
        seoImageUrl = res.secure_url;
    }

    const current = await prisma.tagOnPost.findMany({ where: { postId: id } });
    const wantedNames = new Set(payload.tags ?? []);
    const wantedIds: string[] = [];
    for (const name of wantedNames) {
        const tag = await prisma.tag.upsert({
        where: { name },
        create: { name },
        update: {},
        select: { id: true },
        });
        wantedIds.push(tag.id);
    }

    await prisma.$transaction([
        prisma.tagOnPost.deleteMany({ where: { postId: id, NOT: { tagId: { in: wantedIds } } } }),
        prisma.tagOnPost.createMany({
        data: wantedIds
            .filter(tid => !current.some(c => c.tagId === tid))
            .map(tagId => ({ postId: id, tagId })),
        skipDuplicates: true,
        }),
        prisma.post.update({
        where: { id },
        data: {
            title: payload.title,
            slug: payload.slug,
            excerpt: payload.excerpt,
            contentMD: payload.contentMD,
            coverImageUrl: coverImageUrl ?? undefined,
            published: payload.published ?? false,
            seoTitle: payload.seoTitle || null,
            seoDescription: payload.seoDescription || null,
            seoImageUrl: seoImageUrl || null,
        },
        }),
    ]);

    revalidatePath('/blog');
    revalidatePath('/admin/posts');
    revalidatePath(`/blog/${payload.slug}`);
    }

    export async function deletePostByFormData(formData: FormData) {
    const id = String(formData.get('id') ?? '');
    if (!id) return;
    const prev = await prisma.post.findUnique({ where: { id }, select: { slug: true } });
    await prisma.post.delete({ where: { id } });
    revalidatePath('/blog');
    revalidatePath('/admin/posts');
    if (prev?.slug) revalidatePath(`/blog/${prev.slug}`);
    }
