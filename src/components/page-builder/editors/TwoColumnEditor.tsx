    'use client';

    import { TwoColumnBlock } from '../types';
    import { TextArea, Row } from '../fields';

    export default function TwoColumnEditor({
    value,
    onChange,
    }: {
    value: TwoColumnBlock;
    onChange: (v: TwoColumnBlock) => void;
    }) {
    return (
        <div className="space-y-4">
        <Row>
            <TextArea
            label="Left Markdown"
            value={value.leftMarkdown}
            onChange={(e: { target: { value: any; }; }) => onChange({ ...value, leftMarkdown: e.target.value })}
            />
            <TextArea
            label="Right Markdown"
            value={value.rightMarkdown}
            onChange={(e: { target: { value: any; }; }) => onChange({ ...value, rightMarkdown: e.target.value })}
            />
        </Row>
        <label className="inline-flex items-center gap-2">
            <input
            type="checkbox"
            checked={Boolean(value.reverse)}
            onChange={(e: { target: { checked: any; }; }) => onChange({ ...value, reverse: e.target.checked })}
            />
            <span>Reverse on desktop</span>
        </label>
        </div>
    );
    }
