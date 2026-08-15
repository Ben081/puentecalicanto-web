export default function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-ink-deep">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-4">
          <div>
            <div className="font-display text-lg text-parchment">
              Puente Calicanto 2026
            </div>
            <p className="mt-2 font-body text-[13px] leading-relaxed text-parchment/55">
              Programa RSUEC · Facultad de Educación Musical y Artes · UNDAR
            </p>
          </div>

          <div>
            <div className="font-label text-xs font-semibold tracking-[0.1em] text-gold-bright">
              EXPLORA
            </div>
            <ul className="mt-3 flex flex-col gap-2 font-body text-[13.5px] text-parchment/65">
              <li><a href="#proyecto" className="hover:text-parchment">Proyecto</a></li>
              <li><a href="#aliados" className="hover:text-parchment">Aliados</a></li>
              <li><a href="#equipo" className="hover:text-parchment">Equipo</a></li>
              <li><a href="#cronograma" className="hover:text-parchment">Cronograma</a></li>
            </ul>
          </div>

          <div>
            <div className="font-label text-xs font-semibold tracking-[0.1em] text-gold-bright">
              CONTACTO
            </div>
            <ul className="mt-3 flex flex-col gap-2 font-body text-[13.5px] text-parchment/65">
              <li>
                <a href="mailto:info@frate.lat" className="hover:text-parchment">
                  info@frate.lat
                </a>
              </li>
              <li className="text-parchment/45">Huánuco, Perú</li>
            </ul>
          </div>

          <div>
            <div className="font-label text-xs font-semibold tracking-[0.1em] text-gold-bright">
              LEGAL
            </div>
            <ul className="mt-3 flex flex-col gap-2 font-body text-[13.5px] text-parchment/65">
              <li><a href="https://frate.lat/reclamaciones" target="_blank" rel="noopener noreferrer" className="hover:text-parchment">Libro de Reclamaciones</a></li>
              <li><a href="https://frate.lat/privacidad" target="_blank" rel="noopener noreferrer" className="hover:text-parchment">Política de Privacidad</a></li>
              <li><a href="https://frate.lat/terminos" target="_blank" rel="noopener noreferrer" className="hover:text-parchment">Términos y Condiciones</a></li>
              <li><a href="https://frate.lat" target="_blank" rel="noopener noreferrer" className="hover:text-parchment">Sitio oficial</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gold/10 pt-6 font-body text-[12.5px] text-parchment/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Puente Calicanto: Ecosistema de
            Crowdfunding para la Producción de Pistas Musicales Litúrgicas.
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
