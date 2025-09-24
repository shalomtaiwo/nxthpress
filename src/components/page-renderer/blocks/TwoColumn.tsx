    import { TwoColumnBlock } from '../../page-builder/types';
    import { mdToHtml } from '../utils/markdown';

    export default function TwoColumn({ block, index }: { block: TwoColumnBlock; index: number }) {
    return (
        <section key={index} className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${block.reverse ? 'md:[&>div:first-child]:order-2' : ''}`}>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: mdToHtml(block.leftMarkdown) }} />
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: mdToHtml(block.rightMarkdown) }} />
        </div>
        </section>
    );
    }
