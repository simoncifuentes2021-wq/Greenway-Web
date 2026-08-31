import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

type InternalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function InternalPage({ eyebrow, title, description, children }: InternalPageProps) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] bg-ivory pb-24 pt-36 lg:pb-32 lg:pt-44">
        <div className="container-site">
          <Link href="/" className="text-sm font-semibold text-petroleum hover:underline">← Volver al inicio</Link>
          <p className="eyebrow mt-12 text-petroleum">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.7rem,6vw,5.7rem)] font-semibold leading-[.98] tracking-[-0.06em] text-forest">{title}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">{description}</p>
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
