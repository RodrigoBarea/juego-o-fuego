// components/section-testimonials-cards.tsx
"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

type Img = { src: string; alt: string }
type Item = {
  quote: string
  author: string
  img?: Img // opcional
}

/** Fallbacks “de mesa” */
const FALLBACK_POOL: Img[] = [
  { src: "/images/_A744704.jpg", alt: "Manos colocando cartas durante la partida" },
  { src: "/images/_A744796.jpg", alt: "Mesa completa con cartas y vasos" },
  { src: "/images/_A744665.jpg", alt: "Equipo celebrando con un high-five" },
  { src: "/images/_A744743.jpg", alt: "Cartas de colores repartidas en la mesa" },
  { src: "/images/_A744643-2.jpg", alt: "Risas alrededor de la mesa mientras juegan" },
]

/** Tus testimonios. Pueden venir sin img */
const DATA: Item[] = [
  { quote: "¡Increíble juego! Terminamos llorando de risa y conociéndonos más.", author: "Camila — Santa Cruz" },
  { quote: "Las preguntas azules rompen el hielo al toque. Súper dinámico.", author: "Javier — Cochabamba" },
  { quote: "Lo sacamos en familia y nadie quería parar. Muy recomendado.", author: "Lucía — La Paz" },
  { quote: "Simple, picante y divertido. Ideal para grupos grandes.", author: "Andrés — Tarija" },
]

/** Elige un fallback estable por índice */
function fallbackFor(index: number): Img {
  return FALLBACK_POOL[index % FALLBACK_POOL.length]
}

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

  // si una imagen falla, probamos otra del pool
  const [errorBump, setErrorBump] = useState(0)

  // evita intervalos demasiado bajos o recreados frecuentemente
  const stableInterval = useMemo(() => Math.max(2500, intervalMs), [intervalMs])

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(next, stableInterval)
    return () => clearInterval(id)
  }, [autoplay, stableInterval])

  const item = DATA[i]
  // si no trae img => fallback; si hubo error => rotamos a la siguiente del pool
  const baseImg = item.img ?? fallbackFor(i)
  const img: Img =
    item.img ??
    FALLBACK_POOL[(i + errorBump) % FALLBACK_POOL.length]

  return (
    <section className="relative overflow-hidden py-20 sm:py-24 bg-[rgb(var(--blue))]">
      {/* textura animada de fondo */}
      <div className="absolute inset-0 bg-[url('/patterns/cards-pattern.svg')] bg-cover bg-center opacity-10 animate-[slow-pan_40s_linear_infinite]" />
      <style jsx>{`
        @keyframes slow-pan {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-[1150px] px-6 sm:px-8">
        <h2 className="text-center text-3xl font-extrabold sm:text-4xl text-white">
          “Lo jugamos y pasó esto.”
        </h2>
        <p className="mt-2 mb-8 text-center text-white/85">
          Risas, confesiones y momentos que nadie vio venir.
        </p>

        {/* tarjeta + foto */}
        <div className="relative mx-auto mt-6 grid w-full max-w-[1000px] grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch">
          {/* Tarjeta */}
          <div className="relative">
            <button
              onClick={prev}
              aria-label="Anterior"
              className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/60 p-2 text-white/90 backdrop-blur-sm hover:bg-white/10 transition md:block"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${i}`}
                initial={{ opacity: 0, y: 18, rotate: 1 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -18, rotate: -1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full"
              >
                <div className="h-full rounded-2xl border border-black/10 bg-white text-black shadow-[0_24px_60px_-18px_rgba(0,0,0,0.35)] p-8 sm:p-10 flex">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl leading-none text-black/50 select-none">“</div>
                    <div className="flex min-w-0 flex-col">
                      <p className="text-[20px] leading-snug font-normal text-black">
                        {item.quote}
                      </p>
                      <p className="mt-4 text-sm text-black/60">{item.author}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={next}
              aria-label="Siguiente"
              className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/60 p-2 text-white/90 backdrop-blur-sm hover:bg-white/10 transition md:block"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Foto */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${i}-${img.src}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl ring-8 ring-white/90 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.35)]"
            >
              {/* Aspect ratio fijo para evitar reflow */}
              <div className="relative w-full pt-[70%] sm:pt-[66%] md:pt-[90%]">
                <Image
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 92vw, (max-width: 1100px) 44vw, 480px"
                  priority
                  unoptimized    // <- evita problemas de optimización en dev
                  onError={() => {
                    // si falla, prueba otra del pool en el próximo render
                    setErrorBump(b => b + 1)
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controles móviles */}
          <div className="col-span-1 md:col-span-2 mt-2 flex items-center justify-between md:hidden">
            <button
              onClick={prev}
              aria-label="Anterior"
              className="rounded-full border border-white/60 p-2 text-white/90 backdrop-blur-sm hover:bg-white/10 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <Dots total={DATA.length} activeIndex={i} />
            <button
              onClick={next}
              aria-label="Siguiente"
              className="rounded-full border border-white/60 p-2 text-white/90 backdrop-blur-sm hover:bg-white/10 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Indicadores */
function Dots({ total, activeIndex }: { total: number; activeIndex: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, idx) => (
        <span
          key={idx}
          className={[
            "block h-2 w-2 rounded-full",
            idx === activeIndex ? "bg-white" : "bg-white/40",
          ].join(" ")}
        />
      ))}
    </div>
  )
}
