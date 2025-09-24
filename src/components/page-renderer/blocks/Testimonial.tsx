    import { TestimonialBlock } from '../../page-builder/types';

    export default function Testimonial({ block, index }: { block: TestimonialBlock; index: number }) {
    return (
        <section key={index} className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded border p-8 text-center space-y-6">
            <p className="text-2xl leading-relaxed">“{block.quote}”</p>
            <div className="flex items-center justify-center gap-4">
            {block.avatarUrl && (
                <img
                src={block.avatarUrl}
                alt={block.author ?? 'Avatar'}
                className="h-12 w-12 rounded-full object-cover"
                />
            )}
            <div className="text-sm">
                {block.author && <div className="font-medium">{block.author}</div>}
                {block.role && <div className="text-gray-600">{block.role}</div>}
            </div>
            </div>
        </div>
        </section>
    );
    }
