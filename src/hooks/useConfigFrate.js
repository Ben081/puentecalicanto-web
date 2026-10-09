import { useState, useEffect } from 'react'

const API_BASE = 'https://frate.lat'

export default function useConfigFrate() {
  const [config, setConfig] = useState({
    comision_pct: 5,
    fee_fijo: 0.74,
    monto_minimo: 15, // fallback, se usa si el fetch falla
    culqi_public_key: null,
    culqi_enabled: false,
  })
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/api/config`)
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) {
          setConfig({
            comision_pct: data.comision_pct,
            fee_fijo: data.fee_fijo,
            monto_minimo: data.monto_minimo,
            culqi_public_key: data.culqi_public_key || null,
            culqi_enabled: Boolean(data.culqi_enabled),
          })
        }
      })
      .catch(() => {}) // fallback silencioso, mantiene los defaults de arriba
      .finally(() => setCargando(false))
  }, [])

  return { config, cargando }
}

export { API_BASE }