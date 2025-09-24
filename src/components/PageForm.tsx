    'use client';

    import { useState } from 'react';
    import PageBuilder from '@/components/PageBuilder';

    type Defaults = {
    title?: string;
    slug?: string;
    isHome?: boolean;
    published?: boolean;
    blocks?: any[];
    };

    export default function PageForm({
    defaultValues,
    formAction,
    submitLabel,
    }: {
    defaultValues?: Defaults;
    formAction: (formData: FormData) => Promise<any>;
    submitLabel: string;
    }) {
    const [json, setJson] = useState<string>(JSON.stringify(defaultValues?.blocks ?? []));

    return (
        <form action={formAction} className="space-y-4">
        <div className="grid gap-2">
            <label className="font-medium">Title</label>
            <input name="title" defaultValue={defaultValues?.title ?? ''} className="rounded border px-3 py-2" required />
        </div>

        <div className="grid gap-2">
            <label className="font-medium">Slug</label>
            <input name="slug" defaultValue={defaultValues?.slug ?? ''} placeholder="about" className="rounded border px-3 py-2" required />
        </div>

        <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="isHome" defaultChecked={!!defaultValues?.isHome} />
            <span>Set as Homepage</span>
        </label>

        <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="published" defaultChecked={defaultValues?.published ?? true} />
            <span>Published</span>
        </label>

        <div className="grid gap-2">
            <label className="font-medium">Blocks</label>
            <PageBuilder
            initial={defaultValues?.blocks ?? []}
            onChange={(blocks) => {
                setJson(JSON.stringify(blocks));
            }}
            />
            <input type="hidden" name="blocks" value={json} />
        </div>

        <button className="rounded bg-black px-4 py-2 text-white">{submitLabel}</button>
        </form>
    );
    }
