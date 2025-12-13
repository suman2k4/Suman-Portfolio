import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({ className, type, themeMode, ...props }, ref) => {
    const isUpside = themeMode === 'upside-down';
    const focusBorder = isUpside ? 'focus:border-stBlue/50' : 'focus:border-stRed/50';

    return (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium text-stCream placeholder:text-stCream/30 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
                focusBorder,
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";

export { Input };
