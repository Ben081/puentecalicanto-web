import Reveal from './Reveal'
import { rounds, ejes } from '../data/content'

export default function Rounds() {
  return (
    <section id="estructura" className="border-y border-gold/15 bg-ink-deep">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="max-w-xl">
          <div className="font-label text-xs font-semibold tracking-[0.15em] text-gold-bright">
            ESTRUCTURA DEL PROYECTO
          </div>
          <h2 className="mt-3 font-display text-[1.8rem] leading-tight text-parchment">
            Cuatro componentes que conectan
            música y comunidad
          </h2>
          <p className="mt-3 font-body text-[15px] leading-relaxed text-parchment/65">
            El proyecto se organiza en cuatro líneas de trabajo que van desde la formación 
            de estudiantes hasta el acompañamiento de la comunidad.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rounds.map((r, i) => (
            <Reveal key={r.titulo} delay={(i % 4) * 0.06}>
              <div className="illuminated-border group flex h-full flex-col gap-4 rounded-xl bg-ink p-5 transition hover:bg-ink/60">
                <div className="flex items-center justify-between">
                  <span className="font-label text-2xl font-bold text-battle-bright">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="font-display text-[15px] font-medium leading-snug text-parchment">
                  {r.titulo}
                </div>
                <div className="mt-auto font-label text-[11px] tracking-[0.05em] text-parchment/50">
                  {ejes[r.eje].toUpperCase()}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
