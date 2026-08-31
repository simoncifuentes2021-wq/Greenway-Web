import Link from 'next/link';

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export function Breadcrumbs({ items, light = false }: { items: BreadcrumbItem[]; light?: boolean }) {
  return (
    <nav aria-label="Migas de pan">
      <ol className={`flex flex-wrap items-center gap-2 text-sm ${light ? 'text-white/65' : 'text-muted'}`}>
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true" className={light ? 'text-white/35' : 'text-line'}>/</span> : null}
              {current ? (
                <span aria-current="page" className={light ? 'font-semibold text-white' : 'font-semibold text-forest'}>{item.name}</span>
              ) : (
                <Link href={item.href} className={`underline-offset-4 hover:underline ${light ? 'hover:text-white' : 'hover:text-forest'}`}>{item.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
