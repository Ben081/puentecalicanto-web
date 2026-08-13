import Reveal from './Reveal'
import { aliados, equipo, initials } from '../data/content'

export default function AliadosEquipo() {
  return (
    <>
      <section id="aliados" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="max-w-xl">
          <div className="font-label text-xs font-semibold tracking-[0.15em] text-gold-bright">
            RED DE COLABORACIÓN
          </div>
          <h2 className="mt-3 font-display text-[1.8rem] leading-tight text-parchment">
            Aliados
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aliados.map((a, i) => (
            <Reveal key={a.nombre} delay={i * 0.06}>
              <div className="h-full rounded-xl border border-gold/15 bg-ink-deep p-5">
                <div className="font-display text-[15px] font-medium text-parchment">
                  {a.nombre}
                </div>
                <div className="mt-2 font-body text-[13px] leading-relaxed text-parchment/60">
                  {a.rol}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="equipo" className="border-y border-gold/15 bg-ink-deep">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal className="max-w-xl">
            <div className="font-label text-xs font-semibold tracking-[0.15em] text-gold-bright">
              RESPONSABLES
            </div>
            <h2 className="mt-3 font-display text-[1.8rem] leading-tight text-parchment">
              Equipo del proyecto
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {equipo.map((e, i) => (
              <Reveal key={e.nombre} delay={(i % 3) * 0.06}>
                <div className="flex items-start gap-4 rounded-xl border border-gold/15 bg-ink p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-display text-sm font-semibold text-ink-deep">
                    {initials(e.nombre)}
                  </div>
                  <div>
                    <div className="font-display text-[14.5px] font-medium text-parchment">
                      {e.nombre}
                    </div>
                    <div className="mt-1 font-body text-[12.5px] leading-snug text-parchment/55">
                      {e.rol}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
