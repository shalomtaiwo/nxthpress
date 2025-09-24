    'use client';

    import Link from 'next/link';
    import { usePathname } from 'next/navigation';
    import clsx from 'clsx';

    export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const pathname = usePathname();
    const active = pathname === href || (href !== '/' && pathname.startsWith(href));
    return (
        <Link
        href={href}
        className={clsx(
            'rounded px-3 py-2 text-sm font-medium hover:bg-gray-100',
            active && 'bg-gray-900 text-white hover:bg-gray-900'
        )}
        >
        {children}
        </Link>
    );
    }
