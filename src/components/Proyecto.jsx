import Reveal from './Reveal'

export default function Proyecto() {
  return (
    <section id="proyecto" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[280px_1fr]">
        <Reveal>
          <div className="font-label text-xs font-semibold tracking-[0.15em] text-gold-bright">
            SOBRE EL PROYECTO
          </div>
          <h2 className="mt-3 font-display text-[1.8rem] leading-tight text-parchment">
            Música, fe y tecnología al servicio de los más pequeños
          </h2>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.05}>
            <p className="font-body text-[15.5px] leading-relaxed text-parchment/75">
              <strong className="text-parchment">Beneficia a los niños de la Aldea Infantil San Juan Bosco de Huánuco</strong>, integrado por 30
              pequeños de entre 5 y 14 años en situación de orfandad y abandono bajo la dirección del 
              Padre Oswaldo Rodríguez Martínez.<br /><br />

              Ya que estos niños carecen de oportunidades estructuradas de educación musical, a su vez
              no cuentan con materiales musicales (pistas, partituras) adaptados a su nivel para las celebraciones litúrgicas.<br /><br />

              <strong className="text-parchment">El Programa tiene como nombre "Puente Calicanto"</strong> ya que 
              busca tender un puente entre la formación universitaria y las necesidades reales de la comunidad.<br />
              Dicho proyecto busca producir 15 pistas musicales profesionales (10 para cuarteto de cuerdas y
              voces, y 5 para orquesta sinfónica con voces).
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-body text-[15.5px] leading-relaxed text-parchment/75">
              El nombre del proyecto es una metáfora; la cual un "calicanto" es un puente hecho de
              piedra y mortero, como el histórico puente colonial de Huánuco.
              Aquí, cada donación es una piedra que sostiene ese puente entre
              la comunidad y los niños de la Aldea.
            </p>
          </Reveal>

          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Reveal delay={0.15}>
              <div className="illuminated-border h-full rounded-xl bg-ink-deep p-5">
                <div className="font-label text-[13px] font-semibold text-gold-bright">
                  OBJETIVO
                </div>
                <div className="mt-2 font-body text-[13.5px] leading-relaxed text-parchment/70">
                  Producir pistas musicales litúrgicas profesionales para
                  fortalecer la calidad musical de los coros parroquiales del
                  Decanato de Huánuco, contribuyendo al desarrollo integral de
                  los niños de la Aldea Infantil San Juan Bosco.
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="illuminated-border h-full rounded-xl bg-ink-deep p-5">
                <div className="font-label text-[13px] font-semibold text-gold-bright">ALCANCE</div>
                <div className="mt-2 font-body text-[13.5px] leading-relaxed text-parchment/70">
                  los niños beneficiarios directos de la Aldea Infantil, junto con
                  los coros parroquiales del Decanato de Huánuco, estudiantes
                  UNDAR como productores musicales.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
