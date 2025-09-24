    'use client';

    import { SeoMetaBlock } from '../types';
    import { Field, TextArea } from '../fields';
    import SeoPreviewCard from '../../SeoPreviewCard';

    export default function SeoEditor({
    value,
    onChange,
    }: {
    value: SeoMetaBlock;
    onChange: (v: SeoMetaBlock) => void;
    }) {
    const title = value.title?.trim() || '';
    const description = value.description?.trim() || '';
    const imageUrl = value.image?.trim() || '';

    return (
        <div className="space-y-4">
        <Field
            label="Title"
            value={value.title ?? ''}
            onChange={e => onChange({ ...value, title: e.target.value })}
        />
        <TextArea
            label="Description"
            value={value.description ?? ''}
            onChange={e => onChange({ ...value, description: e.target.value })}
        />
        <Field
            label="Social Image URL"
            value={value.image ?? ''}
            onChange={e => onChange({ ...value, image: e.target.value })}
        />
        <label className="inline-flex items-center gap-2">
            <input
            type="checkbox"
            checked={Boolean(value.noIndex)}
            onChange={e => onChange({ ...value, noIndex: e.target.checked })}
            />
            <span>No index</span>
        </label>

        <div className="rounded border p-4">
            <div className="mb-2 text-sm font-semibold">SEO Preview</div>
            <SeoPreviewCard
            title={title || 'Page title'}
            description={description || 'Your SEO description will appear here. Keep it concise and compelling.'}
            imageUrl={imageUrl}
            />
            <p className="mt-2 text-xs text-gray-500">
            This is a visual approximation. Actual cards are determined by crawlers reading your meta tags at share time.
            </p>
        </div>

        <p className="text-xs text-gray-500">
            This block does not render on the page. It controls the page&apos;s metadata.
        </p>
        </div>
    );
    }
