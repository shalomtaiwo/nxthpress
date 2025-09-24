    import { VideoEmbedBlock } from '../../page-builder/types';
    import { videoSrc } from '../utils/video';

    export default function Video({ block, index }: { block: VideoEmbedBlock; index: number }) {
    const src = videoSrc(block);
    return (
        <section key={index} className="container mx-auto px-4">
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
            src={src}
            title={block.title ?? 'Video'}
            className="absolute inset-0 w-full h-full rounded border"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            />
        </div>
        </section>
    );
    }
