import type { Metadata } from 'next';
import { CleaningDetailPage } from '@/components/cleaning-detail-page';

export const metadata: Metadata = { title: 'Limpieza domiciliaria profunda | Greenway', description: 'Limpieza profunda para hogares, organizada según los espacios y requerimientos de cada vivienda.' };

export default function ResidentialCleaningPage() {
  return <CleaningDetailPage type="domiciliaria" />;
}
