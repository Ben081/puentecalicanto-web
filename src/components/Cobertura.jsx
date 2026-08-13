import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import { cronograma } from '../data/content'

export default function Cobertura() {
  const [active, setActive] = useState(0)

  return (
    <section id="cronograma" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal className="max-w-xl">
        <div className="font-label text-xs font-semibold tracking-[0.15em] text-gold-bright">
          CRONOGRAMA
        </div>
        <h2 className="mt-3 font-display text-[1.8rem] leading-tight text-parchment">
          Cómo se desarrolla el proyecto
        </h2>
        <p className="mt-3 font-body text-[15px] leading-relaxed text-parchment/65">
          Selecciona un período para ver las actividades programadas.
        </p>
      </Reveal>

      <div className="relative mt-9 mb-6">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gold/20" />
        <div className="relative flex flex-wrap gap-2">
          {cronograma.map((c, i) => (
            <button
              key={c.mes}
              onClick={() => setActive(i)}
              className={`rounded-full px-4 py-2 font-label text-[13px] font-semibold transition ${
                i === active
                  ? 'bg-gold text-ink-deep'
                  : 'border border-gold/25 bg-ink-deep text-parchment/70 hover:border-gold/50'
              }`}
            >
              {c.mes}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }}
          exit={{ opacity: 0, transform: 'translateY(-12px)', filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="illuminated-border rounded-2xl bg-gradient-to-br from-ink-deep to-ink p-8"
        >
          <div className="flex flex-col gap-4">
            <div
              className="flex flex-col gap-2 border-b border-gold/10 pb-4"
            >
              <div className="font-display text-[17px] font-semibold text-parchment">
                {cronograma[active].titulo}
              </div>
              <div className="font-body text-[14.5px] leading-relaxed text-parchment/75">
                {cronograma[active].detalle}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
