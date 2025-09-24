    'use client';

    import { FeatureGridBlock } from '../types';
    import { Field, Row, TextArea } from '../fields';

    export default function FeatureGridEditor({
    value,
    onChange,
    }: {
    value: FeatureGridBlock;
    onChange: (v: FeatureGridBlock) => void;
    }) {
    function updateItem(idx: number, patch: Partial<FeatureGridBlock['items'][number]>) {
        const items = value.items.map((it, i) => (i === idx ? { ...it, ...patch } : it));
        onChange({ ...value, items });
    }
    function addItem() {
        onChange({ ...value, items: [...value.items, { title: '' }] });
    }
    function removeItem(idx: number) {
        onChange({ ...value, items: value.items.filter((_, i) => i !== idx) });
    }

    return (
        <div className="space-y-4">
        <label className="block space-y-1">
            <span className="text-sm text-gray-600">Columns</span>
            <select
            className="border rounded px-3 py-2"
            value={value.columns ?? 3}
            onChange={e => onChange({ ...value, columns: Number(e.target.value) as 2 | 3 | 4 })}
            >
            {[2, 3, 4].map(c => (
                <option key={c} value={c}>
                {c}
                </option>
            ))}
            </select>
        </label>

        <div className="space-y-3">
            {value.items.map((it, idx) => (
            <div key={idx} className="rounded border p-3 space-y-3">
                <Row>
                <Field
                    label="Icon (emoji or class)"
                    value={it.icon ?? ''}
                    onChange={(e: { target: { value: any; }; }) => updateItem(idx, { icon: e.target.value })}
                />
                <Field
                    label="Title"
                    value={it.title}
                    onChange={(e: { target: { value: any; }; }) => updateItem(idx, { title: e.target.value })}
                />
                </Row>
                <TextArea
                label="Text"
                value={it.text ?? ''}
                onChange={(e: { target: { value: any; }; }) => updateItem(idx, { text: e.target.value })}
                />
                <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() => removeItem(idx)}
                    className="px-3 py-1 border rounded text-red-600"
                >
                    Remove item
                </button>
                </div>
            </div>
            ))}
        </div>

        <button type="button" onClick={addItem} className="px-4 py-2 rounded border">
            Add item
        </button>
        </div>
    );
    }
