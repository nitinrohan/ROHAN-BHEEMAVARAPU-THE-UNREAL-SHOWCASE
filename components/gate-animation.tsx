'use client';

import { useState, useEffect } from 'react';

export function GateAnimation({ onComplete }: { onComplete: () => void }) {
    const [started, setStarted] = useState(false);
    const [cracking, setCracking] = useState(false);
    const [opening, setOpening] = useState(false);

    useEffect(() => {
        if (started) {
            // Start cracking effect
            setCracking(true);

            // After cracks spread, open the gate
            const openTimer = setTimeout(() => {
                setOpening(true);
            }, 2000);

            // Complete animation
            const completeTimer = setTimeout(() => {
                onComplete();
            }, 4000);

            return () => {
                clearTimeout(openTimer);
                clearTimeout(completeTimer);
            };
        }
    }, [started, onComplete]);

    if (opening && !cracking) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
            {!started ? (
                <button
                    onClick={() => setStarted(true)}
                    className="gate-start-button animate-pulse"
                >
                    <div className="text-center">
                        <div className="mb-4 text-6xl">🔴</div>
                        <p className="text-2xl font-bold text-red-500">ENTER THE UPSIDE DOWN</p>
                        <p className="mt-2 text-sm text-red-400/70">Click to open the gate</p>
                    </div>
                </button>
            ) : (
                <div className="gate-container">
                    {/* Cracks overlay */}
                    {cracking && (
                        <>
                            <svg className="gate-cracks" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path
                                    className="crack crack-1"
                                    d="M 50 0 L 50 100"
                                    stroke="rgba(255, 0, 64, 0.8)"
                                    strokeWidth="0.3"
                                    fill="none"
                                />
                                <path
                                    className="crack crack-2"
                                    d="M 50 50 L 0 30"
                                    stroke="rgba(255, 0, 64, 0.6)"
                                    strokeWidth="0.2"
                                    fill="none"
                                />
                                <path
                                    className="crack crack-3"
                                    d="M 50 50 L 100 70"
                                    stroke="rgba(255, 0, 64, 0.6)"
                                    strokeWidth="0.2"
                                    fill="none"
                                />
                                <path
                                    className="crack crack-4"
                                    d="M 50 30 L 20 0"
                                    stroke="rgba(255, 0, 64, 0.5)"
                                    strokeWidth="0.15"
                                    fill="none"
                                />
                                <path
                                    className="crack crack-5"
                                    d="M 50 70 L 80 100"
                                    stroke="rgba(255, 0, 64, 0.5)"
                                    strokeWidth="0.15"
                                    fill="none"
                                />
                                <path
                                    className="crack crack-6"
                                    d="M 50 50 L 0 80"
                                    stroke="rgba(255, 0, 64, 0.4)"
                                    strokeWidth="0.1"
                                    fill="none"
                                />
                                <path
                                    className="crack crack-7"
                                    d="M 50 50 L 100 20"
                                    stroke="rgba(255, 0, 64, 0.4)"
                                    strokeWidth="0.1"
                                    fill="none"
                                />
                            </svg>
                        </>
                    )}

                    {/* Gate halves */}
                    <div className={`gate-left ${opening ? 'opening' : ''}`} />
                    <div className={`gate-right ${opening ? 'opening' : ''}`} />

                    {/* Center glow */}
                    <div className={`gate-glow ${cracking ? 'pulsing' : ''}`} />
                </div>
            )}
        </div>
    );
}
