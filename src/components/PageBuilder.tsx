    'use client';

    import { useEffect, useMemo, useState } from 'react';
    import { Block } from './page-builder/types';
    import { BLOCK_TYPES, Editors, emptyBlockFor } from './page-builder/registry';
    import FallbackEditor from './page-builder/editors/FallbackEditor';

    type Props = {
    initial?: Block[];
    onChange?: (blocks: Block[]) => void;
    };

    export default function PageBuilder({ initial, onChange }: Props) {
    const [blocks, setBlocks] = useState<Block[]>(() => initial ?? []);
    const [addType, setAddType] = useState<Block['type']>(BLOCK_TYPES[0]);

    useEffect(() => {
        onChange?.(blocks);
    }, [blocks, onChange]);

    const json = useMemo(() => JSON.stringify(blocks), [blocks]);

    function replaceBlock(index: number, next: Block) {
        setBlocks(prev => {
        const copy = [...prev];
        copy[index] = next;
        return copy;
        });
    }

    function move(index: number, dir: -1 | 1) {
        setBlocks(prev => {
        const next = [...prev];
        const dst = index + dir;
        if (dst < 0 || dst >= next.length) return prev;
        const tmp = next[index];
        next[index] = next[dst];
        next[dst] = tmp;
        return next;
        });
    }

    function remove(index: number) {
        setBlocks(prev => prev.filter((_, i) => i !== index));
    }

    function add() {
        setBlocks(prev => [...prev, emptyBlockFor(addType)]);
    }

    return (
        <div className="space-y-6">
        <input type="hidden" name="blocks" value={json} readOnly />
        <div className="flex items-center gap-3">
            <select
            className="border rounded px-3 py-2"
            value={addType}
            onChange={e => setAddType(e.target.value as Block['type'])}
            >
            {BLOCK_TYPES.map(t => (
                <option key={t} value={t}>
                {t}
                </option>
            ))}
            </select>
            <button
            type="button"
            onClick={add}
            className="px-4 py-2 rounded bg-blue-600 text-white"
            >
            Add block
            </button>
        </div>

        <div className="space-y-4">
            {blocks.map((block, i) => {
            const Editor = Editors[block.type] as
                | React.ComponentType<{ value: any; onChange: (v: any) => void }>
                | undefined;

            return (
                <div key={i} className="border rounded p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm uppercase tracking-wide text-gray-500">{block.type}</div>
                    <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => move(i, -1)}
                        className="px-2 py-1 border rounded"
                    >
                        ↑
                    </button>
                    <button
                        type="button"
                        onClick={() => move(i, 1)}
                        className="px-2 py-1 border rounded"
                    >
                        ↓
                    </button>
                    <button
                        type="button"
                        onClick={() => remove(i)}
                        className="px-2 py-1 border rounded text-red-600"
                    >
                        Remove
                    </button>
                    </div>
                </div>

                {Editor ? (
                    <Editor value={block as any} onChange={b => replaceBlock(i, b as Block)} />
                ) : (
                    <FallbackEditor
                    value={block as any}
                    onChange={b => replaceBlock(i, b as Block)}
                    />
                )}
                </div>
            );
            })}
        </div>
        </div>
    );
    }
