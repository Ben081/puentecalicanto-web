const LOWERCASE_PARTICLES = new Set(['de', 'del', 'la', 'las', 'los', 'y'])

function toTitleCase(text) {
  return text
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word, i) =>
      i > 0 && LOWERCASE_PARTICLES.has(word)
        ? word
        : word
            .split('-')
            .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
            .join('-')
    )
    .join(' ')
}

export function normalizeFullName(nombre, apellido) {
  const n = toTitleCase(nombre || '')
  const a = toTitleCase(apellido || '')
  return [n, a].filter(Boolean).join(' ').trim()
}
