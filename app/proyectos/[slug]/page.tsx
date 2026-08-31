import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamicParams = true;

export async function generateMetadata(): Promise<Metadata> {
  return { robots: { index: false, follow: true } };
}

export default function Page() { notFound(); }
