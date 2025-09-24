    import { FAQBlock } from '../../page-builder/types';

    export default function FAQ({ block, index }: { block: FAQBlock; index: number }) {
    return (
        <section key={index} className="container mx-auto px-4">
        <div className="space-y-3">
            {block.items.map((it, idx) => (
            <details key={idx} className="rounded border p-4">
                <summary className="cursor-pointer font-medium">{it.q}</summary>
                <div className="mt-2 text-gray-700">{it.a}</div>
            </details>
            ))}
        </div>
        </section>
    );
    }
