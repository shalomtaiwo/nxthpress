    export type FeatureGridBlock = {
    type: 'featureGrid';
    items: { icon?: string; title: string; text?: string }[];
    columns?: 2 | 3 | 4;
    };

    export type TwoColumnBlock = {
    type: 'twoColumn';
    leftMarkdown: string;
    rightMarkdown: string;
    reverse?: boolean;
    };

    export type TestimonialBlock = {
    type: 'testimonial';
    quote: string;
    author?: string;
    role?: string;
    avatarUrl?: string;
    };

    export type FAQBlock = {
    type: 'faq';
    items: { q: string; a: string }[];
    };

    export type CTABannerBlock = {
    type: 'cta';
    heading: string;
    subheading?: string;
    ctaLabel: string;
    ctaHref: string;
    };

    export type VideoEmbedBlock = {
    type: 'video';
    provider: 'youtube' | 'vimeo' | 'url';
    idOrUrl: string;
    title?: string;
    };

    export type SeoMetaBlock = {
    type: 'seo';
    title?: string;
    description?: string;
    image?: string;
    noIndex?: boolean;
    };

    export type Block =
    | FeatureGridBlock
    | TwoColumnBlock
    | TestimonialBlock
    | FAQBlock
    | CTABannerBlock
    | VideoEmbedBlock
    | SeoMetaBlock
    | ({ type: string } & Record<string, any>);
