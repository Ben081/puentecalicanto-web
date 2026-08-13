import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

const EASE_OUT = [0.23, 1, 0.32, 1]

function Counter({ value }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const numericValue = parseInt(value.replace(/,/g, ''), 10)
  const hasComma = value.includes(',')

  const count = useMotionValue(1)
  const rounded = useTransform(count, (latest) => {
    const n = Math.round(latest)
    return hasComma ? n.toLocaleString('es-PE') : n.toString()
  })

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericValue, {
        duration: 1.8,
        ease: EASE_OUT,
      })
      return controls.stop
    }
  }, [isInView, count, numericValue])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

export default function Hero({ onDonar }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-gold/15" />
      <div className="pointer-events-none absolute -left-16 top-40 h-56 w-56 rounded-full border border-battle/15" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-16 md:grid-cols-[1.1fr_0.9fr] md:pt-24">
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(24px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-bright" />
            <span className="font-label text-[11px] font-semibold tracking-[0.12em] text-gold-bright">
              PROGRAMA RSU
            </span>
          </div>

          <h1 className="max-w-xl font-display text-[2.7rem] font-semibold leading-[1.08] text-parchment md:text-[3.4rem]">
            Cada nota es un{' '}
            <span className="italic text-gold-bright">puente</span>.
            <br />
            Cada donación,{' '}
            <span className="italic text-gold-bright">esperanza</span>.
          </h1>

          <p className="mt-6 max-w-md font-body text-[15.5px] leading-relaxed text-parchment/75">
            Programa de Responsabilidad Social Universitaria impulsado por la
            Universidad Nacional Daniel Alomía Robles (UNDAR) en alianza con la
            Aldea Infantil San Juan Bosco de Huánuco.<br /><br />
            pensado especialmente para los niños de la Aldea Infantil San Juan Bosco y 
            para los coros parroquiales de la Diócesis de Huánuco.
          </p>

          <div className="mt-9 flex flex-wrap gap-3.5">
            <a
              href="#proyecto"
              className="hover-lift rounded-lg bg-gold px-6 py-3.5 font-label text-sm font-semibold text-ink-deep transition hover:bg-gold-bright"
            >
              Conocer el proyecto
            </a>
            <button
              onClick={onDonar}
              className="hover-lift rounded-lg border border-battle/60 px-6 py-3.5 font-label text-sm font-semibold text-parchment transition hover:bg-battle/15"
            >
              Apoyar con una donación
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, transform: 'scale(0.95)' }}
          animate={{ opacity: 1, transform: 'scale(1)' }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
          className="relative mx-auto w-full max-w-2xl"
        >
          <div className="relative">
          <img
            src="/img.svg"
            alt="Puente Calicanto"
            className="h-full w-full object-contain"
            style={{
              maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
            }}
          />
        </div>
        </motion.div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-gold/15 md:grid-cols-4">
      {[
        ['30', 'Niños beneficiarios'],
        ['15', 'Pistas musicales'],
        ['130', 'Beneficiarios totales'],
        ['4', 'Aliados institucionales'],
      ].map(([value, label]) => (
        <div key={label} className="flex flex-col items-center justify-center bg-ink px-6 py-6 text-center">
          <div className="font-display text-3xl font-semibold text-gold-bright">
            <Counter value={value} />
          </div>
          <div className="mt-1 font-body text-[12.5px] leading-snug text-parchment/60">{label}</div>
        </div>
      ))}
    </div>
    </section>
  )
}
