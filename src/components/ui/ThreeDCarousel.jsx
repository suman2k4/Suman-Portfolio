
import React, { useRef, useEffect, useState } from 'react';
import { ParticleCard } from './MagicBento';
import { motion } from 'framer-motion';

// Simple hook for mobile detection
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    return isMobile;
};

// Icons
const ChevronLeft = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const ChevronRight = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

const ArrowRight = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

const GithubIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const CarouselItem = ({ item, index, active, isUpside, glowColor, cardHeight, borderColorClass }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Reset flip when this card is no longer active
    useEffect(() => {
        if (index !== active) {
            setIsFlipped(false);
        }
    }, [active, index]);

    // Front and Back card common classes
    // Increased opacity to prevent bleed-through
    const cardClasses = `overflow-hidden bg-[#050505] backdrop-blur-md border ${borderColorClass} shadow-lg hover:shadow-xl flex flex-col card--border-glow w-full h-full`;
    const bgGradient = isUpside ? 'from-stBlue/20 to-stPurple/20' : 'from-stRed/20 to-stBlue/20';

    return (
        <div className="relative w-full h-full" style={{ perspective: '1200px' }}>
            <motion.div
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* FRONT FACE */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
                >
                    <ParticleCard
                        data-index={index}
                        glowColor={glowColor}
                        className={cardClasses}
                        enableTilt={false} // Disable tilt to avoid conflicts with rotateY
                        particleCount={8}
                        disableAnimations={index !== active}
                    >
                        {/* Background Effects */}
                        <div className="absolute inset-0 pointer-events-none opacity-0 transition duration-500 group-hover:opacity-100">
                            <div className={`absolute inset-0 bg-gradient-to-tr ${bgGradient} mix-blend-lighten opacity-30`} />
                            <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.05),_transparent_70%)]" />
                        </div>

                        <div className="p-6 flex flex-col flex-grow relative z-10 w-full">
                            {/* Title and Brand/Tag */}
                            <div className="mb-4">
                                <p className="text-sm uppercase tracking-widest text-white/50 mb-1 font-medium">{item.tags[0] || 'Project'}</p>
                                <h3 className="text-2xl font-bold text-white leading-tight glitch" data-text={item.title}>
                                    {item.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <div className="flex-grow">
                                <p className="text-white/70 text-sm leading-relaxed line-clamp-6">
                                    {item.description}
                                </p>
                            </div>

                            {/* Tags */}
                            <div className="mt-4">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {item.tags.slice(1).map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className={`px-2 py-1 bg-white/5 text-white/60 border ${borderColorClass} rounded-full text-xs`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className={`flex items-center justify-between mt-auto pt-4 border-t ${isUpside ? 'border-stBlue/20' : 'border-stRed/20'}`}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent carousel click
                                            if (index === active) setIsFlipped(true);
                                        }}
                                        className={`text-white/80 transition-colors flex items-center relative group text-sm uppercase tracking-wider font-medium ${isUpside ? 'hover:text-stBlue' : 'hover:text-stRed'} cursor-pointer bg-transparent border-none p-0 outline-none`}
                                    >
                                        <span className="relative z-10">Learn more</span>
                                        <ArrowRight className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                                    </button>

                                    {item.links?.github && (
                                        <a
                                            href={item.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group/github gap-2"
                                            aria-label="View Source on GitHub"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <GithubIcon className={`w-4 h-4 ${isUpside ? 'text-stBlue' : 'text-stRed'} group-hover/github:text-white transition-colors`} />
                                            <span className="text-xs font-medium text-white/70 group-hover/github:text-white transition-colors">GitHub</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </ParticleCard>
                </div>

                {/* BACK FACE */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <ParticleCard
                        data-index={index}
                        glowColor={glowColor}
                        className={cardClasses}
                        enableTilt={false}
                        particleCount={8}
                        disableAnimations={index !== active}
                    >
                        <div className="absolute inset-0 bg-black/90 pointer-events-none" /> {/* Backdrop for legibility */}

                        <div className="p-8 flex flex-col h-full relative z-10 w-full overflow-hidden">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <div className={`h-1 w-12 mx-auto rounded ${isUpside ? 'bg-stBlue' : 'bg-stRed'}`} />
                            </div>

                            <div className="flex-grow w-full overflow-y-auto mb-6 pr-2 custom-scrollbar text-left space-y-4">
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2">About Project</h4>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2">Technologies Used</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.map((tag, idx) => (
                                            <span key={idx} className={`px-2 py-1 bg-white/5 text-white/70 border ${borderColorClass} rounded text-[0.65rem]`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 mt-auto w-full">
                                {item.links?.live && (
                                    <a
                                        href={item.links.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center justify-center w-full py-2.5 rounded bg-white/10 hover:bg-white/20 transition-all border ${borderColorClass} text-white font-medium text-xs tracking-wider uppercase group`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Visit Live Project
                                        <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
                                    </a>
                                )}

                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                                    className="w-full py-2.5 rounded transition-colors text-white/60 hover:text-white border border-white/10 hover:border-white/30 text-xs tracking-wider uppercase bg-black/40"
                                >
                                    Return
                                </button>
                            </div>
                        </div>
                    </ParticleCard>
                </div>
            </motion.div>
        </div>
    );
};

const ThreeDCarousel = ({
    items,
    autoRotate = true,
    rotateInterval = 4000,
    cardHeight = 500,
    glowColor = '229, 9, 20',
    isUpside = false,
}) => {
    const [active, setActive] = useState(0);
    const carouselRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const isMobile = useIsMobile();
    const minSwipeDistance = 50;

    useEffect(() => {
        if (autoRotate && isInView && !isHovering) {
            const interval = setInterval(() => {
                setActive((prev) => (prev + 1) % items.length);
            }, rotateInterval);
            return () => clearInterval(interval);
        }
    }, [isInView, isHovering, autoRotate, rotateInterval, items.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.2 }
        );
        if (carouselRef.current) {
            observer.observe(carouselRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const onTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
        setTouchEnd(null);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (distance > minSwipeDistance) {
            setActive((prev) => (prev + 1) % items.length);
        } else if (distance < -minSwipeDistance) {
            setActive((prev) => (prev - 1 + items.length) % items.length);
        }
    };

    const handleMouseMove = (e) => {
        setIsHovering(true);

        if (!carouselRef.current) return;

        const cards = carouselRef.current.querySelectorAll('.card--border-glow');
        cards.forEach((card) => {
            const cardIndex = parseInt(card.getAttribute('data-index') || '-1');
            const isActive = cardIndex === active;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // MagicBento logic: proximity = radius * 0.5, fade = radius * 0.75
            // Active card gets larger radius for the spotlight feel
            const radius = isActive ? 600 : 400;
            const proximity = radius * 0.5;
            const fadeDistance = radius * 0.75;

            const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

            let intensity = 0;
            if (distance <= proximity) {
                intensity = 1;
            } else if (distance <= fadeDistance) {
                intensity = (fadeDistance - distance) / (fadeDistance - proximity);
            } else {
                intensity = 0;
            }

            // Dim inactive cards
            if (!isActive) {
                intensity = intensity * 0.3;
            }

            const relativeX = (x / rect.width) * 100;
            const relativeY = (y / rect.height) * 100;

            card.style.setProperty('--glow-x', `${relativeX}%`);
            card.style.setProperty('--glow-y', `${relativeY}%`);
            card.style.setProperty('--glow-intensity', intensity.toFixed(2));
            card.style.setProperty('--glow-radius', isActive ? '600px' : '400px');
        });
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (!carouselRef.current) return;
        const cards = carouselRef.current.querySelectorAll('.card--border-glow');
        cards.forEach((card) => {
            card.style.setProperty('--glow-intensity', '0');
        });
    };

    const getCardAnimationClass = (index) => {
        if (index === active) return "scale-100 opacity-100 z-20";
        if (index === (active + 1) % items.length)
            return "translate-x-[40%] scale-95 opacity-60 z-10 pointer-events-none";
        if (index === (active - 1 + items.length) % items.length)
            return "translate-x-[-40%] scale-95 opacity-60 z-10 pointer-events-none";
        return "scale-90 opacity-0 pointer-events-none"; // Hide others
    };

    // Determine border color based on theme
    const borderColorClass = isUpside ? 'border-stBlue/40' : 'border-stRed/40';

    return (
        <section
            id="ThreeDCarousel"
            className="bg-transparent min-w-full mx-auto flex items-center justify-center p-4"
        >
            <style>
                {`
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 6px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
            z-index: 10;
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${glowColor}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.4);
          }
        `}
            </style>
            <div className="w-full px-4 sm:px-6 lg:px-8 min-w-[350px] md:min-w-[1000px] max-w-7xl">
                <div
                    className="relative overflow-hidden"
                    style={{ height: `${cardHeight + (isMobile ? 90 : 50)}px` }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    ref={carouselRef}
                >
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        {items.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`absolute top-0 w-full max-w-md transform transition-all duration-500 ${getCardAnimationClass(index)}`}
                                    style={{ height: `${cardHeight}px` }}
                                >
                                    <CarouselItem
                                        item={item}
                                        index={index}
                                        active={active}
                                        isUpside={isUpside}
                                        glowColor={glowColor}
                                        cardHeight={cardHeight}
                                        borderColorClass={borderColorClass}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Buttons - Visible on all devices, responsive positioning */}
                    <button
                        className={`absolute left-4 bottom-4 md:bottom-auto md:left-4 md:top-1/2 md:-translate-y-1/2 w-10 h-10 bg-black/60 border ${isUpside ? 'border-stBlue/30 text-stBlue' : 'border-stRed/30 text-stRed'} rounded-full flex items-center justify-center hover:bg-black hover:scale-110 z-30 shadow-md transition-all backdrop-blur-sm group`}
                        onClick={() =>
                            setActive((prev) => (prev - 1 + items.length) % items.length)
                        }
                        aria-label="Previous"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:text-white transition-colors" />
                    </button>
                    <button
                        className={`absolute right-4 bottom-4 md:bottom-auto md:right-4 md:top-1/2 md:-translate-y-1/2 w-10 h-10 bg-black/60 border ${isUpside ? 'border-stBlue/30 text-stBlue' : 'border-stRed/30 text-stRed'} rounded-full flex items-center justify-center hover:bg-black hover:scale-110 z-30 shadow-md transition-all backdrop-blur-sm group`}
                        onClick={() => setActive((prev) => (prev + 1) % items.length)}
                        aria-label="Next"
                    >
                        <ChevronRight className="w-5 h-5 group-hover:text-white transition-colors" />
                    </button>

                    <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-3 z-30">
                        {items.map((_, idx) => (
                            <button
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${active === idx
                                    ? `w-5 ${isUpside ? 'bg-stBlue' : 'bg-stRed'}`
                                    : "bg-white/20 hover:bg-white/40"
                                    }`}
                                onClick={() => setActive(idx)}
                                aria-label={`Go to item ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ThreeDCarousel;
