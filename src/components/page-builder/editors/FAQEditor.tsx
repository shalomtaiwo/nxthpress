    'use client';

    import { FAQBlock } from '../types';
    import { Field, TextArea } from '../fields';

    export default function FAQEditor({ value, onChange }: { value: FAQBlock; onChange: (v: FAQBlock) => void }) {
    function updateItem(idx: number, patch: Partial<FAQBlock['items'][number]>) {
        const items = value.items.map((it, i) => (i === idx ? { ...it, ...patch } : it));
        onChange({ ...value, items });
    }
    function addItem() {
        onChange({ ...value, items: [...value.items, { q: '', a: '' }] });
    }
    function removeItem(idx: number) {
        onChange({ ...value, items: value.items.filter((_, i) => i !== idx) });
    }
    return (
        <div className="space-y-4">
        <div className="space-y-3">
            {value.items.map((it, idx) => (
            <div key={idx} className="rounded border p-3 space-y-3">
                <Field
                label="Question"
                value={it.q}
                onChange={(e: { target: { value: any; }; }) => updateItem(idx, { q: e.target.value })}
                />
                <TextArea
                label="Answer"
                value={it.a}
                onChange={(e: { target: { value: any; }; }) => updateItem(idx, { a: e.target.value })}
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
