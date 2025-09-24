    import { CTABannerBlock } from '../../page-builder/types';

    export default function CTA({ block, index }: { block: CTABannerBlock; index: number }) {
    return (
        <section key={index} className="container mx-auto px-4">
        <div className="rounded border p-8 text-center space-y-3">
            <h2 className="text-2xl font-semibold">{block.heading}</h2>
            {block.subheading && <p className="text-gray-700">{block.subheading}</p>}
            <div>
            <a href={block.ctaHref} className="inline-block px-5 py-2 rounded bg-blue-600 text-white">
                {block.ctaLabel}
            </a>
            </div>
        </div>
        </section>
    );
    }
