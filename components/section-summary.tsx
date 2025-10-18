export default function SectionSummary() {
  return (
    <section className="relative overflow-hidden bg-[rgb(var(--yellow))]">
      <div className="mx-auto w-[80%] max-w-6xl px-8 py-20 sm:py-24">
        <p className="text-[clamp(22px,2.6vw,36px)] leading-[1.35] text-black/90">
          En <strong>¿Juego o Fuego?</strong> cada ronda alguien lee una pregunta y
          <strong> todos votan en secreto</strong> quién encaja mejor. Las cartas se
          dividen en <strong>rojas</strong> (picantes), <strong>azules</strong> (divertidas)
          y <strong>amarillas</strong> (optimistas). La mayoría decide y las risas quedan registradas.
        </p>

        <p className="mt-8 text-[clamp(22px,2.6vw,36px)] leading-[1.35] text-black/90">
          Si buscan algo más chill, jueguen el <em>modo tranqui</em> solo con azules y amarillas.
          Al final, lean el <strong>Diagnóstico</strong>: descubrirán la vibra que el grupo vio en cada uno.
        </p>
      </div>
    </section>
  )
}
