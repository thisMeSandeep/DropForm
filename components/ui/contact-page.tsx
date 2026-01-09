"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import {
    Check,
    Copy,
    LucideIcon,
    Mail,
    MapPin,
    Phone,
    Github as GithubIcon,
    Twitter as TwitterIcon,
    Linkedin as LinkedinIcon,
    Instagram as InstagramIcon,
} from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';

const APP_EMAIL = 'mail@example.com';
const APP_PHONE = '+91 300 1234567';
const APP_PHONE_2 = '+91 321 9876543';

export function ContactPage() {
    const socialLinks = [
        {
            icon: GithubIcon,
            href: 'https://github.com/sshahaider',
            label: 'GitHub',
        },
        {
            icon: TwitterIcon,
            href: 'https://twitter.com/sshahaider',
            label: 'Twitter',
        },
        {
            icon: LinkedinIcon,
            href: 'https://linkedin.com/in/sshahaider',
            label: 'LinkedIn',
        },
        {
            icon: InstagramIcon,
            href: 'https://instagram.com/sshahaider',
            label: 'Instagram',
        },
    ];

    return (
        <div className="min-h-screen w-full bg-[#030014]">
            <div className="mx-auto h-full max-w-6xl lg:border-x border-white/10 relative">
                <div
                    aria-hidden
                    className="absolute inset-0 isolate -z-10 opacity-30 contain-strict pointer-events-none"
                >
                    <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(255,255,255,0.06)_0,rgba(140,140,140,0.02)_50%,rgba(255,255,255,0.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-1/2 -rotate-45 rounded-full" />
                    <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
                    <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-1/2 -rotate-45 rounded-full" />
                </div>
                <div className="flex grow flex-col justify-center px-4 md:px-6 pt-32 pb-16">
                    <h1 className="text-4xl font-bold md:text-5xl text-white">
                        Contact Us
                    </h1>
                    <p className="text-gray-400 mb-5 text-base">
                        Contact the support team at DropForm.
                    </p>
                </div>
                <BorderSeparator />
                <div className="grid md:grid-cols-3 border-white/10">
                    <Box
                        icon={Mail}
                        title="Email"
                        description="We respond to all emails within 24 hours."
                    >
                        <a
                            href={`mailto:${APP_EMAIL}`}
                            className="font-mono text-base font-medium tracking-wide hover:underline text-gray-200"
                        >
                            {APP_EMAIL}
                        </a>
                        <CopyButton className="size-6 text-gray-400 hover:text-white" test={APP_EMAIL} />
                    </Box>
                    <Box
                        icon={MapPin}
                        title="Office"
                        description="Drop by our office for a chat."
                    >
                        <span className="font-mono text-base font-medium tracking-wide text-gray-200">
                            Office # 100, 101 Second Floor Lucknow , India.
                        </span>
                    </Box>
                    <Box
                        icon={Phone}
                        title="Phone"
                        description="We're available Mon-Fri, 9am-5pm."
                        className="border-b-0 md:border-r-0"
                    >
                        <div className="space-y-2">
                            <div className="flex items-center gap-x-2">
                                <a
                                    href={`tel:${APP_PHONE}`}
                                    className="block font-mono text-base font-medium tracking-wide hover:underline text-gray-200"
                                >
                                    {APP_PHONE}
                                </a>
                                <CopyButton className="size-6 text-gray-400 hover:text-white" test={APP_PHONE} />
                            </div>
                            <div className="flex items-center gap-x-2">
                                <a
                                    href={`tel:${APP_PHONE_2}`}
                                    className="block font-mono text-base font-medium tracking-wide hover:underline text-gray-200"
                                >
                                    {APP_PHONE_2}
                                </a>
                                <CopyButton className="size-6 text-gray-400 hover:text-white" test={APP_PHONE_2} />
                            </div>
                        </div>
                    </Box>
                </div>
                <BorderSeparator />
                <div className="relative flex h-full min-h-[320px] items-center justify-center overflow-hidden">
                    <div
                        className={cn(
                            'z-0 absolute inset-0 size-full',
                            'bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]',
                            'bg-size-[32px_32px]',
                            'mask-[radial-gradient(ellipse_at_center,black_30%,transparent)]',
                        )}
                    />

                    <div className="relative z-1 space-y-6">
                        <h2 className="text-center text-3xl font-bold md:text-4xl text-white">
                            Find us online
                        </h2>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white/5 hover:bg-white/10 flex items-center gap-x-2 rounded-full border border-white/10 px-4 py-2 transition-colors duration-200"
                                >
                                    <link.icon className="size-4 text-gray-300" />
                                    <span className="font-mono text-sm font-medium tracking-wide text-gray-300">
                                        {link.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BorderSeparator() {
    return <div className="h-px w-full border-b border-white/10" />;
}

type ContactBoxProps = React.ComponentProps<'div'> & {
    icon: LucideIcon;
    title: string;
    description: string;
};

function Box({
    title,
    description,
    className,
    children,
    icon: Icon,
    ...props
}: ContactBoxProps) {
    return (
        <div
            className={cn(
                'flex flex-col justify-between border-b border-white/10 md:border-r',
                className,
            )}
        >
            <div className="bg-white/5 flex items-center gap-x-3 border-b border-white/10 p-4">
                <Icon className="text-gray-400 size-5" strokeWidth={1} />
                <h2 className="font-heading text-lg font-medium tracking-wider text-white">
                    {title}
                </h2>
            </div>
            <div className="flex items-center gap-x-2 p-4 py-12">{children}</div>
            <div className="border-t border-white/10 p-4 bg-white/5">
                <p className="text-gray-400 text-sm">{description}</p>
            </div>
        </div>
    );
}

type CopyButtonProps = ButtonProps & {
    test: string;
};

function CopyButton({
    className,
    variant = 'ghost',
    size = 'icon',
    test,
    ...props
}: CopyButtonProps) {
    const [copied, setCopied] = React.useState<boolean>(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(test);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <Button
            variant={variant}
            size={size}
            className={cn('disabled:opacity-100 relative', className)}
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy to clipboard'}
            disabled={copied || props.disabled}
            {...props}
        >
            <div
                className={cn(
                    'transition-all duration-300',
                    copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
                )}
            >
                <Check className="size-3.5 stroke-emerald-500" aria-hidden="true" />
            </div>
            <div
                className={cn(
                    'absolute transition-all duration-300',
                    copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
                )}
            >
                <Copy aria-hidden="true" className="size-3.5" />
            </div>
        </Button>
    );
}
