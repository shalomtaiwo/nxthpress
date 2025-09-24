    import { FeatureGridBlock } from '../../page-builder/types';
    import { gridCols } from '../utils/video';

    export default function FeatureGrid({ block, index }: { block: FeatureGridBlock; index: number }) {
    return (
        <section key={index} className="container mx-auto px-4">
        <div className={`grid gap-6 ${gridCols(block.columns)}`}>
            {block.items.map((it, idx) => (
            <div key={idx} className="rounded border p-6">
                <div className="space-y-2">
                {it.icon && <div className="text-3xl">{it.icon}</div>}
                <h3 className="text-lg font-semibold">{it.title}</h3>
                {it.text && <p className="text-gray-700">{it.text}</p>}
                </div>
            </div>
            ))}
        </div>
        </section>
    );
    }
