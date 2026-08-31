import { ReferenceMedia } from '@/components/ui/reference-media';

type MediaPlaceholderProps = {
  label: string;
  description?: string;
  className?: string;
  tone?: 'forest' | 'petroleum' | 'ivory';
  src?: string;
};

export function MediaPlaceholder({ label, description, className = '', tone = 'forest', src }: MediaPlaceholderProps) {
  const reference = src ?? (tone === 'petroleum' ? '/media/temporary/greenway-audiovisual.jpg' : '/media/temporary/greenway-hero-event.jpg');
  return <ReferenceMedia src={reference} alt="Referencia visual temporal para la futura composición de un proyecto" label={label} disclaimer={description ?? 'No representa un proyecto real · reemplazar'} className={className} />;
}
