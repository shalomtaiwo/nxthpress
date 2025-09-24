    'use client';

import { JSX } from "react/jsx-runtime";

    export function Field({
    label,
    ...props
    }: Omit<JSX.IntrinsicElements['input'], 'className'> & { label: string }) {
    return (
        <label className="block space-y-1">
        <span className="text-sm text-gray-600">{label}</span>
        <input {...props} className="w-full border rounded px-3 py-2" />
        </label>
    );
    }

    export function TextArea({
    label,
    ...props
    }: Omit<JSX.IntrinsicElements['textarea'], 'className'> & { label: string }) {
    return (
        <label className="block space-y-1">
        <span className="text-sm text-gray-600">{label}</span>
        <textarea {...props} className="w-full border rounded px-3 py-2 min-h-[100px]" />
        </label>
    );
    }

    export function Row({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
    }
