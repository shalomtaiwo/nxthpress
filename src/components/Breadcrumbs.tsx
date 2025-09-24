    'use client';

    import Link from 'next/link';
    import { usePathname } from 'next/navigation';

    const labelMap: Record<string, string> = {
    admin: 'Admin',
    posts: 'Posts',
    new: 'New',
    };

    function titleize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
    }

    export default function Breadcrumbs() {
    const pathname = usePathname();
    const parts = pathname.split('/').filter(Boolean);
    const crumbs = parts.map((part, i) => {
        const href = '/' + parts.slice(0, i + 1).join('/');
        const label = labelMap[part] ?? titleize(part);
        return { href, label, last: i === parts.length - 1 };
    });

    if (crumbs.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className="mb-4 text-sm">
        <ol className="flex flex-wrap items-center gap-2 text-gray-600">
            <li>
            <Link href="/" className="hover:underline">Home</Link>
            </li>
            {crumbs.map((c, i) => (
            <li key={i} className="flex items-center gap-2">
                <span>/</span>
                {c.last ? (
                <span className="font-medium text-gray-900">{c.label}</span>
                ) : (
                <Link href={c.href} className="hover:underline">{c.label}</Link>
                )}
            </li>
            ))}
        </ol>
        </nav>
    );
    }
