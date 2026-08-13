import Reveal from './Reveal'
import ConvocatoriaForm from './ConvocatoriaForm'

export default function Convocatoria() {
  return (
    <section id="convocatoria" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal className="max-w-xl">
        <div className="font-label text-xs font-semibold tracking-[0.15em] text-gold-bright">
          CONVOCATORIA
        </div>
        <h2 className="mt-3 font-display text-[1.8rem] leading-tight text-parchment">
          Únete al equipo
        </h2>
        <p className="mt-3 font-body text-[14px] leading-relaxed text-parchment/60">
          Súmate como voluntario, productor musical o arreglista al Programa
          Puente Calicanto. Buscamos estudiantes de la UNDAR y profesionales
          comprometidos con la música litúrgica.
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mx-auto mt-10 max-w-lg">
          <ConvocatoriaForm />
        </div>
      </Reveal>
    </section>
  )
}
