// components/section-testimonials.tsx
"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

type T = { quote: string; author: string; href?: string }

const ITEMS: T[] = [
  { quote: "¡Increíble juego! Terminamos llorando de risa y conociéndonos más.", author: "Camila — Santa Cruz" },
  { quote: "Las preguntas azules rompen el hielo al toque. Súper dinámico.", author: "Javier — Cochabamba" },
  { quote: "Lo jugamos en familia y nadie quería parar. Muy recomendado.", author: "Lucía — La Paz" },
  { quote: "Simple, picante y divertido. Ideal para grupos grandes.", author: "Andrés — Tarija" },
]

export default function SectionTestimonials({
  autoplay = true,
  intervalMs = 6000,
}: {
  autoplay?: boolean
  intervalMs?: number
}) {
  const [i, setI] = useState(0)
  const next = () => setI((v) => (v + 1) % ITEMS.length)
  const prev = () => setI((v) => (v - 1 + ITEMS.length) % ITEMS.length)

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(next, intervalMs)
    return () => clearInterval(id)
  }, [autoplay, intervalMs])

  const t = ITEMS[i]

  return (
    <section className="bg-[rgb(var(--bg))] py-14 sm:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        {/* TARJETA HORIZONTAL */}
        <div className="relative mx-auto w-full rounded-[18px] border border-black bg-white shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="
                flex items-center gap-6 sm:gap-8
                px-6 py-6 sm:px-10 sm:py-10
                min-h-[180px] sm:min-h-[220px]      /* altura baja = horizontal */
              "
            >
              {/* Flecha izq (dentro) */}
              <button
                onClick={prev}
                aria-label="Anterior"
                className="mr-1 hidden sm:inline-flex rounded-full border border-black p-2 text-black hover:bg-black/5 transition"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Comilla a la izquierda */}
              <div className="hidden flex-shrink-0 text-[56px] leading-none text-black/60 sm:block">“</div>

              {/* Texto a la derecha (ancho) */}
              <div className="flex min-w-0 flex-1 flex-col">
                <blockquote className="text-balance text-[clamp(20px,2vw,28px)] font-extrabold leading-snug text-black">
                  {t.quote}
                </blockquote>
                <p className="mt-3 text-sm text-black underline underline-offset-4">
                  — {t.author}
                </p>
              </div>

              {/* Flecha der (dentro) */}
              <button
                onClick={next}
                aria-label="Siguiente"
                className="ml-1 hidden sm:inline-flex rounded-full border border-black p-2 text-black hover:bg-black/5 transition"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Flechas móviles (fuera para no encoger el contenido) */}
          <div className="flex items-center justify-between px-4 pb-4 sm:hidden">
            <button
              onClick={prev}
              aria-label="Anterior"
              className="rounded-full border border-black p-2 text-black hover:bg-black/5 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Siguiente"
              className="rounded-full border border-black p-2 text-black hover:bg-black/5 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
