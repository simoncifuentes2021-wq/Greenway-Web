import { InternalFlow } from '@/components/living-system/internal-flow';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { services } from '@/data/site';

const inputClass = 'mt-2 min-h-14 w-full rounded-[.7rem] border border-line bg-white px-4 py-3 text-base text-charcoal outline-none transition-[border-color,box-shadow] placeholder:text-muted/55 focus:border-petroleum focus:shadow-[0_0_0_3px_rgba(36,93,79,.1)]';

export function QuotePage({ initialService }: { initialService: string }) {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="internal-hero pb-16 pt-28 text-white sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
          <InternalFlow />
          <div className="container-site">
            <Breadcrumbs light items={[{ name: 'Inicio', href: '/' }, { name: 'Cotizar', href: '/cotizar' }]} />
            <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
              <div>
                <p className="eyebrow text-eco">Cotizar servicio</p>
                <h1 className="display-title mt-5 max-w-5xl">Cuéntanos qué necesita tu proyecto.</h1>
              </div>
              <p className="max-w-xl text-lg leading-8 text-white/72 lg:justify-self-end">Comparte el contexto básico de la operación para preparar una futura solicitud de cotización clara y enfocada.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="quote-form-title" className="section-space bg-ivory">
          <div className="container-site grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="eyebrow text-petroleum">Información del proyecto</p>
              <h2 id="quote-form-title" className="mt-5 font-display text-[clamp(2.4rem,5vw,4.6rem)] font-semibold leading-none tracking-[-0.055em] text-forest">Lo esencial para entender tu necesidad.</h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-muted">Los campos obligatorios permiten identificar a la persona, la organización, el servicio y el contexto inicial. Teléfono, fecha y ubicación son opcionales.</p>
              <div className="mt-8 border-l-2 border-eco bg-white/55 py-1 pl-5 text-sm leading-6 text-muted">
                <p className="font-semibold text-forest">Envío pendiente de configuración</p>
                <p className="mt-2">La interfaz está lista, pero todavía no existe un backend o proveedor definido. El formulario no envía ni almacena datos.</p>
              </div>
            </div>

            <form aria-describedby="form-status" className="border border-line border-t-[3px] border-t-forest bg-white p-6 sm:p-9 lg:p-11" noValidate>
              <fieldset>
                <legend className="mb-7 flex w-full items-center gap-4 font-display text-lg font-semibold tracking-[-.025em] text-forest"><span className="font-display text-xs font-bold text-eco">01</span>Contacto</legend>
                <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Nombre" id="name" required><input className={inputClass} id="name" name="name" type="text" autoComplete="name" required /></Field>
                <Field label="Empresa u organización" id="organization" required><input className={inputClass} id="organization" name="organization" type="text" autoComplete="organization" required /></Field>
                <Field label="Email" id="email" required><input className={inputClass} id="email" name="email" type="email" autoComplete="email" placeholder="nombre@organizacion.cl" required /></Field>
                <Field label="Teléfono" id="phone" help="Opcional"><input className={inputClass} id="phone" name="phone" type="tel" autoComplete="tel" /></Field>
                </div>
              </fieldset>
              <fieldset className="mt-10 border-t border-line pt-9">
                <legend className="flex w-full items-center gap-4 bg-white pr-4 font-display text-lg font-semibold tracking-[-.025em] text-forest"><span className="font-display text-xs font-bold text-eco">02</span>Proyecto</legend>
                <div className="mt-7 grid gap-6 sm:grid-cols-2">
                <Field label="Servicio" id="service" required>
                  <select className={inputClass} id="service" name="service" defaultValue={initialService} required>
                    <option value="">Selecciona un servicio</option>
                    {services.map((service) => <option key={service.slug} value={service.slug}>{service.name}</option>)}
                    <option value="varios-servicios">Necesito combinar varios servicios</option>
                    <option value="por-definir">Aún no lo tengo claro</option>
                  </select>
                </Field>
                <Field label="Tipo de proyecto o evento" id="project-type" required><input className={inputClass} id="project-type" name="projectType" type="text" placeholder="Ej.: festival, rodaje u operación continua" required /></Field>
                <Field label="Fecha" id="date" help="Opcional, si corresponde"><input className={inputClass} id="date" name="date" type="date" /></Field>
                <Field label="Ubicación" id="location" help="Opcional"><input className={inputClass} id="location" name="location" type="text" autoComplete="address-level2" /></Field>
                <div className="sm:col-span-2"><Field label="Mensaje o necesidad" id="message" required><textarea className={`${inputClass} min-h-36 resize-y`} id="message" name="message" placeholder="Describe brevemente el contexto y lo que necesitas resolver." required /></Field></div>
                </div>
              </fieldset>
              <button type="submit" disabled className="mt-8 inline-flex min-h-14 w-full cursor-not-allowed items-center justify-center rounded-[.7rem] border border-forest/20 bg-forest/45 px-5 py-3 text-sm font-semibold text-white">Envío pendiente de configuración</button>
              <p id="form-status" className="mt-3 text-center text-xs leading-5 text-muted">No se enviará información hasta que Greenway confirme el mecanismo oficial.</p>
            </form>
          </div>
        </section>

        <section aria-labelledby="quote-alternative-title" className="border-t border-line bg-white py-14 lg:py-20">
          <div className="container-site">
            <p className="eyebrow text-petroleum">Canales de contacto</p>
            <h2 id="quote-alternative-title" className="mt-3 font-display text-3xl font-semibold tracking-[-0.045em] text-forest sm:text-4xl">Contacto y WhatsApp pendientes de confirmación.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">El correo, teléfono y número oficial de WhatsApp se incorporarán cuando el cliente los valide. No se muestran canales ficticios.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Field({ label, id, required = false, help, children }: { label: string; id: string; required?: boolean; help?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-semibold text-forest">{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
        {help ? <span className="text-xs text-muted">{help}</span> : null}
      </div>
      {children}
    </div>
  );
}
