import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { siteUrl } from '@/data/site';
import './globals.css';
import { LivingProvider } from '@/components/living-system/living-provider';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' });
const manrope = Manrope({ variable: '--font-manrope', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Greenway | Gestión ambiental para eventos y organizaciones',
    template: '%s | Greenway',
  },
  description: 'Soluciones ambientales concretas y trazables para eventos, producciones y organizaciones.',
  openGraph: {
    title: 'Greenway | Gestión ambiental en terreno',
    description: 'Soluciones ambientales concretas y trazables para eventos, producciones y organizaciones.',
    type: 'website',
    locale: 'es_CL',
    siteName: 'Greenway',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${manrope.variable}`}><LivingProvider>{children}</LivingProvider></body>
    </html>
  );
}
