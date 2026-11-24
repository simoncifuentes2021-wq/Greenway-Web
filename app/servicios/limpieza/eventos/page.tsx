import type { Metadata } from 'next';
import { CleaningDetailPage } from '@/components/cleaning-detail-page';

export const metadata: Metadata = { title: 'Limpieza en eventos | Greenway', description: 'Limpieza profesional y coordinación operacional antes, durante y después de eventos.' };

export default function CleaningEventsPage() {
  return <CleaningDetailPage type="eventos" />;
}
