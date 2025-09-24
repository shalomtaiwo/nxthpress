    import { VideoEmbedBlock } from '../../page-builder/types';

    export function videoSrc(b: VideoEmbedBlock) {
    if (b.provider === 'url') return b.idOrUrl;
    if (b.provider === 'youtube') {
        const idMatch = b.idOrUrl.match(/^[\w-]{6,}$/) ? b.idOrUrl : b.idOrUrl.split('v=')[1]?.split('&')[0];
        const id = idMatch || b.idOrUrl;
        return `https://www.youtube.com/embed/${id}`;
    }
    if (b.provider === 'vimeo') {
        const idMatch = b.idOrUrl.match(/^\d+$/) ? b.idOrUrl : b.idOrUrl.split('/').filter(Boolean).pop();
        const id = idMatch || b.idOrUrl;
        return `https://player.vimeo.com/video/${id}`;
    }
    return b.idOrUrl;
    }

    export function gridCols(cols?: 2 | 3 | 4) {
    switch (cols) {
        case 2:
        return 'grid-cols-1 md:grid-cols-2';
        case 4:
        return 'grid-cols-1 md:grid-cols-4';
        default:
        return 'grid-cols-1 md:grid-cols-3';
    }
    }
