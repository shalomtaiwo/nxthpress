    import { prisma } from '@/lib/prisma';
    import MenuItemForm from '@/components/MenuItemForm';
    import { updateMenuItem } from '../actions';
    import { notFound } from 'next/navigation';

    export default async function EditMenuItemPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await prisma.menuItem.findUnique({ where: { id } });
    if (!item) return notFound();

    return (
        <div className="prose">
        <h1>Edit Menu Item</h1>
        <MenuItemForm
            defaultValues={{
            label: item.label,
            href: item.href,
            location: item.location as any,
            order: item.order,
            visible: item.visible,
            }}
            formAction={updateMenuItem.bind(null, item.id)}
            submitLabel="Update"
        />
        </div>
    );
    }
