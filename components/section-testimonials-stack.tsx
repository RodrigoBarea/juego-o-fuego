"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

type Deck = "red" | "blue" | "yellow"
type T = { quote: string; author: string; color: Deck }

const BG: Record<Deck, string> = {
  red: "rgb(var(--red))",
  blue: "rgb(var(--blue))",
  yellow: "rgb(var(--yellow))",
}
const FG: Record<Deck, string> = {
  red: "text-white",
  blue: "text-white",
  yellow: "text-black",
}

const DATA: T[] = [
  { quote: "¡Increíble juego! Terminamos llorando de risa y conociéndonos más.", author: "Camila — Santa Cruz", color: "yellow" },
  { quote: "Las preguntas azules rompen el hielo al toque. Súper dinámico.", author: "Javier — Cochabamba", color: "blue" },
  { quote: "Lo sacamos en familia y nadie quería parar. Muy recomendado.", author: "Lucía — La Paz", color: "red" },
  { quote: "Simple, picante y divertido. Ideal para grupos grandes.", author: "Andrés — Tarija", color: "yellow" },
]

export default function SectionTestimonialsStack({
  autoplay = true,
  intervalMs = 5200,
}: {
  autoplay?: boolean
  intervalMs?: number
}) {
  const [i, setI] = useState(0)
  const next = () => setI(v => (v + 1) % DATA.length)
  const prev = () => setI(v => (v - 1 + DATA.length) % DATA.length)

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(next, intervalMs)
    return () => clearInterval(id)
  }, [autoplay, intervalMs])

  // para el stack mostramos i-1, i, i+1
  const trio = useMemo(() => {
    const left = DATA[(i - 1 + DATA.length) % DATA.length]
    const center = DATA[i]
    const right = DATA[(i + 1) % DATA.length]
    return { left, center, right }
  }, [i])

  return (
    <section className="relative overflow-hidden bg-[rgb(var(--bg))] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <h2 className="mb-10 text-center text-3xl font-extrabold sm:text-4xl">Testimonios</h2>

        <div className="relative mx-auto flex max-w-5xl items-center justify-center">
          {/* Flecha izquierda */}
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute -left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-black/20 p-2 text-black/70 transition hover:bg-black/5 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Stack */}
          <div className="relative h-[360px] w-full sm:h-[420px]">
            {/* Izquierda (asoma) */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`${i}-left`}
                initial={{ opacity: 0, x: -40, rotate: -8, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, rotate: -8, scale: 0.92 }}
                exit={{ opacity: 0, x: -60, rotate: -8, scale: 0.9 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute left-[6%] top-6 hidden w-[240px] sm:block md:w-[260px]"
              >
                <Card color={trio.left.color} quote={trio.left.quote} author={trio.left.author} muted />
              </motion.div>
            </AnimatePresence>

            {/* Centro (legible) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${i}-center`}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute left-1/2 top-0 w-[min(92%,640px)] -translate-x-1/2 sm:w-[min(80%,680px)]"
              >
                <Card color={trio.center.color} quote={trio.center.quote} author={trio.center.author} />
              </motion.div>
            </AnimatePresence>

            {/* Derecha (asoma) */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`${i}-right`}
                initial={{ opacity: 0, x: 40, rotate: 8, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, rotate: 8, scale: 0.92 }}
                exit={{ opacity: 0, x: 60, rotate: 8, scale: 0.9 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute right-[6%] top-6 hidden w-[240px] sm:block md:w-[260px]"
              >
                <Card color={trio.right.color} quote={trio.right.quote} author={trio.right.author} muted />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Flecha derecha */}
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute -right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-black/20 p-2 text-black/70 transition hover:bg-black/5 sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {DATA.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Ir al testimonio ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-1.5 w-1.5 rounded-full transition ${i === idx ? "bg-black" : "bg-black/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
   Card: respeta el look de nuestras cartas (color de mazo, borde suave,
   sombra, radios grandes y badge inferior). En móvil es 1 sola carta centrada.
   muted = reduce contraste en laterales.
--------------------------------------------------------------------------- */
function Card({
  color,
  quote,
  author,
  muted = false,
}: {
  color: Deck
  quote: string
  author: string
  muted?: boolean
}) {
  return (
    <div
      className={`relative rounded-3xl border border-black/15 ${FG[color]} shadow-[0_22px_44px_-18px_rgba(0,0,0,.45)]`}
      style={{ backgroundColor: BG[color] }}
    >
      <div className="flex flex-col justify-between px-6 py-7 sm:px-7 sm:py-8 md:px-8 md:py-9">
        <div className={`mb-2 text-4xl leading-none ${muted ? "opacity-60" : "opacity-80"}`}>“</div>
        <p
          className={`text-[clamp(16px,2.1vw,22px)] font-semibold leading-snug ${
            muted ? "opacity-70" : "opacity-100"
          }`}
        >
          {quote}
        </p>
        <p className={`mt-4 text-sm ${muted ? "opacity-60" : "opacity-90"}`}>— {author}</p>

        {/* Badge */}
        <div className="mt-6 flex items-center justify-center">
          <div className="relative h-6 w-6">
            <Image
              src="/logos/card-front-badge-black.png"
              alt="¿Juego o Fuego? — badge"
              fill
              sizes="24px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
