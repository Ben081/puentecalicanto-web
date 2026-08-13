export const rounds = [
  { titulo: 'Estudiantes UNDAR se capacitan en MuseScore y Ableton Live / Pro Tools.', eje: 1 },
  { titulo: '15 pistas profesionales (10 para cuarteto de cuerdas y voces, 5 para orquesta sinfónica) con sus partituras.', eje: 2 },
  { titulo: 'Talleres musicales para los 30 niños de la Aldea San Juan Bosco y capacitación al personal y las parroquias en el uso litúrgico de las pistas.', eje: 3 },
  { titulo: 'Una campaña de recaudación de fondos cubre los costos de producción y financia nuevas etapas del proyecto.', eje: 4 },
]

export const ejes = {
  1: 'Formación',
  2: 'Producción',
  3: 'Difusión',
  4: 'Sostenibilidad',
}

export const cronograma = [
  {
    mes: 'FASE 1',
    titulo: 'Planificacion, Elaboración y Capacitación',
    detalle:
      'Arranque del programa, selección de las 15 canciones litúrgicas y capacitación de los estudiantes en MuseScore y Ableton Live / Pro Tools.',
  },
  {
    mes: 'FASE 2',
    titulo: 'Arreglos Musicales',
    detalle:
      'Elaboración de los arreglos para cuarteto de cuerdas y voces (10 canciones) y para orquesta sinfónica con voces (5 canciones).',
  },
  {
    mes: 'FASE 3',
    titulo: 'Producción del Audio',
    detalle:
      'Grabación, mezcla y masterización de las 15 pistas hasta obtener el material final en calidad profesional.',
  },
  {
    mes: 'FASE 4',
    titulo: 'Primeros Usos con la Comunidad',
    detalle:
      'Presentación de las primeras pistas a la Aldea Infantil San Juan Bosco y talleres piloto para su uso en ensayos corales y celebraciones litúrgicas.',
  },
  {
    mes: 'FASE 5',
    titulo: 'Acompañamiento y Seguimiento',
    detalle:
      'Capacitación en manejo básico de equipos de sonido y visitas de seguimiento a las parroquias para evaluar el uso de las pistas.',
  },
  {
    mes: 'FASE 6',
    titulo: 'Cierre y Evaluación',
    detalle:
      'Al cierre de esta primera etapa, se presentará una propuesta para una segunda etapa del proyecto, que continuaría con la producción de material litúrgico para el siguiente ciclo del calendario católico.',
  },
]

export const instituciones = [
  { nombre: 'Aldea Infantil San Juan Bosco', logo: '/logos/aldea.svg'},
  { nombre: 'Diócesis de Huánuco', logo: '/logos/diocesis.svg'},
  { nombre: 'UNDAR', logo: '/logos/UNDAR.svg' },
]

export const aliados = [
  { nombre: 'ALDEA INFANTIL SAN JUAN BOSCO', rol: 'Dirigida por el Padre Oswaldo Rodríguez Martínez, Vicario de la Diócesis de Huánuco. Aporta la logística, la convocatoria de los niños y la validación pastoral.' },
  { nombre: 'DIÓCESIS DE HUÁNUCO', rol: 'Colabora a través de sus parroquias en la difusión del proyecto y en la validación litúrgica del material musical producido.' },
  { nombre: 'ESCUELAS DE CATEQUISTAS DEL DECANATO DE HUÁNUCO', rol: 'Sus líderes de coros parroquiales, directores de canto y catequistas participan en el acompañamiento pastoral y la validación litúrgica.' },
  { nombre: 'PARROQUIAS DEL DECANATO DE HUÁNUCO', rol: 'Vinculadas a través de los coros parroquiales, donde se realizan los talleres y el seguimiento del uso de las pistas.' },
]

export const equipo = [
  { nombre: 'Dr. Aland Bravo Vecorena', rol: 'Coordinador y Productor Musical · Docente Auxiliar UNDAR' },
  { nombre: 'Dr. Roberto Carlos Cárdenas Viviano', rol: 'Especialista en Arreglos Musicales · Docente Asociado' },
  { nombre: 'Dr. Esio Ocaña Igarza', rol: 'Especialista en Arreglos Musicales · Docente Asociado' },
  { nombre: 'Mgtr. Alan Manuel Rubín Robles', rol: 'Especialista en Gestión Administrativa' },
  { nombre: 'Lic. Sulema Sofía Medina Fermín', rol: 'Especialista en Psicología · Bienestar Universitario' },
]

export function initials(name) {
  return name
    .replace(/^(Dr\.|Dra\.|Mgtr\.|Lic\.)\s*/, '')
    .split(' ')
    .filter((w) => w[0] === w[0].toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
}
