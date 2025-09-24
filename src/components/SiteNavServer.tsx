    import { prisma } from '@/lib/prisma';
    import SiteNav from './SiteNav';

    export default async function SiteNavServer() {
    const items = await prisma.menuItem.findMany({
        where: { location: 'SITE', visible: true },
        orderBy: [{ order: 'asc' }, { label: 'asc' }],
        select: { label: true, href: true },
    });
    return <SiteNav items={items} />;
    }
