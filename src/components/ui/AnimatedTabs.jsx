"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

const AnimatedTabs = ({
    tabs = [],
    defaultTab,
    className,
    themeMode = 'normal',
    activeTab: controlledActiveTab,
    onChange
}) => {
    const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || tabs[0]?.id);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

    if (!tabs?.length) return null;

    const isUpside = themeMode === 'upside-down';
    const activeColor = isUpside ? 'bg-stBlue/30' : 'bg-stRed/30';
    const activeBorder = isUpside ? 'border-stBlue/50' : 'border-stRed/50';

    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);

    const triggerChange = (newId) => {
        if (onChange) {
            onChange(newId);
        } else {
            setInternalActiveTab(newId);
        }
    };

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % tabs.length;
        triggerChange(tabs[nextIndex].id);
    };

    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        triggerChange(tabs[prevIndex].id);
    };

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeTab, tabs]);

    // Swipe Navigation
    const minSwipeDistance = 50;
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };
    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) handleNext();
        if (isRightSwipe) handlePrev();
    };

    return (
        <div className={cn("w-full flex flex-col gap-y-4", className)}>
            <div className="flex gap-2 flex-wrap bg-black/40 border border-white/5 backdrop-blur-sm p-1.5 rounded-xl w-fit mx-auto max-w-full overflow-x-auto hide-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => triggerChange(tab.id)}
                        className={cn(
                            "relative px-4 py-2 text-sm font-display tracking-widest uppercase rounded-lg text-stCream/70 outline-none transition-colors hover:text-stCream whitespace-nowrap",
                            activeTab === tab.id && "text-stCream"
                        )}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="active-tab"
                                className={cn(
                                    "absolute inset-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm rounded-lg border",
                                    activeColor,
                                    activeBorder
                                )}
                                transition={{ type: "spring", duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                ))}
            </div>

            <div
                className="p-1 glass-panel min-h-[400px] h-full relative overflow-hidden group/container"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="w-full h-full relative">
                    <AnimatePresence mode="wait">
                        {tabs.map(
                            (tab) =>
                                activeTab === tab.id && (
                                    <motion.div
                                        key={tab.id}
                                        initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
                                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="w-full h-full p-6"
                                    >
                                        {tab.content}
                                    </motion.div>
                                )
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export { AnimatedTabs };
