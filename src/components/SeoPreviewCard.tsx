    'use client';

    import { useState } from 'react';

    type Props = {
    title?: string;
    description?: string;
    imageUrl?: string;
    };

    export default function SeoPreviewCard({ title, description, imageUrl }: Props) {
    const [tab, setTab] = useState<'og' | 'twitter'>('og');

    const t = title?.trim() || 'Post title';
    const d =
        description?.trim() ||
        'Your SEO description will appear here. Keep it concise and compelling.';
    const img = imageUrl?.trim() || '';

    return (
        <div className="rounded border">
        <div className="flex items-center gap-1 border-b bg-gray-50 px-2 py-1 text-sm">
            <button
            type="button"
            onClick={() => setTab('og')}
            className={`rounded px-2 py-1 ${tab === 'og' ? 'bg-white border' : ''}`}
            aria-pressed={tab === 'og'}
            >
            Open Graph
            </button>
            <button
            type="button"
            onClick={() => setTab('twitter')}
            className={`rounded px-2 py-1 ${tab === 'twitter' ? 'bg-white border' : ''}`}
            aria-pressed={tab === 'twitter'}
            >
            Twitter
            </button>
        </div>

        <div className="grid gap-3 p-4 md:grid-cols-[320px_1fr]">
            <div className="rounded border bg-white">
            {img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img} alt="" className="aspect-video w-full rounded-t object-cover" />
            ) : (
                <div className="aspect-video w-full rounded-t bg-gray-100" />
            )}
            <div className="space-y-1 p-3">
                <div className="text-xs uppercase tracking-wide text-gray-500">
                {tab === 'og' ? 'example.com' : 'twitter.com'}
                </div>
                <div className="line-clamp-2 font-semibold">{t}</div>
                <div className="line-clamp-2 text-sm text-gray-700">{d}</div>
            </div>
            </div>

            <div className="text-sm text-gray-600">
            <div className="mb-2 font-medium">Preview details</div>
            <ul className="list-inside list-disc space-y-1">
                <li>
                Title: <span className="font-medium">{t}</span>
                </li>
                <li>
                Description:{' '}
                <span className="font-medium">{d.length > 0 ? d : '(empty)'}</span>
                </li>
                <li>
                Image:{' '}
                <span className="font-medium">
                    {img ? img : '(none)'}
                </span>
                </li>
            </ul>
            <p className="mt-3 text-xs">
                This is a visual approximation. Actual cards are determined by crawlers reading your
                meta tags at share time.
            </p>
            </div>
        </div>
        </div>
    );
    }
