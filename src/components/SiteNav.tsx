'use client';

import Link from 'next/link';
import { useState } from 'react';
import NavLink from './NavLink';
import { useSession, signIn, signOut } from 'next-auth/react';

type Item = { label: string; href: string };

export default function SiteNav({ items }: { items: Item[] }) {
    const [open, setOpen] = useState(false);
    const { data: session, status } = useSession();

    return (
        <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link href="/" className="text-base font-semibold">NxthPress</Link>

                <button aria-label="Toggle menu" className="lg:hidden rounded border px-3 py-2" onClick={() => setOpen(v => !v)}>
                    ☰
                </button>

                <div className="hidden items-center gap-2 lg:flex">
                    {items.map(i => <NavLink key={i.href} href={i.href}>{i.label}</NavLink>)}
                    <NavLink href="/admin/posts">Admin</NavLink>
                    {status === 'loading' ? null : session ? (
                        <button onClick={() => signOut()} className="rounded px-3 py-2 text-sm font-medium hover:bg-gray-100">Sign out</button>
                    ) : (
                        <button onClick={() => signIn('github')} className="rounded px-3 py-2 text-sm font-medium hover:bg-gray-100">Sign in</button>
                    )}
                </div>
            </nav>

            {open && (
                <div className="lg:hidden border-t bg-white">
                    <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col gap-1">
                        {items.map(i => <NavLink key={i.href} href={i.href}>{i.label}</NavLink>)}
                        <NavLink href="/admin/posts">Admin</NavLink>
                        {status === 'loading' ? null : session ? (
                            <button onClick={() => signOut()} className="rounded px-3 py-2 text-left text-sm font-medium hover:bg-gray-100">Sign out</button>
                        ) : (
                            <button onClick={() => signIn('github')} className="rounded px-3 py-2 text-left text-sm font-medium hover:bg-gray-100">Sign in</button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
