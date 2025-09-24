import type { Metadata } from 'next';
import AdminNav from '@/components/AdminNav';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Admin · NxthPress',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto max-w-6xl px-4">
            <div className="flex gap-6">
                <AdminNav />
                <div className="flex-1 py-4">
                    <Breadcrumbs />
                    {children}
                </div>
            </div>
        </div>
    );
}
