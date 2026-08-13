import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { API_BASE } from '../hooks/useConfigFrate'

const HABILIDADES = ['Voluntario/a', 'Productor Musical', 'Arreglista', 'Músico Instrumentista', 'Otro']

export default function ConvocatoriaForm({ onSuccess }) {
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [mayorEdad, setMayorEdad] = useState(false)
  const [habilidad, setHabilidad] = useState(HABILIDADES[0])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setEnviando(true)

    const form = e.target
    const nombre = form.nombre?.value || ''
    const correo = form.correo?.value || ''
    const nivelEstudios = form.nivelEstudios?.value || ''
    const mensaje = form.mensaje?.value || ''

    try {
      const res = await fetch(`${API_BASE}/api/convocatoria`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proyecto: 'puente-calicanto',
          nombre,
          correo,
          nivelEstudios,
          interes: habilidad,
          mensaje,
          mayorEdad,
        }),
      })

      const data = await res.json()

      if (!data.ok) {
        setError(data.error || 'Hubo un error al enviar. Intenta de nuevo.')
        setEnviando(false)
        return
      }

      setEnviado(true)
    } catch {
      setError('Error de conexión. Verifica tu internet e intenta de nuevo.')
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <CheckCircle2 className="text-gold-bright" size={44} />
        <h3 className="mt-4 font-display text-xl font-semibold text-parchment">
          ¡Postulación enviada!
        </h3>
        <p className="mt-2 font-body text-[13.5px] text-parchment/60">
          Te contactaremos a través de tu correo con los siguientes pasos.
        </p>
        {onSuccess && (
          <button
            onClick={onSuccess}
            className="hover-lift mt-6 rounded-lg border border-gold/40 px-6 py-2.5 font-label text-sm font-semibold text-parchment transition hover:bg-gold/10"
          >
            Cerrar
          </button>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block font-label text-[12px] font-semibold text-parchment/70">
            Nombre completo
          </label>
          <input
            required
            name="nombre"
            placeholder="Tu nombre"
            className="mt-1.5 w-full rounded-lg border border-gold/25 bg-ink-deep px-4 py-2.5 font-body text-parchment outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="block font-label text-[12px] font-semibold text-parchment/70">
            Correo
          </label>
          <input
            required
            type="email"
            name="correo"
            placeholder="tuemail@ejemplo.com"
            className="mt-1.5 w-full rounded-lg border border-gold/25 bg-ink-deep px-4 py-2.5 font-body text-parchment outline-none focus:border-gold"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block font-label text-[12px] font-semibold text-parchment/70">
          Nivel de estudios
        </label>
        <input
          required
          name="nivelEstudios"
          placeholder="ej. Estudiante de Educación Musical, 6to ciclo"
          className="mt-1.5 w-full rounded-lg border border-gold/25 bg-ink-deep px-4 py-2.5 font-body text-parchment outline-none focus:border-gold"
        />
      </div>

      <div className="mt-4">
        <label className="block font-label text-[12px] font-semibold text-parchment/70">
          Me interesa...
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {HABILIDADES.map((h) => (
            <button
              type="button"
              key={h}
              onClick={() => setHabilidad(h)}
              className={`rounded-full px-3.5 py-1.5 font-label text-[12.5px] transition ${
                habilidad === h
                  ? 'bg-gold text-ink-deep'
                  : 'border border-gold/25 text-parchment/70 hover:border-gold/50'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label className="block font-label text-[12px] font-semibold text-parchment/70">
          Mensaje (opcional)
        </label>
        <textarea
          rows={3}
          name="mensaje"
          placeholder="Cuéntanos por qué quieres participar…"
          className="mt-1.5 w-full resize-none rounded-lg border border-gold/25 bg-ink-deep px-4 py-2.5 font-body text-parchment outline-none focus:border-gold"
        />
      </div>

      <label className="mt-4 flex items-start gap-2.5">
        <input
          type="checkbox"
          required
          checked={mayorEdad}
          onChange={(e) => setMayorEdad(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-gold"
        />
        <span className="font-body text-[12.5px] leading-snug text-parchment/65">
          Confirmo que soy mayor de 18 años.
        </span>
      </label>

      {error && <p className="mt-3 font-body text-[13px] text-battle-bright">{error}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="hover-lift mt-6 w-full rounded-lg bg-battle/90 py-3.5 font-label text-sm font-semibold text-parchment transition hover:bg-battle-bright disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {enviando ? 'Enviando…' : 'Enviar postulación'}
      </button>
    </form>
  )
}
