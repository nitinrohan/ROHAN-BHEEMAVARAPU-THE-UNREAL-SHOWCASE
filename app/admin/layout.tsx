import { createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { StrangerThingsHeader } from '@/components/admin/stranger-things-header';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createServerClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    // Check if user email is in admin list
    const adminEmails = process.env.ADMIN_EMAILS?.split(',').map((e) => e.trim()) || [];
    if (!adminEmails.includes(user.email || '')) {
        redirect('/');
    }

    return (
        <div className="stranger-things-theme min-h-screen">
            {/* Static noise effect */}
            <div className="st-static" />

            {/* Navigation */}
            <nav className="relative z-20 border-b border-red-900/30 bg-black/50 backdrop-blur-sm">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-8">
                        <Link href="/admin" className="st-glow-text font-mono text-lg font-bold tracking-wider">
                            ◀ CONTROL PANEL
                        </Link>
                        <div className="hidden gap-4 md:flex">
                            <Link href="/admin" className="st-glow-text font-mono text-sm hover:text-red-400">
                                Dashboard
                            </Link>
                            <Link href="/admin/projects" className="st-glow-text font-mono text-sm hover:text-red-400">
                                Projects
                            </Link>
                            <Link href="/admin/blog" className="st-glow-text font-mono text-sm hover:text-red-400">
                                Blog
                            </Link>
                            <Link href="/admin/about" className="st-glow-text font-mono text-sm hover:text-red-400">
                                About
                            </Link>
                            <Link href="/admin/resume" className="st-glow-text font-mono text-sm hover:text-red-400">
                                Resume
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-red-400/70">{user.email}</span>
                        <form action="/auth/signout" method="post">
                            <button
                                type="submit"
                                className="font-mono text-xs text-red-400/70 hover:text-red-400"
                            >
                                [EXIT]
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <StrangerThingsHeader />

            {/* Content */}
            <div className="container relative z-10 mx-auto px-4 py-8">
                {children}
            </div>
        </div>
    );
}
