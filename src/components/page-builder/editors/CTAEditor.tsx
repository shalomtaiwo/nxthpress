    'use client';

    import { CTABannerBlock } from '../types';
    import { Field, Row, TextArea } from '../fields';

    export default function CTAEditor({
    value,
    onChange,
    }: {
    value: CTABannerBlock;
    onChange: (v: CTABannerBlock) => void;
    }) {
    return (
        <div className="space-y-4">
        <Field
            label="Heading"
            value={value.heading}
            onChange={(e: { target: { value: any; }; }) => onChange({ ...value, heading: e.target.value })}
        />
        <TextArea
            label="Subheading"
            value={value.subheading ?? ''}
            onChange={(e: { target: { value: any; }; }) => onChange({ ...value, subheading: e.target.value })}
        />
        <Row>
            <Field
            label="CTA Label"
            value={value.ctaLabel}
            onChange={(e: { target: { value: any; }; }) => onChange({ ...value, ctaLabel: e.target.value })}
            />
            <Field
            label="CTA Href"
            value={value.ctaHref}
            onChange={(e: { target: { value: any; }; }) => onChange({ ...value, ctaHref: e.target.value })}
            />
        </Row>
        </div>
    );
    }
