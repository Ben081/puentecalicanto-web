import Reveal from './Reveal'
import { instituciones } from '../data/content'

export default function Instituciones() {
  const track = [...instituciones, ...instituciones]

  return (
    <section id="instituciones" className="border-y border-gold/15 bg-ink-deep">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="max-w-xl">
          <div className="font-label text-xs font-semibold tracking-[0.15em] text-gold-bright">
            INSTITUCIONES QUE NOS ACOMPAÑAN
          </div>
          <h2 className="mt-3 font-display text-[1.8rem] leading-tight text-parchment">
            Quienes hacen posible este proyecto
          </h2>
          <p className="mt-3 font-body text-[15px] leading-relaxed text-parchment/65">
            Instituciones estratégicos que garantizan el impacto y la sostenibilidad
            del proyecto. 
          </p>
        </Reveal>

        <div className="group relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink-deep to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink-deep to-transparent sm:w-24" />

          <div className="flex w-max animate-marquee items-center gap-6 group-hover:[animation-play-state:paused]">
            {track.map((inst, i) => (
              <div
              key={`${inst.nombre}-${i}`}
              className="group/card relative flex shrink-0 items-center justify-center overflow-visible transition"
            >
              {inst.logo ? (
                <img
                  src={inst.logo}
                  alt={inst.nombre}
                  className="h-55 w-55 shrink-0 object-contain drop-shadow-lg transition-transform duration-250 ease-out hover:scale-105"
                  style={{ willChange: 'transform' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextSibling.style.display = 'flex'
                  }}
                />
              ) : null}
              <span
                className="hidden h-45 w-45 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-ink font-label text-sm font-bold text-gold-bright"
                style={{ display: inst.logo ? 'none' : 'flex' }}
              >
                {(inst.sigla ?? inst.nombre ?? '??').slice(0, 2).toUpperCase()}
              </span>

              <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-lg border border-gold/25 bg-battle/95 p-3 opacity-0 shadow-lg transition-opacity duration-200 group-hover/card:opacity-100">
                <div className="font-label text-[11px] font-semibold text-gold-bright">
                  {inst.nombre}
                </div>
                <div className="mt-1 font-body text-[11.5px] leading-snug text-parchment/90">
                  {inst.direccion}
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
