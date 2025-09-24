    'use server';

    import { prisma } from '@/lib/prisma';
    import { revalidatePath } from 'next/cache';
    import { z } from 'zod';

    const MenuItemInput = z.object({
    label: z.string().min(1),
    href: z.string().min(1),
    location: z.enum(['SITE', 'ADMIN']),
    order: z.coerce.number().int().default(0),
    visible: z.boolean().optional(),
    });

    export async function createMenuItem(formData: FormData) {
    const payload = MenuItemInput.parse({
        label: formData.get('label'),
        href: formData.get('href'),
        location: formData.get('location'),
        order: formData.get('order'),
        visible: formData.get('visible') === 'on',
    });

    await prisma.menuItem.create({
        data: {
        label: payload.label,
        href: payload.href,
        location: payload.location as any,
        order: payload.order ?? 0,
        visible: payload.visible ?? true,
        },
    });

    revalidatePath('/');
    revalidatePath('/admin/menu');
    }

    export async function updateMenuItem(id: string, formData: FormData) {
    const payload = MenuItemInput.parse({
        label: formData.get('label'),
        href: formData.get('href'),
        location: formData.get('location'),
        order: formData.get('order'),
        visible: formData.get('visible') === 'on',
    });

    await prisma.menuItem.update({
        where: { id },
        data: {
        label: payload.label,
        href: payload.href,
        location: payload.location as any,
        order: payload.order ?? 0,
        visible: payload.visible ?? true,
        },
    });

    revalidatePath('/');
    revalidatePath('/admin/menu');
    }

    export async function deleteMenuItem(id: string) {
    await prisma.menuItem.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/admin/menu');
    }

    export async function toggleMenuVisibility(id: string) {
    const item = await prisma.menuItem.findUnique({ where: { id } });
    if (!item) return;
    await prisma.menuItem.update({
        where: { id },
        data: { visible: !item.visible },
    });
    revalidatePath('/');
    revalidatePath('/admin/menu');
    }
