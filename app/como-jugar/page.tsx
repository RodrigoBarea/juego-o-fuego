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
            className="mt-4 max-w-[780px] mx-auto md:mx-0 text-[clamp(16px,2vw,20px)] text-black/70 text-justify md:text-left"
          >
            <strong>¿Juego o Fuego?</strong> es un party game pensado para revelar qué{" "}
            <strong>realmente</strong> piensa el grupo de cada jugador. A través de preguntas sobre
            distintas facetas de la vida, <strong>todos votan en secreto</strong> para elegir quién
            encaja mejor en cada situación. Ronda tras ronda irán apareciendo secretos y sorpresas:
            aquí, <strong>el voto de la mayoría tiene la última palabra.</strong>
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
            className="mt-4 list-disc pl-6 md:pl-8 space-y-2 text-[clamp(15px,2vw,18px)] text-black/75 text-justify md:text-left"
          >
            <li>
              <strong>Asignación de números</strong>: el grupo decide quién es el jugador más{" "}
              <strong>borracho</strong>. Esa persona será el <strong>#1</strong> y los demás reciben
              números en sentido de las agujas del reloj. Cada jugador dobla su número en forma de
              triángulo y lo coloca visible sobre la mesa como identificador.
            </li>
            <li>
              <strong>Tarjetas de votación</strong>: cada jugador recibe tarjetas numeradas del{" "}
              <em>1…n</em>, donde <em>n</em> es el total de jugadores (por ejemplo, si hay 6
              jugadores, las tarjetas van del 1 al 6). Puedes votar por ti mismo, pero con
              sinceridad: solo si de verdad crees que la pregunta te describe mejor que a cualquier
              otro.
            </li>
            <li>
              <strong>Primer lector</strong>: el jugador <strong>#1</strong> será el primero en leer
              una carta. Luego seguirá el <strong>#2</strong>, y así sucesivamente.
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
            className="mt-4 list-decimal pl-6 md:pl-8 space-y-3 text-[clamp(15px,2vw,18px)] text-black/75 text-justify md:text-left"
          >
            <li>
              <strong>Elección del mazo y carta</strong>: el lector elige de qué mazo (rojo, azul o
              amarillo) sacar una carta de pregunta para esa ronda. Cada mazo tiene su identificador
              visible sobre la mesa.
            </li>
            <li>
              <strong>Lectura de la pregunta</strong>: el lector toma una carta del mazo elegido y
              lee en voz alta la pregunta al grupo.
            </li>
            <li>
              <strong>Votación secreta</strong>: cada jugador (incluido el lector) selecciona en
              secreto la tarjeta de votación con el número del jugador que mejor encaja con la
              pregunta y la deja boca abajo sobre la mesa.
              <br />
              <span className="text-black/60">
                Alternativa: si el grupo lo prefiere, pueden hacer una votación abierta. El
                moderador cuenta “uno, dos, tres” y, a la de tres, todos muestran su voto al mismo
                tiempo.
              </span>
            </li>
            <li>
              <strong>Revelación de votos</strong>: una vez que todos hayan votado, el lector mezcla
              las tarjetas para mantener el anonimato y luego las revela una por una.
            </li>
            <li>
              <strong>Conteo y punto</strong>: se cuentan los votos y el jugador con mayoría se
              lleva la carta de pregunta como punto. Después, cada jugador recupera su tarjeta de
              votación.
            </li>
            <li>
              <strong>Cambio de lector</strong>: el turno de lector pasa al siguiente jugador en
              sentido horario, que elegirá un mazo y comenzará una nueva ronda.
            </li>
          </motion.ol>

          <motion.div
            {...fadeUp}
            className="mt-6 rounded-xl border border-black/10 bg-white p-5 text-left text-justify md:text-left"
          >
            <h4 className="mb-2 font-bold">Reglas adicionales (opcionales)</h4>
            <p className="text-sm text-black/70">
              <strong>Fase de explicación:</strong> después de revelar los votos, pueden añadir una
              fase en la que cada persona explique por qué votó como votó. Suele generar risas y
              discusiones divertidas, añadiendo más interacción al juego.
            </p>
            <p className="mt-2 text-sm text-black/70">
              <strong>Regla de bebida:</strong> si quieren acompañar el juego con unas copas, cada
              vez que un jugador gane un punto puede tomar una cantidad de bebida previamente
              acordada entre todos. Si alguien no quiere beber, puede hacer un pequeño reto en su
              lugar.
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
            <div className="rounded-2xl border border-black/10 bg-white p-5 text-justify md:text-left">
              <div className="mb-3 h-8 w-8 rounded-md bg-[rgb(var(--red))]" />
              <h3 className="mb-1 font-bold">Rojo</h3>
              <p className="text-black/70">Preguntas picantes.</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-5 text-justify md:text-left">
              <div className="mb-3 h-8 w-8 rounded-md bg-[rgb(var(--blue))]" />
              <h3 className="mb-1 font-bold">Azul</h3>
              <p className="text-black/70">Preguntas divertidas.</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-5 text-justify md:text-left">
              <div className="mb-3 h-8 w-8 rounded-md bg-[rgb(var(--yellow))]" />
              <h3 className="mb-1 font-bold">Amarillo</h3>
              <p className="text-black/70">Preguntas optimistas.</p>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="mt-6 rounded-xl border border-black/10 bg-white p-5 text-justify md:text-left"
          >
            <h4 className="mb-2 font-bold">Modo familiar</h4>
            <p className="text-black/70">
              Si prefieren una versión más apta para todo público, retiren las cartas{" "}
              <strong>rojas</strong> y jueguen solo con las cartas <strong>azules</strong> y{" "}
              <strong>amarillas</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ====== EMPATE / FIN ====== */}
      <section className="relative py-10 sm:py-14">
        {/* Carta lateral izquierda */}
        <div className="pointer-events-none absolute -left-12 bottom-8 hidden rotate-[8deg] md:block">
          <FlipCardColored color="red" text="Desempate" width="w-40 md:w-52" rotate={8} />
        </div>

        <div className="mx-auto max-w-[950px] px-6 text-center md:text-left">
          <motion.div {...fadeUp} className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-[clamp(26px,4.4vw,40px)] font-extrabold">¿Empate?</h2>
              <ul className="mt-3 list-disc pl-6 space-y-2 text-[clamp(15px,2vw,18px)] text-black/75 text-justify md:text-left">
                <li>
                  Por regla general, <strong>el lector decide</strong> quién es el ganador entre los
                  jugadores empatados.
                </li>
                <li>
                  Alternativa: pueden hacer una <strong>revotación</strong> solo entre los
                  finalistas. Antes de volver a votar, cualquiera puede dar argumentos a favor o en
                  contra de un jugador para tratar de convencer al resto del grupo.
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-[clamp(26px,4.4vw,40px)] font-extrabold">¿Cuándo termina?</h2>
              <p className="mt-3 text-[clamp(15px,2vw,18px)] text-black/75 text-justify md:text-left">
                El juego termina cuando se alcanzan el número de rondas acordadas o cuando se agotan
                las cartas de preguntas. Gana quien tenga <strong>más puntos</strong> (más cartas de
                preguntas acumuladas).
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="mt-8 rounded-2xl border border-black/10 bg-white p-5 text-justify md:text-left"
          >
            <h3 className="mb-1 font-bold">Diagnóstico final</h3>
            <p className="text-black/70">
              Al terminar la partida, lean el <em>Diagnóstico</em>: descubrirán cómo los percibió el
              grupo, qué energía proyectó cada quien y cuál fue su “vibra” dominante según los
              colores de cartas que acumuló. Compártanlo con el grupo y dejen que comiencen las
              bromas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ====== CTA FINAL ====== */}
       {/* ====== CTA FINAL ====== */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-[950px] px-6 text-center">
          <motion.div
            {...fadeUp}
            className="mx-auto flex flex-col items-center justify-center gap-4 rounded-2xl border border-black/10 bg-white p-8 sm:flex-row sm:gap-6 text-justify sm:text-left"
          >
            <div>
              <h3 className="text-[clamp(22px,3.6vw,28px)] font-extrabold">¿Listos para jugar?</h3>
              <p className="mt-1 text-black/70">
                Compra el juego y recíbelo en cualquier ciudad de Bolivia.
              </p>
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
