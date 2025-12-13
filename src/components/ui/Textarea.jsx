import React from 'react';
import { cn } from '../../utils/cn';

const Textarea = React.forwardRef(({ className, themeMode, ...props }, ref) => {
    const isUpside = themeMode === 'upside-down';
    const focusBorder = isUpside ? 'focus:border-stBlue/50' : 'focus:border-stRed/50';

    return (
        <textarea
            className={cn(
                "flex min-h-[80px] w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm ring-offset-background placeholder:text-stCream/30 text-stCream focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none",
                focusBorder,
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = "Textarea";

export { Textarea };
