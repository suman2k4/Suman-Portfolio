import { useEffect, useRef, useCallback, useMemo } from 'react';
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

            {/* Main Arrow Body */}
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
    )
}

StrangerThingsCursorSVG.propTypes = {
    color: PropTypes.string.isRequired
}

const SmoothCursor = ({
    themeMode,
    targetSelector = 'button, a, .cursor-target', // Restricted to buttons and links
    spinDuration = 2,
    hideDefaultCursor = true,
    hoverDuration = 0.2,
    parallaxOn = true
}) => {
    const cursorRef = useRef(null);
    const arrowRef = useRef(null); // Ref for the Arrow SVG
    const cornersRef = useRef(null); // Ref for the target corners group
    const spinTl = useRef(null);

    const isActiveRef = useRef(false);
    const targetCornerPositionsRef = useRef(null);
    const tickerFnRef = useRef(null);
    const activeStrengthRef = useRef(0);

    const isUpside = themeMode === 'upside-down';
    const borderColorStart = isUpside ? 'border-stBlue' : 'border-stRed';
    const colorRGB = isUpside ? '48, 86, 211' : '229, 9, 20';

    const isMobile = useMemo(() => {
        const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 768;
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
        const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
        return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
    }, []);

    const constants = useMemo(
        () => ({
            borderWidth: 3,
            cornerSize: 12
        }),
        []
    );

    const moveCursor = useCallback((x, y) => {
        if (!cursorRef.current) return;
        gsap.to(cursorRef.current, {
            x,
            y,
            duration: 0.1,
            ease: 'power3.out'
        });
    }, []);

    useEffect(() => {
        if (isMobile || !cursorRef.current) return;

        const originalCursor = document.body.style.cursor;
        if (hideDefaultCursor) {
            document.body.style.cursor = 'none';
            const style = document.createElement('style');
            style.innerHTML = `*, button, a, input, textarea { cursor: none !important; }`;
            style.id = 'cursor-none-style';
            document.head.appendChild(style);
        }

        const cursor = cursorRef.current;
        // Select the individual corner elements
        const corners = cursor.querySelectorAll('.target-cursor-corner');
        cornersRef.current = corners;

        let activeTarget = null;
        let currentLeaveHandler = null;
        let resumeTimeout = null;

        const cleanupTarget = target => {
            if (currentLeaveHandler) {
                target.removeEventListener('mouseleave', currentLeaveHandler);
            }
            currentLeaveHandler = null;
        };

        gsap.set(cursor, {
            xPercent: -50,
            yPercent: -50,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        });

        // Initially hide corners, show arrow
        gsap.set(corners, { opacity: 0, scale: 0 });
        gsap.set(arrowRef.current, { opacity: 1, scale: 1 });

        const createSpinTimeline = () => {
            if (spinTl.current) {
                spinTl.current.kill();
            }
            spinTl.current = gsap
                .timeline({ repeat: -1, paused: true }) // Start paused
                .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
        };

        createSpinTimeline();

        const tickerFn = () => {
            if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) {
                return;
            }
            const strength = activeStrengthRef.current;
            if (strength === 0) return;
            const cursorX = gsap.getProperty(cursorRef.current, 'x');
            const cursorY = gsap.getProperty(cursorRef.current, 'y');
            const corners = Array.from(cornersRef.current);
            corners.forEach((corner, i) => {
                const currentX = gsap.getProperty(corner, 'x');
                const currentY = gsap.getProperty(corner, 'y');
                const targetX = targetCornerPositionsRef.current[i].x - cursorX;
                const targetY = targetCornerPositionsRef.current[i].y - cursorY;
                const finalX = currentX + (targetX - currentX) * strength;
                const finalY = currentY + (targetY - currentY) * strength;
                const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;
                gsap.to(corner, {
                    x: finalX,
                    y: finalY,
                    duration: duration,
                    ease: duration === 0 ? 'none' : 'power1.out',
                    overwrite: 'auto'
                });
            });
        };

        tickerFnRef.current = tickerFn;

        const moveHandler = e => moveCursor(e.clientX, e.clientY);
        window.addEventListener('mousemove', moveHandler);

        // Orient arrow based on movement when in Idle mode
        let lastX = 0;
        let lastY = 0;
        const orientationHandler = (e) => {
            if (isActiveRef.current || !arrowRef.current) return;
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
                // Optional: Implement rotation logic 
            }
            lastX = e.clientX;
            lastY = e.clientY;
        };
        window.addEventListener('mousemove', orientationHandler);


        const scrollHandler = () => {
            if (!activeTarget || !cursorRef.current) return;
            const mouseX = gsap.getProperty(cursorRef.current, 'x');
            const mouseY = gsap.getProperty(cursorRef.current, 'y');
            const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
            const isStillOverTarget =
                elementUnderMouse &&
                (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget);
            if (!isStillOverTarget) {
                if (currentLeaveHandler) {
                    currentLeaveHandler();
                }
            }
        };
        window.addEventListener('scroll', scrollHandler, { passive: true });

        const mouseDownHandler = () => {
            gsap.to(cursorRef.current, { scale: 0.9, duration: 0.1 });
        };

        const mouseUpHandler = () => {
            gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
        };

        window.addEventListener('mousedown', mouseDownHandler);
        window.addEventListener('mouseup', mouseUpHandler);

        const enterHandler = e => {
            const directTarget = e.target;
            const allTargets = [];
            let current = directTarget;
            while (current && current !== document.body) {
                if (current.matches(targetSelector)) {
                    allTargets.push(current);
                }
                current = current.parentElement;
            }
            const target = allTargets[0] || null;
            if (!target || !cursorRef.current || !cornersRef.current) return;
            if (activeTarget === target) return;
            if (activeTarget) {
                cleanupTarget(activeTarget);
            }
            if (resumeTimeout) {
                clearTimeout(resumeTimeout);
                resumeTimeout = null;
            }

            activeTarget = target;

            // ENTER TARGET STATE
            const corners = Array.from(cornersRef.current);
            gsap.killTweensOf(arrowRef.current);

            // Hide Arrow, Show Corners
            gsap.to(arrowRef.current, { scale: 0, opacity: 0, duration: 0.2 });
            gsap.to(corners, { scale: 1, opacity: 1, duration: 0.2, overwrite: 'auto' });

            // Reset rotation for snapping
            gsap.set(cursorRef.current, { rotation: 0 });

            const rect = target.getBoundingClientRect();
            const { borderWidth, cornerSize } = constants;
            const cursorX = gsap.getProperty(cursorRef.current, 'x');
            const cursorY = gsap.getProperty(cursorRef.current, 'y');

            targetCornerPositionsRef.current = [
                { x: rect.left - borderWidth, y: rect.top - borderWidth },
                { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
                { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
                { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize }
            ];

            isActiveRef.current = true;
            gsap.ticker.add(tickerFnRef.current);

            gsap.to(activeStrengthRef, { current: 1, duration: hoverDuration, ease: 'power2.out' });

            corners.forEach((corner, i) => {
                gsap.to(corner, {
                    x: targetCornerPositionsRef.current[i].x - cursorX,
                    y: targetCornerPositionsRef.current[i].y - cursorY,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });

            const leaveHandler = () => {
                // LEAVE TARGET STATE
                gsap.ticker.remove(tickerFnRef.current);
                isActiveRef.current = false;
                targetCornerPositionsRef.current = null;
                gsap.set(activeStrengthRef, { current: 0, overwrite: true });

                // Show Arrow, Hide Corners
                gsap.to(arrowRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
                gsap.to(corners, { scale: 0, opacity: 0, duration: 0.2 });

                activeTarget = null;

                cleanupTarget(target);
            };
            currentLeaveHandler = leaveHandler;
            target.addEventListener('mouseleave', leaveHandler);
        };

        window.addEventListener('mouseover', enterHandler, { passive: true });

        return () => {
            if (tickerFnRef.current) {
                gsap.ticker.remove(tickerFnRef.current);
            }
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mousemove', orientationHandler);
            window.removeEventListener('mouseover', enterHandler);
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('mousedown', mouseDownHandler);
            window.removeEventListener('mouseup', mouseUpHandler);
            if (activeTarget) {
                cleanupTarget(activeTarget);
            }
            spinTl.current?.kill();
            document.body.style.cursor = originalCursor;
            const style = document.getElementById('cursor-none-style');
            if (style) style.remove();

            isActiveRef.current = false;
            targetCornerPositionsRef.current = null;
            activeStrengthRef.current = 0;
        };
    }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor, isMobile, hoverDuration, parallaxOn]);

    useEffect(() => {
        if (isMobile || !cursorRef.current || !spinTl.current) return;
        if (spinTl.current.isActive()) {
            spinTl.current.kill();
            spinTl.current = gsap
                .timeline({ repeat: -1 })
                .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
        }
    }, [spinDuration, isMobile]);

    if (isMobile) {
        return null;
    }

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999]"
            style={{ willChange: 'transform' }}
        >
            {/* Default Arrow Cursor */}
            <div ref={arrowRef} className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform origin-center">
                <StrangerThingsCursorSVG color={colorRGB} />
            </div>

            {/* Target Mode Corners - Hidden by default via JS, but good to have CSS fallback */}
            <div
                className={`target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] ${borderColorStart} -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0 shadow-[0_0_5px_currentColor]`}
                style={{ willChange: 'transform', opacity: 0 }}
            />
            <div
                className={`target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] ${borderColorStart} translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0 shadow-[0_0_5px_currentColor]`}
                style={{ willChange: 'transform', opacity: 0 }}
            />
            <div
                className={`target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] ${borderColorStart} translate-x-1/2 translate-y-1/2 border-l-0 border-t-0 shadow-[0_0_5px_currentColor]`}
                style={{ willChange: 'transform', opacity: 0 }}
            />
            <div
                className={`target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] ${borderColorStart} -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0 shadow-[0_0_5px_currentColor]`}
                style={{ willChange: 'transform', opacity: 0 }}
            />
        </div>
    );
};

SmoothCursor.propTypes = {
    themeMode: PropTypes.string.isRequired,
    targetSelector: PropTypes.string,
    spinDuration: PropTypes.number,
    hideDefaultCursor: PropTypes.bool,
    hoverDuration: PropTypes.number,
    parallaxOn: PropTypes.bool
};

export default SmoothCursor;
