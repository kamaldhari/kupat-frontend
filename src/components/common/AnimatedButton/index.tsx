"use client";

import React, { useEffect, useRef } from "react";

interface AnimatedButtonProps {
    dynamicClass: string;
    children: React.ReactNode;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ dynamicClass, children }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        let lastXPercent = 50; // Default center
        let lastYPercent = 50; // Default center
        const flair = button.querySelector(".button__flair") as HTMLElement;

        const handleMouseEnter = (event: MouseEvent) => {
            const { offsetX, offsetY, target } = event;
            const { offsetWidth, offsetHeight } = target as HTMLElement;
            const xPercent = (offsetX / offsetWidth) * 100;
            const yPercent = (offsetY / offsetHeight) * 100;
            flair.style.transformOrigin = `${xPercent}% ${yPercent}%`;
            flair.style.transform = "scale(1)"; // Animate scale up
        };

        const handleMouseMove = (event: MouseEvent) => {
            const { offsetX, offsetY, target } = event;
            const { offsetWidth, offsetHeight } = target as HTMLElement;
            lastXPercent = (offsetX / offsetWidth) * 100;
            lastYPercent = (offsetY / offsetHeight) * 100;
        };

        const handleMouseLeave = (event: MouseEvent) => {
            const flair = (event.target as HTMLElement).querySelector(".button__flair") as HTMLElement;
            flair.style.transformOrigin = `${lastXPercent}% ${lastYPercent}%`;

            // Apply animation to scale down the flair
            flair.style.transition = "transform 0.4s cubic-bezier(.52, .62, .25, 1)";
            flair.style.transform = "scale(0)";
        };

        button.addEventListener("mouseenter", handleMouseEnter);
        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            button.removeEventListener("mouseenter", handleMouseEnter);
            button.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <button ref={buttonRef} className={`anim-btn ${dynamicClass}`}>
            <span className="button__flair"></span>
            <span className="btn-txt">{children}</span>
        </button>
    );
};

export default AnimatedButton;
