import { approvedClientLogos } from '@/data/home';

export function ClientsSection() {
  return (
    <section aria-labelledby="clients-title" className="border-y border-line bg-white py-14 lg:py-20">
      <div className="container-site">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-petroleum">Clientes</p>
            <h2 id="clients-title" className="mt-3 font-display text-3xl font-semibold tracking-[-0.045em] text-forest sm:text-4xl">Confianza construida proyecto a proyecto.</h2>
          </div>
          <p className="text-xs text-muted">Logos pendientes de autorización.</p>
        </div>

        {approvedClientLogos.length > 0 ? (
          <ul className="mt-10 grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-6">
            {approvedClientLogos.map((client) => <li key={client.name} className="grid min-h-28 place-items-center bg-white p-5">{client.name}</li>)}
          </ul>
        ) : (
          <div className="mt-10 border-y border-line py-10" aria-label="Sistema reservado para logos autorizados">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-lg text-sm leading-6 text-muted">El sistema está preparado para archivos oficiales con escala óptica consistente. No se muestran marcas sin autorización.</p>
              <div aria-hidden="true" className="flex items-center gap-4">
                {Array.from({ length: 4 }, (_, index) => <span key={index} className="h-10 w-16 border border-dashed border-line bg-ivory" />)}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
