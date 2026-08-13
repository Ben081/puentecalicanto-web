import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV = [
  { href: '#proyecto', label: 'Proyecto' },
  { href: '#estructura', label: 'Estructura' },
  { href: '#cronograma', label: 'Cronograma' },
  { href: '#aliados', label: 'Aliados' },
  { href: '#equipo', label: 'Equipo' },
]

export default function Header({ onDonar, onConvocatoria }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-ink-deep/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5">
        <a href="#top" className="flex items-center shrink-0">
          <img
            src="/FRATE.svg"
            alt="Puente Calicanto"
            className="h-9 w-auto object-contain"
          />
        </a>

        <nav className="hidden items-center gap-7 font-label text-[13px] font-medium text-parchment/80 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="transition hover:text-gold-bright">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={onConvocatoria}
            className="font-label text-[13px] font-medium text-parchment/80 transition hover:text-gold-bright"
          >
            Convocatorias
          </button>
          <button
            onClick={onDonar}
            className="hover-lift rounded-full bg-battle/90 px-5 py-2 font-label text-[13px] font-semibold text-parchment shadow-[0_0_0_1px_rgba(107,47,160,0.4)] transition hover:bg-battle-bright"
          >
            Donar
          </button>
        </div>

        <button className="md:hidden text-parchment" onClick={() => setOpen((o) => !o)} aria-label="Abrir menú">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden border-t border-gold/20 bg-ink-deep md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="py-2 font-label text-sm text-parchment/85"
                >
                  {n.label}
                </a>
              ))}
              <button
                onClick={() => { setOpen(false); onConvocatoria() }}
                className="py-2 text-left font-label text-sm text-parchment/85"
              >
                Convocatorias
              </button>
              <button
                onClick={() => { setOpen(false); onDonar() }}
                className="mt-2 rounded-full bg-battle/90 px-5 py-2.5 text-center font-label text-sm font-semibold text-parchment"
              >
                Donar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
