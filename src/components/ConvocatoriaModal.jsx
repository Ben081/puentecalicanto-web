import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import ConvocatoriaForm from './ConvocatoriaForm'

export default function ConvocatoriaModal({ open, onClose }) {
  const [instanceKey, setInstanceKey] = useState(0)

  useEffect(() => {
    if (open) setInstanceKey((k) => k + 1)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-deep/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, transform: 'translateY(12px)' }}
            animate={{ opacity: 1, scale: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0, scale: 0.94, transform: 'translateY(12px)' }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="illuminated-border relative w-full max-w-lg rounded-2xl bg-ink p-7"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 text-parchment/50 transition hover:text-parchment"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            <div className="font-label text-xs font-semibold tracking-[0.1em] text-gold-bright">
              CONVOCATORIA
            </div>
            <h3 className="mt-2 font-display text-xl font-semibold text-parchment">
              Únete al equipo
            </h3>

            <div className="mt-5">
              <ConvocatoriaForm key={instanceKey} onSuccess={onClose} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
