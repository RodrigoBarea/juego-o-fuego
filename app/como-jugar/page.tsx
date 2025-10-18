/* app/como-jugar/page.tsx */
"use client"

import { motion, type MotionProps } from "framer-motion"
import Link from "next/link"
import FlipCardColored from "@/components/flip-card-colored"

// Tipamos el preset para que el spread {...fadeUp} sea válido en todos los motion.*
const fadeUp: MotionProps = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      // usar cubic-bezier numérico evita unions problemáticos con strings ("easeOut")
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function ComoJugarPage() {
  return (
    <main className="bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
      {/* ====== HERO (con mayor margen superior) ====== */}
      <section className="relative overflow-hidden pt-28 pb-4 sm:pt-32 sm:pb-6">
        <div className="mx-auto max-w-[1150px] px-6 text-center md:text-left">
          <motion.h1
            {...fadeUp}
            className="text-[clamp(40px,7vw,88px)] font-extrabold leading-[0.95] tracking-tight"
          >
            Cómo se juega
          </motion.h1>

          <motion.p
            {...fadeUp}
            className="mt-4 max-w-[780px] mx-auto md:mx-0 text-[clamp(16px,2vw,20px)] text-black/70"
          >
            <strong>¿Juego o Fuego?</strong> es un party game que revela lo que el grupo
            realmente piensa de cada jugador. A través de preguntas sobre la vida,
            <strong> todos votan en secreto</strong> para elegir quién encaja mejor en cada situación.
            Prepárate para sorpresas: aquí, <strong>la mayoría tiene la última palabra</strong> 🔥.
          </motion.p>
        </div>
      </section>

      {/* ====== PREPARACIÓN ====== */}
      <section className="relative pt-4 pb-10 sm:pt-8 sm:pb-12">
        {/* Carta lateral izquierda */}
        <div className="pointer-events-none absolute -left-14 top-10 hidden rotate-[-10deg] md:block">
          <FlipCardColored color="yellow" text="Preparativos listos" width="w-40 md:w-52" rotate={-8} />
        </div>

        <div className="mx-auto max-w-[950px] px-6 text-center md:text-left">
          <motion.h2 {...fadeUp} className="text-[clamp(28px,4.8vw,46px)] font-extrabold">
            Preparación
          </motion.h2>

          <motion.ul
            {...fadeUp}
            className="mt-4 list-disc pl-6 md:pl-8 space-y-2 text-[clamp(15px,2vw,18px)] text-black/75"
          >
            <li>
              <strong>Asignación de números 🍻</strong>: el grupo elige al jugador más
              “borracho” como <strong>#1</strong>. Los demás reciben números en sentido horario.
              Coloca tu número doblado (tipo triángulo) visible sobre la mesa.
            </li>
            <li>
              <strong>Tarjetas de votación 🗳</strong>: cada jugador recibe tarjetas del{" "}
              <em>1…n</em>. Puedes votar por ti mismo, pero con sinceridad —solo si crees
              que te describe mejor que a cualquier otro.
            </li>
            <li>
              <strong>Primer lector 🔢</strong>: empieza el <strong>#1</strong>, luego el{" "}
              <strong>#2</strong>, y así sucesivamente.
            </li>
          </motion.ul>
        </div>
      </section>

      {/* ====== CÓMO SE JUEGA ====== */}
      <section className="relative py-10 sm:py-14">
        {/* Carta lateral derecha */}
        <div className="pointer-events-none absolute -right-14 top-10 hidden rotate-[10deg] md:block">
          <FlipCardColored color="blue" text="Voto secreto" width="w-40 md:w-52" rotate={8} />
        </div>

        <div className="mx-auto max-w-[950px] px-6 text-center md:text-left">
          <motion.h2 {...fadeUp} className="text-[clamp(28px,4.8vw,46px)] font-extrabold">
            Cómo se juega cada ronda
          </motion.h2>

          <motion.ol
            {...fadeUp}
            className="mt-4 list-decimal pl-6 md:pl-8 space-y-3 text-[clamp(15px,2vw,18px)] text-black/75"
          >
            <li>
              🃏 <strong>Selección de carta</strong>: el lector elige un mazo (rojo, azul o amarillo) y{" "}
              <strong>lee la pregunta</strong> al grupo.
            </li>
            <li>
              🤫 <strong>Votación secreta</strong>: cada jugador (incluido el lector) elige la tarjeta
              del jugador que mejor encaja y la deja boca abajo.
              <br />
              <span className="text-black/60">
                👉 Alternativa: votación abierta. El moderador cuenta “uno, dos, tres” y todos
                muestran su voto a la vez.
              </span>
            </li>
            <li>🔍 <strong>Revelación</strong>: el lector mezcla y revela los votos; se cuenta la mayoría.</li>
            <li>
              🏆 <strong>Punto</strong>: quien tuvo más votos se lleva la carta de pregunta como punto.
              Todos recuperan su tarjeta de votación.
            </li>
            <li>♻️ <strong>Cambio de lector</strong>: el turno pasa al siguiente jugador en sentido horario.</li>
          </motion.ol>

          <motion.div {...fadeUp} className="mt-6 rounded-xl border border-black/10 bg-white p-5 text-left">
            <p className="text-sm text-black/60">
              ¿Quieren más charla? Pueden añadir una <strong>fase de explicación</strong> para comentar
              por qué votaron así —más interacción y risas aseguradas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ====== MAZOS ====== */}
      <section className="relative py-10 sm:py-14">
        <div className="mx-auto max-w-[950px] px-6 text-center md:text-left">
          <motion.h2 {...fadeUp} className="text-[clamp(28px,4.8vw,46px)] font-extrabold">
            Los mazos
          </motion.h2>

          <motion.div {...fadeUp} className="mt-4 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white p-5">
              <div className="mb-3 h-8 w-8 rounded-md bg-[rgb(var(--red))]" />
              <h3 className="mb-1 font-bold">🔴 Rojo</h3>
              <p className="text-black/70">Preguntas picantes.</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-5">
              <div className="mb-3 h-8 w-8 rounded-md bg-[rgb(var(--blue))]" />
              <h3 className="mb-1 font-bold">🔵 Azul</h3>
              <p className="text-black/70">Preguntas divertidas.</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-5">
              <div className="mb-3 h-8 w-8 rounded-md bg-[rgb(var(--yellow))]" />
              <h3 className="mb-1 font-bold">🟡 Amarillo</h3>
              <p className="text-black/70">Preguntas optimistas.</p>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="mt-6 rounded-xl border border-black/10 bg-white p-5">
            <h4 className="mb-2 font-bold">😌 Modo tranqui</h4>
            <p className="text-black/70">
              Si prefieren una versión para todo público, retiren las <strong>rojas</strong> y jueguen solo
              con <strong>azules</strong> y <strong>amarillas</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ====== EMPATE / FIN ====== */}
      <section className="relative py-10 sm:py-14">
        {/* Carta lateral izquierda */}
        <div className="pointer-events-none absolute -left-12 bottom-8 hidden rotate-[8deg] md:block">
          <FlipCardColored color="red" text="¡Desempate!" width="w-40 md:w-52" rotate={8} />
        </div>

        <div className="mx-auto max-w-[950px] px-6 text-center md:text-left">
          <motion.div {...fadeUp} className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-[clamp(26px,4.4vw,40px)] font-extrabold">¿Empate?</h2>
              <ul className="mt-3 list-disc pl-6 space-y-2 text-[clamp(15px,2vw,18px)] text-black/75">
                <li>El lector decide entre los empatados; o</li>
                <li>
                  <strong>Revotación</strong> solo entre finalistas. Pueden argumentar a favor o en contra
                  antes de volver a votar 🎭.
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-[clamp(26px,4.4vw,40px)] font-extrabold">¿Cuándo termina?</h2>
              <p className="mt-3 text-[clamp(15px,2vw,18px)] text-black/75">
                Cuando se acaben las rondas acordadas o no queden cartas. Gana quien tenga{" "}
                <strong>más puntos</strong>.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="mt-8 rounded-2xl border border-black/10 bg-white p-5 text-left">
            <h3 className="mb-1 font-bold">🔥 Diagnóstico final</h3>
            <p className="text-black/70">
              Al cerrar la partida, lean el <em>Diagnóstico</em>: descubrirán qué vibra proyectó
              cada quien según los colores de cartas que acumuló. Compártanlo con el grupo… ¡y
              que empiecen las bromas! 🤣
            </p>
          </motion.div>
        </div>
      </section>

      {/* ====== CTA FINAL ====== */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-[950px] px-6 text-center">
          <motion.div
            {...fadeUp}
            className="mx-auto flex flex-col items-center justify-center gap-4 rounded-2xl border border-black/10 bg-white p-8 sm:flex-row sm:gap-6"
          >
            <div>
              <h3 className="text-[clamp(22px,3.6vw,28px)] font-extrabold">¿Listos para jugar?</h3>
              <p className="mt-1 text-black/70">Compra el juego y recíbelo en cualquier ciudad de Bolivia.</p>
            </div>
            <Link
              href="/comprar"
              className="inline-flex items-center rounded-xl border border-black px-5 py-2.5 text-[15px] font-semibold transition hover:bg-black hover:text-white"
            >
              Cómpralo ahora
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
