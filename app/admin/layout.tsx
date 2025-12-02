import { createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

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
        <div className="min-h-screen bg-background">
            <nav className="border-b border-border bg-card">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <h1 className="text-xl font-bold">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{user.email}</span>
                        <form action="/auth/signout" method="post">
                            <button
                                type="submit"
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
            <div className="container mx-auto px-4 py-8">{children}</div>
        </div>
    );
}
