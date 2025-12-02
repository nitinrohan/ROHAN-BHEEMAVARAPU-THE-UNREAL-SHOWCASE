'use client';

import { useEffect, useRef } from 'react';

export function StrangerThingsHeader() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = 200;

        // Particle system for background
        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas!.width) this.x = 0;
                if (this.x < 0) this.x = canvas!.width;
                if (this.y > canvas!.height) this.y = 0;
                if (this.y < 0) this.y = canvas!.height;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = `rgba(231, 76, 60, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particles: Particle[] = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            canvas!.width = window.innerWidth;
            canvas!.height = 200;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0"
            />
            <div className="relative z-10 flex flex-col items-center justify-center py-12">
                <h1 className="st-neon-title mb-2">
                    ADMIN PORTAL
                </h1>
                <p className="st-glow-text font-mono text-sm tracking-wider">
                    THE UPSIDE DOWN
                </p>
            </div>
        </div>
    );
}
