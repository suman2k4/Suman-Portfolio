import React from 'react';
import { cn } from '../../utils/cn';
import { Plus } from 'lucide-react';

export function ContactCard({
    title = 'Contact With Us',
    description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
    contactInfo,
    className,
    formSectionClassName,
    children,
    themeMode = 'normal',
    ...props
}) {
    const isUpside = themeMode === 'upside-down';
    const accentColor = isUpside ? 'text-stBlue' : 'text-stRed';
    const borderColor = isUpside ? 'border-stBlue/30' : 'border-stRed/30';

    return (
        <div
            className={cn(
                'glass-panel border relative grid h-full w-full shadow-2xl md:grid-cols-2 lg:grid-cols-3 overflow-hidden',
                borderColor,
                className,
            )}
            {...props}
        >
            <Plus className={cn("absolute -top-3 -left-3 h-6 w-6 opacity-50", accentColor)} />
            <Plus className={cn("absolute -top-3 -right-3 h-6 w-6 opacity-50", accentColor)} />
            <Plus className={cn("absolute -bottom-3 -left-3 h-6 w-6 opacity-50", accentColor)} />
            <Plus className={cn("absolute -right-3 -bottom-3 h-6 w-6 opacity-50", accentColor)} />

            <div className="flex flex-col justify-between lg:col-span-2 relative z-10">
                <div className="relative h-full space-y-4 px-6 py-8 md:p-8">
                    <h1 className={cn("text-3xl font-display font-bold md:text-4xl lg:text-5xl uppercase tracking-wider", accentColor)}>
                        {title}
                    </h1>
                    <p className="text-stCream/70 max-w-xl text-sm md:text-base lg:text-lg font-mono leading-relaxed">
                        {description}
                    </p>
                    <div className="grid gap-6 md:grid md:grid-cols-2 lg:grid-cols-2 pt-8">
                        {contactInfo?.map((info, index) => (
                            <ContactInfo key={index} {...info} themeMode={themeMode} />
                        ))}
                    </div>
                </div>
            </div>

            <div
                className={cn(
                    'bg-black/40 flex h-full w-full items-center border-t border-white/5 p-6 md:col-span-1 md:border-t-0 md:border-l relative z-10',
                    formSectionClassName,
                )}
            >
                {children}
            </div>

            {/* Background noise/grain for texture */}
            <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none z-0" />
        </div>
    );
}

function ContactInfo({
    icon: Icon,
    label,
    value,
    link,
    className,
    themeMode,
    ...props
}) {
    const isUpside = themeMode === 'upside-down';
    const iconBg = isUpside ? 'bg-stBlue/10 text-stBlue group-hover:bg-stBlue/20 group-hover:text-stBlue' : 'bg-stRed/10 text-stRed group-hover:bg-stRed/20 group-hover:text-stRed';
    const Wrapper = link ? 'a' : 'div';
    const wrapperProps = link ? { href: link, target: '_blank', rel: 'noreferrer' } : {};

    return (
        <Wrapper
            className={cn(
                'flex items-center gap-3 py-2 group transition-all duration-300',
                link && 'cursor-pointer hover:translate-x-1',
                className
            )}
            {...wrapperProps}
            {...props}
        >
            <div className={cn("rounded-lg p-3 border border-white/5 transition-colors", iconBg)}>
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="font-medium text-stCream font-display tracking-wide uppercase text-xs opacity-80 group-hover:opacity-100 transition-opacity">{label}</p>
                <p className="text-stCream/60 text-sm font-mono mt-0.5 group-hover:text-stCream/90 transition-colors break-all">{value}</p>
            </div>
        </Wrapper>
    );
}
