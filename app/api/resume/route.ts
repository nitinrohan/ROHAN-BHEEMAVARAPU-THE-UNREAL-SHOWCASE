import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { password, data, action, id } = body;

        // Verify password
        const correctPassword = process.env.NEXT_PUBLIC_RESUME_PASSWORD || 'admin123';
        if (password !== correctPassword) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        const supabase = await createServerClient();

        // Perform the requested action
        if (action === 'create') {
            const { error } = await supabase
                .from('resume_items')
                .insert([data]);

            if (error) throw error;
            return NextResponse.json({ success: true });
        }

        if (action === 'update') {
            const { error } = await supabase
                .from('resume_items')
                .update(data)
                .eq('id', id);

            if (error) throw error;
            return NextResponse.json({ success: true });
        }

        if (action === 'delete') {
            const { error } = await supabase
                .from('resume_items')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error: any) {
        console.error('Resume API error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
