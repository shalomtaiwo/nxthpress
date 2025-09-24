    'use client';

    import { useEffect, useRef, useState } from 'react';

    export default function FallbackEditor({
    value,
    onChange,
    }: {
    value: { type: string; [k: string]: any };
    onChange: (v: { type: string; [k: string]: any }) => void;
    }) {
    const [raw, setRaw] = useState<string>(() => JSON.stringify(value, null, 2));
    const onChangeRef = useRef(onChange);
    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);
    useEffect(() => {
        try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') onChangeRef.current(parsed);
        } catch {}
    }, [raw]);
    return (
        <div className="space-y-2">
        <div className="text-sm text-gray-600">Raw block JSON</div>
        <textarea
            className="w-full border rounded px-3 py-2 min-h-[160px] font-mono text-sm"
            value={raw}
            onChange={e => setRaw(e.target.value)}
        />
        </div>
    );
    }
