"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

const DATA = [
  { quote: "¡Increíble juego! Terminamos llorando de risa y conociéndonos más.", author: "Camila — Santa Cruz" },
  { quote: "Las preguntas azules rompen el hielo al toque. Súper dinámico.", author: "Javier — Cochabamba" },
  { quote: "Lo sacamos en familia y nadie quería parar. Muy recomendado.", author: "Lucía — La Paz" },
  { quote: "Simple, picante y divertido. Ideal para grupos grandes.", author: "Andrés — Tarija" },
]

export default function SectionTestimonialsCards({
  autoplay = true,
  intervalMs = 5000,
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

  const item = DATA[i]

  return (
    <section className="relative overflow-hidden py-20 sm:py-24 bg-[rgb(var(--blue))]">
      {/* Textura animada de fondo (paso 1) */}
      <div className="absolute inset-0 bg-[url('/patterns/cards-pattern.svg')] bg-cover bg-center opacity-10 animate-[slow-pan_40s_linear_infinite]" />
      <style jsx>{`
        @keyframes slow-pan {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-[1150px] px-6 sm:px-8">
        {/* Título + subtítulo (paso 3) */}
        <h2 className="text-center text-3xl font-extrabold sm:text-4xl text-white">
          “Lo jugamos y pasó esto.”
        </h2>
        <p className="mt-2 mb-8 text-center text-white/85">
          Risas, confesiones y momentos que nadie vio venir.
        </p>

        {/* Slider */}
        <div className="relative mx-auto mt-6 flex w-full items-center justify-center">
          {/* Flecha izquierda */}
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute -left-10 top-1/2 -translate-y-1/2 rounded-full border border-white/50 p-2 text-white/80 hover:bg-white/10 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Tarjeta del testimonio */}
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18, rotate: 1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -18, rotate: -1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="w-full flex justify-center"
            >
              <div className="w-full max-w-[900px] rounded-2xl border border-black/10 bg-white text-black shadow-[0_24px_60px_-18px_rgba(0,0,0,0.35)] p-8 sm:p-12">
                <div className="flex items-start gap-4">
                  <div className="text-5xl leading-none text-black/50">“</div>
                  <div className="flex flex-col">
                    <p className="text-[20px] leading-snug font-normal text-black">
                      {item.quote}
                    </p>
                    <p className="mt-4 text-sm text-black/60">{item.author}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Flecha derecha */}
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute -right-10 top-1/2 -translate-y-1/2 rounded-full border border-white/50 p-2 text-white/80 hover:bg-white/10 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
