import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { useRef } from "react";
import PropTypes from 'prop-types';

export function PointerHighlight({
    children,
    rectangleClassName,
    containerClassName,
    delay = 0,
}) {
    const containerRef = useRef(null);

    return (
        <div
            className={cn("relative w-fit", containerClassName)}
            ref={containerRef}
        >
            <div className="relative z-10">{children}</div>
            <motion.div
                className="pointer-events-none absolute inset-0 z-0"
                initial={{ opacity: 0, scale: 0.95, originX: 0, originY: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <motion.div
                    className={cn(
                        "absolute inset-0 border",
                        rectangleClassName
                    )}
                    initial={{
                        width: "0%",
                        height: "0%",
                    }}
                    whileInView={{
                        width: "100%",
                        height: "100%",
                    }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                        delay: delay,
                    }}
                />
            </motion.div>
        </div>
    );
}

PointerHighlight.propTypes = {
    children: PropTypes.node.isRequired,
    rectangleClassName: PropTypes.string,
    containerClassName: PropTypes.string,
    delay: PropTypes.number,
};
