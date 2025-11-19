// components/section-faq.tsx
"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import type { ReactNode } from "react"

type Faq = {
  q: string
  a: ReactNode
  color?: "red" | "blue" | "yellow"
}

const FAQS: Faq[] = [
  { q: "De qué trata Juego o Fuego?", a: (<p>Es un juego de preguntas y <strong>votaciones secretas</strong> para decidir quién encaja mejor en cada situación. El objetivo es reír, sorprenderse y descubrir cómo percibe el grupo a cada jugador. Gana quien acumula más puntos.</p>), color: "yellow" },
  { q: "Cómo me preparo para empezar?", a: (<ul className="list-disc pl-5 space-y-2"><li><strong>Asigna números</strong> a los jugadores (1…n) y colócalos visibles.</li><li><strong>Entrega tarjetas de votación</strong> numeradas a cada jugador (1…n).</li><li>El jugador <strong>#1 lee primero</strong>; el #2 le sigue, y así sucesivamente.</li></ul>), color: "blue" },
  { q: "Cómo se juega cada ronda?", a: (<ol className="list-decimal pl-5 space-y-2"><li>El lector elige un mazo (rojo, azul o amarillo) y lee la carta.</li><li>Todas las personas votan en secreto quién encaja mejor.</li><li>Se revela la mayoría y esa persona gana un punto.</li></ol>), color: "red" },
  { q: "Qué diferencia hay entre los mazos?", a: (<ul className="list-disc pl-5 space-y-2"><li><strong>Rojo:</strong> preguntas picantes.</li><li><strong>Azul:</strong> preguntas divertidas.</li><li><strong>Amarillo:</strong> preguntas optimistas.</li></ul>), color: "yellow" },
  { q: "Las votaciones son siempre secretas?", a: (<p>Por defecto sí (tarjeta boca abajo). Si el grupo lo prefiere, pueden hacer una <strong>votación abierta</strong> al conteo de “1, 2, 3”.</p>), color: "blue" },
  { q: "Qué pasa si hay empate?", a: (<ul className="list-disc pl-5 space-y-2"><li>El lector decide quién gana entre los empatados; o</li><li>Se hace una <strong>nueva votación</strong> solo entre finalistas.</li></ul>), color: "red" },
  { q: "Cuándo termina el juego?", a: (<p>Al completar el número de rondas acordadas o cuando se acaban las cartas. Gana quien tenga más puntos.</p>), color: "yellow" },
  { q: "Qué es el “Modo tranqui”?", a: (<p>Si quieren algo más chill, jueguen con <strong>solo azules y amarillas</strong> (sin rojas).</p>), color: "blue" },
  { q: "Qué es el “Diagnóstico final”?", a: (<p>Al terminar, lean el Diagnóstico: el juego “describe” la vibra que proyectó cada persona según los colores de cartas que ganó (rojas, azules, amarillas).</p>), color: "yellow" },
  { q: "Hay reglas opcionales?", a: (<ul className="list-disc pl-5 space-y-2"><li><strong>Explicar el voto</strong> para sumar debate y humor.</li><li><strong>Regla de bebida</strong> (o pequeños retos) por cada punto, si el grupo quiere.</li></ul>), color: "red" },
  { q: "Cómo compro el juego en la web?", a: (<p>Entra a <strong>Comprar</strong>, añade el juego al carrito y confirma tus datos. Te contactamos por WhatsApp o correo con los detalles de envío y pago.</p>), color: "blue" },
  { q: "Qué formas de pago aceptan?", a: (<p>Tarjeta, QR y <strong>transferencias interbancarias</strong>. Si necesitas otro método, escríbenos y te ayudamos.</p>), color: "yellow" },
  { q: "Hacen envíos a toda Bolivia?", a: (<p>Sí. Enviamos a capitales y provincias, con <strong>tracking</strong> y soporte por WhatsApp. El tiempo depende de tu ciudad y transportadora.</p>), color: "blue" },
  { q: "Puedo devolver o cambiar mi pedido?", a: (<p>Si hubo un problema con tu producto o llegó dañado, <strong>contáctanos dentro de 48 h</strong> con fotos y número de pedido para gestionar el cambio.</p>), color: "red" },
  { q: "Para qué tipo de grupo es?", a: (<p>Ideal para <strong>grupos de amigos</strong> en ambiente relajado y de confianza, porque algunas preguntas pueden ser picantes o revelar opiniones fuertes.</p>), color: "yellow" },
]

const TINT = {
  red: "hover:bg-[rgb(var(--red))/0.06]",
  blue: "hover:bg-[rgb(var(--blue))/0.06]",
  yellow: "hover:bg-[rgb(var(--yellow))/0.08]",
} as const

const BAR = {
  red: "before:bg-[rgb(var(--red))]",
  blue: "before:bg-[rgb(var(--blue))]",
  yellow: "before:bg-[rgb(var(--yellow))]",
} as const

const ICON_BORDER = {
  red: "border-[rgb(var(--red))] text-[rgb(var(--red))]",
  blue: "border-[rgb(var(--blue))] text-[rgb(var(--blue))]",
  yellow: "border-[rgb(var(--yellow))] text-[rgb(var(--yellow))]",
} as const

const UNDERLINE = {
  red: "group-hover:underline decoration-[rgb(var(--red))] underline-offset-[6px] decoration-2",
  blue: "group-hover:underline decoration-[rgb(var(--blue))] underline-offset-[6px] decoration-2",
  yellow: "group-hover:underline decoration-[rgb(var(--yellow))] underline-offset-[6px] decoration-2",
} as const

export default function SectionFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faqs" className="bg-white text-black py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1100px] px-6">
        <h2 className="text-[clamp(36px,6vw,68px)] font-extrabold tracking-tight text-center">
          Preguntas frecuentes
        </h2>
        <p className="mt-2 mb-10 text-center text-black/60">
          Todo lo que querías saber (y un poco más).
        </p>

        <div className="mt-6 border-t border-black/10">
          {FAQS.map((item, idx) => {
            const isOpen = open === idx
            const tint = item.color ? TINT[item.color] : "hover:bg-black/[.03]"
            const bar = item.color ? BAR[item.color] : ""
            const icon = item.color ? ICON_BORDER[item.color] : "border-black/15 text-black/60"
            const underline = item.color ? UNDERLINE[item.color] : "group-hover:underline decoration-black/40 underline-offset-[6px] decoration-2"

            return (
              <div key={idx} className="border-b border-black/10">
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className={`group relative w-full flex items-start justify-between gap-3 rounded-xl px-4 py-4 sm:px-6 sm:py-5 transition ${tint}
                    before:absolute before:left-0 before:top-3 before:bottom-3 before:w-1.5 before:rounded-full ${bar} before:opacity-0 group-hover:before:opacity-80
                    ${isOpen ? "ring-1 ring-black/10 bg-black/[.02] before:opacity-100" : ""}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                >
                  {/* Bloque de texto: ocupa todo el ancho posible y se mantiene alineado a la izquierda */}
                  <div className="flex-1 min-w-0 pr-2">
                    <span
                      className={`block text-left whitespace-normal text-[clamp(18px,3vw,26px)] font-semibold leading-snug ${underline}`}
                    >
                      {item.q}
                    </span>
                  </div>

                  {/* Icono */}
                  <span
                    className={`ml-2 mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full border transition
                      ${isOpen ? icon : "border-black/15 text-black/60 group-hover:bg-black/5"}`}
                    aria-hidden
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-6 pr-2 leading-relaxed text-[clamp(15px,2vw,18px)] text-black/75 text-left">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
