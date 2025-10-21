export default function SectionSummary() {
  return (
    <section className="relative overflow-hidden bg-[rgb(var(--yellow))]">
      <div className="mx-auto w-[80%] max-w-6xl px-8 py-20 sm:py-24">
        <p className="text-[clamp(22px,2.6vw,36px)] leading-[1.35] text-black/90">
          Listo para convertir tus reuniones en noches inolvidables. <br />
          Preguntas Simples, Votaciones Épicas.
        </p>

        <p className="mt-8 text-[clamp(22px,2.6vw,36px)] leading-[1.35] text-black/90">
          En casa ronda alguien lee una pregunta y todos votan en secreto por quien encaja mejor eligiendo una carta de las 3 categorías: 
          <strong> Rojas</strong> (Picantes), <strong>Azules</strong> (Divertidas) y <strong>Amarillas</strong> (Optimistas). 
          Cada jugador elige qué carta sacar y las risas quedan registradas.
        </p>

        <p className="mt-8 text-[clamp(22px,2.6vw,36px)] leading-[1.35] text-black/90">
          Si buscan algo más chill, jueguen en <em>modo tranqui</em> solo con azules y amarillas. 
          Al final lean el <strong>Diagnóstico</strong> y descubrirán la vibra que el grupo vio en cada uno.
        </p>
      </div>
    </section>
  )
}
