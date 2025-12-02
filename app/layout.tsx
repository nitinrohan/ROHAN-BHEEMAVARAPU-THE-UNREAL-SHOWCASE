import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'ROHAN BHEEMAVARAPU — THE UNREAL SHOWCASE',
    description: 'Portfolio showcasing innovative projects and creative work by Rohan Bheemavarapu',
    keywords: ['portfolio', 'projects', 'developer', 'creative', 'showcase'],
    authors: [{ name: 'Rohan Bheemavarapu' }],
    openGraph: {
        title: 'ROHAN BHEEMAVARAPU — THE UNREAL SHOWCASE',
        description: 'Portfolio showcasing innovative projects and creative work',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ROHAN BHEEMAVARAPU — THE UNREAL SHOWCASE',
        description: 'Portfolio showcasing innovative projects and creative work',
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 5,
    },
    manifest: '/manifest.json',
    themeColor: '#0a0a0a',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={inter.className}>
                {children}
                <Toaster position="top-center" richColors closeButton />
                <Analytics />
            </body>
        </html>
    );
}
