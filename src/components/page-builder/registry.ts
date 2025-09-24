    'use client';

    import type {
    Block,
    CTABannerBlock,
    FAQBlock,
    FeatureGridBlock,
    TestimonialBlock,
    TwoColumnBlock,
    VideoEmbedBlock,
    SeoMetaBlock,
    } from './types';
    import FeatureGridEditor from './editors/FeatureGridEditor';
    import TwoColumnEditor from './editors/TwoColumnEditor';
    import TestimonialEditor from './editors/TestimonialEditor';
    import FAQEditor from './editors/FAQEditor';
    import CTAEditor from './editors/CTAEditor';
    import VideoEditor from './editors/VideoEditor';
    import SeoEditor from './editors/SeoEditor';

    export const BLOCK_TYPES: Block['type'][] = [
    'featureGrid',
    'twoColumn',
    'testimonial',
    'faq',
    'cta',
    'video',
    'seo',
    ];

    export function emptyBlockFor(type: Block['type']): Block {
    switch (type) {
        case 'featureGrid':
        return { type: 'featureGrid', items: [{ title: '' }], columns: 3 } as FeatureGridBlock;
        case 'twoColumn':
        return { type: 'twoColumn', leftMarkdown: '', rightMarkdown: '' } as TwoColumnBlock;
        case 'testimonial':
        return { type: 'testimonial', quote: '' } as TestimonialBlock;
        case 'faq':
        return { type: 'faq', items: [{ q: '', a: '' }] } as FAQBlock;
        case 'cta':
        return {
            type: 'cta',
            heading: '',
            subheading: '',
            ctaLabel: 'Learn more',
            ctaHref: '#',
        } as CTABannerBlock;
        case 'video':
        return { type: 'video', provider: 'youtube', idOrUrl: '' } as VideoEmbedBlock;
        case 'seo':
        return { type: 'seo', title: '', description: '', image: '', noIndex: false } as SeoMetaBlock;
        default:
        return { type, value: '' } as any;
    }
    }

    export const Editors: Record<
    string,
    React.ComponentType<{ value: any; onChange: (v: any) => void }>
    > = {
    featureGrid: FeatureGridEditor,
    twoColumn: TwoColumnEditor,
    testimonial: TestimonialEditor,
    faq: FAQEditor,
    cta: CTAEditor,
    video: VideoEditor,
    seo: SeoEditor,
    };
