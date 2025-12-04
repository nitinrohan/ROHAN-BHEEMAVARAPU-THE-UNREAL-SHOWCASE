'use client';

import { useState, useEffect } from 'react';

export function GateAnimation({ onComplete }: { onComplete: () => void }) {
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false);
            onComplete();
        }, 3000); // 3 second animation

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!isAnimating) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
            <div className="gate-container">
                <div className="gate-left" />
                <div className="gate-right" />
                <div className="gate-glow" />
            </div>
        </div>
    );
}
