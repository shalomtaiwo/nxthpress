    'use client';

    import { VideoEmbedBlock } from '../types';
    import { Field } from '../fields';

    export default function VideoEditor({
    value,
    onChange,
    }: {
    value: VideoEmbedBlock;
    onChange: (v: VideoEmbedBlock) => void;
    }) {
    return (
        <div className="space-y-4">
        <label className="block space-y-1">
            <span className="text-sm text-gray-600">Provider</span>
            <select
            className="border rounded px-3 py-2"
            value={value.provider}
            onChange={e =>
                onChange({ ...value, provider: e.target.value as VideoEmbedBlock['provider'] })
            }
            >
            <option value="youtube">youtube</option>
            <option value="vimeo">vimeo</option>
            <option value="url">url</option>
            </select>
        </label>
        <Field
            label="ID or URL"
            value={value.idOrUrl}
            onChange={(e: { target: { value: any; }; }) => onChange({ ...value, idOrUrl: e.target.value })}
        />
        <Field
            label="Title"
            value={value.title ?? ''}
            onChange={(e: { target: { value: any; }; }) => onChange({ ...value, title: e.target.value })}
        />
        </div>
    );
    }
