    import React from 'react';
    import { Block } from './page-builder/types';
    import { RENDERERS } from './page-renderer/registry';

    type Props = {
    blocks: Block[];
    };

    export default async function PageRenderer({ blocks }: Props) {
    return (
        <div className="space-y-12">
        {blocks?.map((block, i) => {
            const Renderer = RENDERERS[block.type];
            if (!Renderer) return null;
            return <Renderer key={i} block={block as any} index={i} />;
        })}
        </div>
    );
    }
    // Note: 'as any' is used to bypass TypeScript issues with dynamic component rendering.