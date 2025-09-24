    import NavLink from './NavLink';

    export default function AdminNav() {
    return (
        <aside className="w-56 shrink-0 border-r bg-white">
        <div className="px-4 py-4 text-sm font-semibold">Admin</div>
        <nav className="flex flex-col gap-1 px-2 pb-4">
            <div className="px-2 py-1 text-xs uppercase tracking-wide text-gray-500">Posts</div>
            <NavLink href="/admin/posts">All Posts</NavLink>
            <NavLink href="/admin/posts/new">New Post</NavLink>
            <div className="px-2 py-1 text-xs uppercase tracking-wide text-gray-500">Pages</div>
            <NavLink href="/admin/pages">All Pages</NavLink>
            <NavLink href="/admin/pages/new">New Page</NavLink>
            <div className="px-2 py-1 text-xs uppercase tracking-wide text-gray-500 mt-4">Menu</div>
            <NavLink href="/admin/menu">All Items</NavLink>
            <NavLink href="/admin/menu/new">New Item</NavLink>
        </nav>
        </aside>
    );
    }
