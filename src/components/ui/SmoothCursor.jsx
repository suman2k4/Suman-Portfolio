import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import PropTypes from 'prop-types';

const StrangerThingsCursorSVG = ({ color }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="0 0 50 50"
            fill="none"
            style={{ overflow: 'visible' }}
        >
            {/* Glow Filter */}
            <defs>
                <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Main Arrow Body - Points Top-Left visually */}
            <path
                d="M5,5 L18,45 L24,30 L45,24 L5,5 Z"
                fill={`rgba(${color}, 0.15)`}
                stroke={`rgb(${color})`}
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                filter="url(#neon-glow)"
            />

            {/* Inner Core */}
            <circle cx="20" cy="20" r="2" fill={`rgb(${color})`} filter="url(#neon-glow)" />

            {/* Trailing energy line (decorative) */}
            <line x1="24" y1="30" x2="18" y2="45" stroke={`rgba(${color}, 0.5)`} strokeWidth="1" />
        </svg>
    );
};

StrangerThingsCursorSVG.propTypes = {
    color: PropTypes.string.isRequired
};

const SmoothCursor = ({
    themeMode,
    hideDefaultCursor = true,
}) => {
    const cursorRef = useRef(null);
    const arrowRef = useRef(null);

    const prevPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const currentRotationRef = useRef(135); // Initial rotation offset to point right-ish or neutral

    const isUpside = themeMode === 'upside-down';
    const colorRGB = isUpside ? '48, 86, 211' : '229, 9, 20';

    const isMobile = useMemo(() => {
        if (typeof window === 'undefined') return false;
        const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 768;
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
        return (hasTouchScreen && isSmallScreen) || mobileRegex.test(userAgent.toLowerCase());
    }, []);

    useEffect(() => {
        if (isMobile || !cursorRef.current) return;

        const originalCursor = document.body.style.cursor;
        let styleTag = null;

        if (hideDefaultCursor) {
            document.body.style.cursor = 'none';
            styleTag = document.createElement('style');
            styleTag.innerHTML = `*, button, a, input, textarea, .cursor-target { cursor: none !important; }`;
            styleTag.id = 'cursor-none-style';
            document.head.appendChild(styleTag);
        }

        // Default position center
        gsap.set(cursorRef.current, {
            xPercent: -50,
            yPercent: -50,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        });

        // Initial visual rotation correction
        // SVG points Top-Left (-135 or 225 deg). 
        // We want it to look like it's pointing "Up-Left" naturally or "Right" if we want default.
        // Let's start with it pointing Top-Left (Natural SVG).
        gsap.set(arrowRef.current, { rotation: 0 });

        const moveHandler = (e) => {
            const { clientX, clientY } = e;

            // Smooth Follow
            gsap.to(cursorRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: 'power3.out'
            });

            // Rotation Logic
            const dx = clientX - prevPos.current.x;
            const dy = clientY - prevPos.current.y;

            // Threshold to prevent jitter when stationary or moving very slowly
            if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
                // Calculate angle in degrees
                // dx, dy vector points in direction of movement
                // atan2 returns angle from X-axis (Right is 0, Down is 90)
                let angle = Math.atan2(dy, dx) * (180 / Math.PI);

                // SVG Correction:
                // The SVG arrow points to 5,5 (Top-Left).
                // In standard screen coords, Top-Left is -135 degrees (or 225).
                // So if we move Top-Left (-135 deg), we want rotation to be 0 (match SVG).
                // If we move Right (0 deg), we want SVG (Top-Left) to rotate +135 deg to point Right.
                // Formula: rotation = angle + 135;

                let targetRotation = angle + 135;

                // Smooth Rotation (Shortest Path)
                // We use GSAP's built-in short rotation handling appropriately?
                // Actually, just calculating the delta manually is safer for continuous rotation
                let currentRot = currentRotationRef.current;
                let delta = targetRotation - currentRot;

                // Normalize delta to [-180, 180]
                while (delta > 180) delta -= 360;
                while (delta < -180) delta += 360;

                let finalRot = currentRot + delta;
                currentRotationRef.current = finalRot;

                gsap.to(arrowRef.current, {
                    rotation: finalRot,
                    duration: 0.2,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            }

            prevPos.current = { x: clientX, y: clientY };
        };

        const mouseDownHandler = () => {
            gsap.to(arrowRef.current, { scale: 0.8, duration: 0.1 });
        };

        const mouseUpHandler = () => {
            gsap.to(arrowRef.current, { scale: 1, duration: 0.2 });
        };

        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mousedown', mouseDownHandler);
        window.addEventListener('mouseup', mouseUpHandler);

        return () => {
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mousedown', mouseDownHandler);
            window.removeEventListener('mouseup', mouseUpHandler);

            document.body.style.cursor = originalCursor;
            if (styleTag) styleTag.remove();
        };
    }, [hideDefaultCursor, isMobile]);

    if (isMobile) return null;

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999]"
            style={{ willChange: 'transform' }}
        >
            <div ref={arrowRef} className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform">
                <StrangerThingsCursorSVG color={colorRGB} />
            </div>
        </div>
    );
};

SmoothCursor.propTypes = {
    themeMode: PropTypes.string.isRequired,
    hideDefaultCursor: PropTypes.bool
};

export default SmoothCursor;
