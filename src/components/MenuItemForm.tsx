    'use client';

    type Defaults = {
    label?: string;
    href?: string;
    location?: 'SITE' | 'ADMIN';
    order?: number;
    visible?: boolean;
    };

    export default function MenuItemForm({
    defaultValues,
    formAction,
    submitLabel,
    }: {
    defaultValues?: Defaults;
    formAction: (formData: FormData) => Promise<any>;
    submitLabel: string;
    }) {
    return (
        <form action={formAction} className="space-y-4">
        <div className="grid gap-2">
            <label className="font-medium">Label</label>
            <input name="label" defaultValue={defaultValues?.label} className="rounded border px-3 py-2" required />
        </div>

        <div className="grid gap-2">
            <label className="font-medium">Href</label>
            <input name="href" defaultValue={defaultValues?.href} className="rounded border px-3 py-2" placeholder="/about" required />
        </div>

        <div className="grid gap-2">
            <label className="font-medium">Location</label>
            <select name="location" defaultValue={defaultValues?.location ?? 'SITE'} className="rounded border px-3 py-2">
            <option value="SITE">Site</option>
            <option value="ADMIN">Admin</option>
            </select>
        </div>

        <div className="grid gap-2">
            <label className="font-medium">Order</label>
            <input type="number" name="order" defaultValue={defaultValues?.order ?? 0} className="rounded border px-3 py-2" />
        </div>

        <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="visible" defaultChecked={defaultValues?.visible ?? true} />
            <span>Visible</span>
        </label>

        <button className="rounded bg-black px-4 py-2 text-white">{submitLabel}</button>
        </form>
    );
    }
