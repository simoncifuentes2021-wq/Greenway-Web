import Link from 'next/link';
import type { ReactNode } from 'react';

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
};

const variants = {
  primary: 'bg-forest text-white hover:bg-petroleum border-forest',
  secondary: 'border-forest text-forest hover:bg-forest hover:text-white',
  ghost: 'border-transparent text-forest hover:bg-forest/8',
};

export function ButtonLink({ href, children, variant = 'primary', className = '' }: ButtonLinkProps) {
  return (
    <Link href={href} className={`pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-[.6rem] border px-5 py-3 text-sm font-semibold ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
