    import React from 'react';
    import type {
    Block,
    CTABannerBlock,
    FAQBlock,
    FeatureGridBlock,
    TestimonialBlock,
    TwoColumnBlock,
    VideoEmbedBlock,
    } from '../page-builder/types';

    import FeatureGrid from './blocks/FeatureGrid';
    import TwoColumn from './blocks/TwoColumn';
    import Testimonial from './blocks/Testimonial';
    import FAQ from './blocks/FAQ';
    import CTA from './blocks/CTA';
    import Video from './blocks/Video';

    export type Renderable = React.FC<{ block: Block; index: number }>;

    export const RENDERERS: Partial<Record<Block['type'], Renderable>> = {
    featureGrid: ({ block, index }) => (
        <FeatureGrid block={block as FeatureGridBlock} index={index} />
    ),
    twoColumn: ({ block, index }) => (
        <TwoColumn block={block as TwoColumnBlock} index={index} />
    ),
    testimonial: ({ block, index }) => (
        <Testimonial block={block as TestimonialBlock} index={index} />
    ),
    faq: ({ block, index }) => <FAQ block={block as FAQBlock} index={index} />,
    cta: ({ block, index }) => <CTA block={block as CTABannerBlock} index={index} />,
    video: ({ block, index }) => <Video block={block as VideoEmbedBlock} index={index} />,
    };
