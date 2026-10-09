import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Heart, CheckCircle2, Clock } from 'lucide-react'
import { normalizeFullName } from '../utils/normalizeName'
import useConfigFrate, { API_BASE } from '../hooks/useConfigFrate'

const PROYECTO = 'puente-calicanto'

// ── Helper: carga un <script> una sola vez, aunque se llame varias veces ──
const scriptsCargados = {}
function cargarScript(src) {
  if (scriptsCargados[src]) return scriptsCargados[src]
  scriptsCargados[src] = new Promise((resolve, reject) => {
    const el = document.createElement('script')
    el.src = src
    el.onload = resolve
    el.onerror = reject
    document.body.appendChild(el)
  })
  return scriptsCargados[src]
}

// Los pasos: monto -> pago (Culqi) -> datos (anónimo o no) -> confirmación
// Si el donante paga con Yape-QR/Plin (billetera), el flujo salta directo
// a 'pendiente_billetera', porque esos pagos se confirman después, por webhook.
export default function DonarModal({ open, onClose, onDonacionCompletada }) {
  const { config } = useConfigFrate()
  const [step, setStep] = useState('monto')
  const [monto, setMonto] = useState('')
  const [error, setError] = useState('')
  const [procesando, setProcesando] = useState(false)
  const [anonimo, setAnonimo] = useState(false)
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [autoriza, setAutoriza] = useState(false)

  // Token de tarjeta/Yape (flujo síncrono) hasta que se registre la donación.
  const tokenPagoRef = useRef(null)

  function reset() {
    setStep('monto')
    setMonto('')
    setError('')
    setProcesando(false)
    setAnonimo(false)
    setNombre('')
    setApellido('')
    setAutoriza(false)
    tokenPagoRef.current = null
  }

  function handleClose() {
    onClose()
    setTimeout(reset, 250)
  }

  // ── Crea la Orden en el backend (necesaria para que el Checkout ──────
  // ── muestre la pestaña de billeteras móviles: Yape-QR, Plin, etc.) ───
  async function crearOrden(montoNum) {
    const res = await fetch(`${API_BASE}/api/donaciones/orden`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        proyecto: PROYECTO,
        monto: montoNum,
        fuente: PROYECTO,
        anonimo: false,
      }),
    })
    const data = await res.json()
    if (!data.ok) throw new Error(data.error || 'No se pudo generar la orden de pago.')
    return data // { order_id, order_number, donacion_id }
  }

  // ── Abre el Culqi Checkout real: tarjeta/Yape (token) + billetera (QR) ──
  async function abrirCulqiCheckout(montoNum) {
    if (!config.culqi_public_key) {
      setError('Los pagos no están disponibles en este momento. Intenta más tarde.')
      setStep('monto')
      return
    }

    try {
      let orderId = null
      // La Orden solo se crea si el backend ya soporta billeteras (culqi_enabled).
      // Si por algún motivo falla la creación de la orden, igual dejamos
      // continuar con tarjeta/Yape (que no la necesitan).
      try {
        const orden = await crearOrden(montoNum)
        orderId = orden.order_id
      } catch (err) {
        console.warn('No se pudo crear la orden (billetera no disponible esta vez):', err)
      }

      await cargarScript('https://checkout.culqi.com/js/v4')

      window.Culqi.publicKey = config.culqi_public_key
      window.Culqi.settings({
        title: 'Contribución Voluntaria al Proyecto Puente Calicanto',
        currency: 'PEN',
        amount: Math.round(montoNum * 100),
        ...(orderId ? { order: orderId } : {}),
      })
      window.Culqi.options({
        lang: 'auto',
        installments: false,
        paymentMethods: {
          tarjeta: true,
          yape: true,
          bancaMovil: false,
          agente: false,
          billetera: Boolean(orderId), // Yape-QR / Plin — requiere la orden
          cuotealo: false,
        },
      })

      window.culqi = function () {
        if (window.Culqi.token) {
          // Tarjeta o Yape por token: seguimos el flujo síncrono de siempre.
          tokenPagoRef.current = window.Culqi.token.id
          window.Culqi.close()
          setStep('datos')
        } else if (window.Culqi.order) {
          // Billetera (QR): el pago se confirma después, vía webhook.
          window.Culqi.close()
          setStep('pendiente_billetera')
        } else if (window.Culqi.error) {
          console.error('Error de Culqi:', window.Culqi.error)
          setError('No se pudo procesar el pago. Intenta de nuevo.')
          setStep('monto')
        }
      }

      window.Culqi.open()
    } catch {
      setError('No se pudo cargar el formulario de pago. Revisa tu conexión.')
      setStep('monto')
    }
  }

  function handleContinuarMonto(e) {
    e.preventDefault()
    const valor = Number(monto)
    if (!monto || Number.isNaN(valor)) {
      setError('Ingresa un monto válido.')
      return
    }
    if (valor < config.monto_minimo) {
      setError(`El monto mínimo para donar es S/ ${config.monto_minimo}.`)
      return
    }
    setError('')
    setStep('pago')
    abrirCulqiCheckout(valor)
  }

  async function handleFinalizar() {
    if (!anonimo && !autoriza) {
      setError('Marca la autorización para mostrar tu nombre, o dona en anonimato.')
      return
    }
    if (!anonimo && !nombre.trim()) {
      setError('Ingresa tu nombre, o marca "Donar en anonimato".')
      return
    }
    if (!tokenPagoRef.current) {
      setError('No se encontró el pago. Intenta de nuevo desde el inicio.')
      setStep('monto')
      return
    }

    setError('')
    setProcesando(true)

    const donante = anonimo
      ? { nombre: 'Donante anónimo', monto: Number(monto), anonimo: true }
      : {
          nombre: normalizeFullName(nombre, apellido),
          monto: Number(monto),
          anonimo: false,
        }

    try {
      const res = await fetch(`${API_BASE}/api/donaciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proyecto: PROYECTO,
          nombre: donante.nombre,
          monto: donante.monto,
          anonimo: donante.anonimo,
          fuente: PROYECTO,
          token_pago: tokenPagoRef.current,
          metodo_pago: 'tarjeta',
        }),
      })

      const data = await res.json()

      if (!data.ok) {
        setError(data.error || 'Hubo un error al registrar tu donación. Intenta de nuevo.')
        setProcesando(false)
        return
      }

      if (data.requiere_3ds) {
        setError('Tu banco pide un paso extra de verificación. Vuelve a intentarlo desde el inicio.')
        setProcesando(false)
        setStep('monto')
        return
      }
    } catch {
      setError('Error de conexión. Verifica tu internet e intenta de nuevo.')
      setProcesando(false)
      return
    }

    setProcesando(false)
    onDonacionCompletada?.(donante)
    setStep('exito')
  }

  const montosRapidos = [
    config.monto_minimo,
    config.monto_minimo + 30,
    config.monto_minimo + 130,
    config.monto_minimo + 480,
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-deep/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, transform: 'translateY(12px)' }}
            animate={{ opacity: 1, scale: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0, scale: 0.94, transform: 'translateY(12px)' }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="illuminated-border relative w-full max-w-md rounded-2xl bg-ink p-7"
          >
            <button
              onClick={handleClose}
              className="absolute right-5 top-5 text-parchment/50 transition hover:text-parchment"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            {step === 'monto' && (
              <form onSubmit={handleContinuarMonto}>
                <div className="mb-1 flex items-center gap-2 font-label text-xs font-semibold tracking-[0.1em] text-battle-bright">
                  <Heart size={14} /> APOYAR EL PROYECTO
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold text-parchment">
                  Elige el monto de tu donación
                </h3>
                <p className="mt-2 font-body text-[13px] text-parchment/55">
                  Tu donación ayuda a producir música litúrgica para los niños
                </p>

                <label className="mt-5 block font-label text-[12px] font-semibold text-parchment/70">
                  Monto (S/)
                </label>
                <input
                  type="number"
                  min={config.monto_minimo}
                  step="1"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  placeholder={String(config.monto_minimo)}
                  className="mt-1.5 w-full rounded-lg border border-gold/25 bg-ink-deep px-4 py-3 font-body text-parchment outline-none focus:border-gold"
                />

                <div className="mt-3 flex gap-2">
                  {montosRapidos.map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setMonto(String(m))}
                      className="rounded-full border border-gold/25 px-3.5 py-1.5 font-label text-[12.5px] text-parchment/70 transition hover:border-gold"
                    >
                      S/ {m}
                    </button>
                  ))}
                </div>

                {error && <p className="mt-3 font-body text-[13px] text-battle-bright">{error}</p>}

                <button
                  type="submit"
                  className="hover-lift mt-6 w-full rounded-lg bg-battle/90 py-3.5 font-label text-sm font-semibold text-parchment transition hover:bg-battle-bright"
                >
                  Continuar
                </button>
              </form>
            )}

            {step === 'pago' && (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="h-9 w-9 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
                <p className="mt-5 font-body text-[14px] text-parchment/70">
                  Abriendo el formulario para su donacion . . .
                </p>
              </div>
            )}

            {step === 'pendiente_billetera' && (
              <div className="flex flex-col items-center py-6 text-center">
                <Clock className="text-gold-bright" size={40} />
                <h3 className="mt-4 font-display text-xl font-semibold text-parchment">
                  Confirmando tu pago…
                </h3>
                <p className="mt-2 font-body text-[13.5px] text-parchment/60">
                  Estamos esperando la confirmación de tu billetera móvil.
                  Puede tardar unos segundos a un par de minutos. No hace
                  falta que esperes aquí — su donación quedará registrada
                  apenas se confirme.
                </p>
                <button
                  onClick={handleClose}
                  className="hover-lift mt-6 rounded-lg border border-gold/40 px-6 py-2.5 font-label text-sm font-semibold text-parchment transition hover:bg-gold/10"
                >
                  Cerrar
                </button>
              </div>
            )}

            {step === 'datos' && (
              <div>
                <h3 className="font-display text-xl font-semibold text-parchment">
                  ¡Pago confirmado!
                </h3>
                <p className="mt-2 font-body text-[13.5px] text-parchment/60">
                  ¿Cómo quieres aparecer en la sección de donadores?
                </p>

                <label className="mt-5 flex items-center gap-3 rounded-lg border border-gold/20 bg-ink-deep px-4 py-3">
                  <input
                    type="checkbox"
                    checked={anonimo}
                    onChange={(e) => setAnonimo(e.target.checked)}
                    className="h-4 w-4 accent-gold"
                  />
                  <span className="font-body text-[13.5px] text-parchment/85">
                    Donar en anonimato
                  </span>
                </label>

                {!anonimo && (
                  <div className="mt-4 flex flex-col gap-3">
                    <div>
                      <label className="block font-label text-[12px] font-semibold text-parchment/70">
                        Nombre
                      </label>
                      <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="ej. maria jose"
                        className="mt-1.5 w-full rounded-lg border border-gold/25 bg-ink-deep px-4 py-2.5 font-body text-parchment outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block font-label text-[12px] font-semibold text-parchment/70">
                        Apellido
                      </label>
                      <input
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        placeholder="ej. rojas de la cruz"
                        className="mt-1.5 w-full rounded-lg border border-gold/25 bg-ink-deep px-4 py-2.5 font-body text-parchment outline-none focus:border-gold"
                      />
                    </div>

                    <label className="mt-1 flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={autoriza}
                        onChange={(e) => setAutoriza(e.target.checked)}
                        className="mt-0.5 h-4 w-4 accent-gold"
                      />
                      <span className="font-body text-[12.5px] leading-snug text-parchment/65">
                        Autorizo el uso de mi nombre y apellido para que se
                        muestre en la sección de donadores.
                      </span>
                    </label>
                  </div>
                )}

                {error && <p className="mt-3 font-body text-[13px] text-battle-bright">{error}</p>}

                <button
                  onClick={handleFinalizar}
                  disabled={procesando}
                  className="hover-lift mt-6 w-full rounded-lg bg-gold py-3.5 font-label text-sm font-semibold text-ink-deep transition hover:bg-gold-bright disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {procesando ? 'Registrando…' : 'Finalizar'}
                </button>
              </div>
            )}

            {step === 'exito' && (
              <div className="flex flex-col items-center py-6 text-center">
                <CheckCircle2 className="text-gold-bright" size={44} />
                <h3 className="mt-4 font-display text-xl font-semibold text-parchment">
                  ¡Gracias por tu donación!
                </h3>
                <p className="mt-2 font-body text-[13.5px] text-parchment/60">
                  Tu aporte de S/ {monto} ayuda a llevar música litúrgica a
                  los niños de la Aldea Infantil.
                </p>
                <button
                  onClick={handleClose}
                  className="hover-lift mt-6 rounded-lg border border-gold/40 px-6 py-2.5 font-label text-sm font-semibold text-parchment transition hover:bg-gold/10"
                >
                  Cerrar
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}