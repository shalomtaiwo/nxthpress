    'use client';

    import dynamic from 'next/dynamic';
    import { useEffect, useMemo, useState } from 'react';
    import { useFormStatus } from 'react-dom';
    import SeoPreviewCard from './SeoPreviewCard';

    const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

    function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} className="rounded bg-black px-4 py-2 text-white disabled:opacity-60">
        {pending ? 'Saving…' : label}
        </button>
    );
    }

    type Props = {
    defaultValues?: {
        title?: string;
        slug?: string;
        excerpt?: string;
        contentMD?: string;
        tags?: string[];
        published?: boolean;
        coverImageUrl?: string;
        seoTitle?: string;
        seoDescription?: string;
        seoImageUrl?: string;
    };
    formAction: (formData: FormData) => Promise<any>;
    submitLabel: string;
    };

    export default function PostForm({ defaultValues, formAction, submitLabel }: Props) {
    const [content, setContent] = useState(defaultValues?.contentMD ?? '');

    const [title, setTitle] = useState(defaultValues?.title ?? '');
    const [excerpt, setExcerpt] = useState(defaultValues?.excerpt ?? '');

    const [seoTitle, setSeoTitle] = useState(defaultValues?.seoTitle ?? '');
    const [seoDescription, setSeoDescription] = useState(defaultValues?.seoDescription ?? '');
    const [seoImageUrl, setSeoImageUrl] = useState(defaultValues?.seoImageUrl ?? '');

    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [seoFile, setSeoFile] = useState<File | null>(null);

    const coverPreview = useObjectUrl(coverFile);
    const seoPreview = useObjectUrl(seoFile);

    const effectiveTitle = seoTitle || title;
    const effectiveDesc = seoDescription || excerpt;
    const effectiveImage = useMemo(() => {
        if (seoPreview) return seoPreview;
        if (seoImageUrl) return seoImageUrl;
        if (defaultValues?.coverImageUrl) return defaultValues.coverImageUrl;
        if (coverPreview) return coverPreview;
        return '';
    }, [seoPreview, seoImageUrl, defaultValues?.coverImageUrl, coverPreview]);

    async function onSubmit(formData: FormData) {
        if (coverFile) formData.set('cover', coverFile);
        if (seoFile) formData.set('seoImage', seoFile);
        await formAction(formData);
    }

    return (
        <form action={onSubmit} className="space-y-4">
        <div className="grid gap-2">
            <label className="font-medium">Title</label>
            <input
            name="title"
            defaultValue={defaultValues?.title}
            onChange={e => setTitle(e.target.value)}
            className="rounded border px-3 py-2"
            required
            />
        </div>

        <div className="grid gap-2">
            <label className="font-medium">Slug</label>
            <input name="slug" defaultValue={defaultValues?.slug} className="rounded border px-3 py-2" required />
        </div>

        <div className="grid gap-2">
            <label className="font-medium">Excerpt</label>
            <textarea
            name="excerpt"
            defaultValue={defaultValues?.excerpt ?? ''}
            onChange={e => setExcerpt(e.target.value)}
            rows={2}
            className="rounded border px-3 py-2"
            />
        </div>

        <div className="grid gap-2">
            <label className="font-medium">Cover Image</label>
            <input
            type="file"
            name="cover"
            accept="image/*"
            className="block"
            onChange={e => setCoverFile(e.target.files?.[0] ?? null)}
            />
        </div>

        <div data-color-mode="light" className="grid gap-2">
            <label className="font-medium">Content (Markdown)</label>
            <MDEditor value={content} onChange={v => setContent(v ?? '')} height={400} />
            <input type="hidden" name="contentMD" value={content} />
        </div>

        <div className="grid gap-2">
            <label className="font-medium">Tags (comma separated)</label>
            <input name="tags" defaultValue={defaultValues?.tags?.join(', ') ?? ''} className="rounded border px-3 py-2" />
        </div>

        <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="published" defaultChecked={!!defaultValues?.published} />
            <span>Published</span>
        </label>

        <div className="rounded border p-4">
            <div className="mb-2 text-sm font-semibold">SEO</div>

            <div className="grid gap-3 md:grid-cols-2">
            <div className="grid gap-2">
                <label className="font-medium">SEO Title</label>
                <input
                name="seoTitle"
                defaultValue={defaultValues?.seoTitle ?? ''}
                onChange={e => setSeoTitle(e.target.value)}
                className="rounded border px-3 py-2"
                placeholder="Overrides post title"
                />
            </div>

            <div className="grid gap-2">
                <label className="font-medium">SEO Image (upload)</label>
                <input
                type="file"
                name="seoImage"
                accept="image/*"
                className="block"
                onChange={e => setSeoFile(e.target.files?.[0] ?? null)}
                />
            </div>
            </div>

            <div className="grid gap-2 mt-3">
            <label className="font-medium">SEO Description</label>
            <textarea
                name="seoDescription"
                defaultValue={defaultValues?.seoDescription ?? ''}
                onChange={e => setSeoDescription(e.target.value)}
                rows={3}
                className="rounded border px-3 py-2"
                placeholder="Overrides excerpt"
            />
            </div>

            <div className="grid gap-2 mt-3">
            <label className="font-medium">SEO Image URL (optional, used if no upload)</label>
            <input
                name="seoImageUrl"
                defaultValue={defaultValues?.seoImageUrl ?? ''}
                onChange={e => setSeoImageUrl(e.target.value)}
                className="rounded border px-3 py-2"
                placeholder="https://…"
            />
            </div>

            <div className="mt-4">
            <SeoPreviewCard
                title={effectiveTitle}
                description={effectiveDesc}
                imageUrl={effectiveImage}
            />
            </div>

            <p className="mt-2 text-xs text-gray-500">
            If both an SEO image upload and a URL are provided, the uploaded image will be used on save.
            </p>
        </div>

        <SubmitButton label={submitLabel} />
        </form>
    );
    }

    function useObjectUrl(file: File | null) {
    const [url, setUrl] = useState<string | null>(null);
    useEffect(() => {
        if (!file) {
        setUrl(null);
        return;
        }
        const u = URL.createObjectURL(file);
        setUrl(u);
        return () => URL.revokeObjectURL(u);
    }, [file]);
    return url || '';
    }
