    'use client';

    import { TestimonialBlock } from '../types';
    import { Field, Row, TextArea } from '../fields';

    export default function TestimonialEditor({
    value,
    onChange,
    }: {
    value: TestimonialBlock;
    onChange: (v: TestimonialBlock) => void;
    }) {
    return (
        <div className="space-y-4">
        <TextArea
            label="Quote"
            value={value.quote}
            onChange={(e: { target: { value: any; }; }) => onChange({ ...value, quote: e.target.value })}
        />
        <Row>
            <Field
            label="Author"
            value={value.author ?? ''}
            onChange={(e: { target: { value: any; }; }) => onChange({ ...value, author: e.target.value })}
            />
            <Field
            label="Role"
            value={value.role ?? ''}
            onChange={(e: { target: { value: any; }; }) => onChange({ ...value, role: e.target.value })}
            />
        </Row>
        <Field
            label="Avatar URL"
            value={value.avatarUrl ?? ''}
            onChange={(e: { target: { value: any; }; }) => onChange({ ...value, avatarUrl: e.target.value })}
        />
        </div>
    );
    }
