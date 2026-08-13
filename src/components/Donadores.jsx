import Reveal from './Reveal'
import { Heart } from 'lucide-react'

export default function Donadores({ donantes }) {
  if (!donantes || donantes.length === 0) return null

  return (
    <section id="donadores" className="border-y border-gold/15 bg-ink-deep">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="max-w-xl">
          <div className="font-label text-xs font-semibold tracking-[0.15em] text-gold-bright">
            GRATITUD
          </div>
          <h2 className="mt-3 font-display text-[1.8rem] leading-tight text-parchment">
            Quienes ya sostienen el puente
          </h2>
          <p className="mt-3 font-body text-[15px] leading-relaxed text-parchment/65">
            Gracias a quienes ya apoyan el desarrollo de este proyecto.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col gap-2.5">
          {donantes.map((d, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="flex items-center justify-between rounded-lg border border-gold/15 bg-ink px-5 py-3.5 transition-colors duration-200 hover:bg-ink-deep">
                <div className="flex items-center gap-3">
                  <Heart size={15} className="text-battle-bright" />
                  <span className="font-body text-[14px] text-parchment/85">{d.nombre}</span>
                </div>
                <span className="font-label text-[13px] font-semibold text-gold-bright">
                  S/ {d.monto}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
