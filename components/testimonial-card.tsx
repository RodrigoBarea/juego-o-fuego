"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

type Deck = "red" | "blue" | "yellow"
type Variant = "card" | "review" | "wide" // 👈 NUEVO

const BG: Record<Deck, string> = {
  red: "rgb(var(--red))",
  blue: "rgb(var(--blue))",
  yellow: "rgb(var(--yellow))",
}
const TEXT: Record<Deck, string> = {
  red: "text-white",
  blue: "text-white",
  yellow: "text-black",
}
const BACK_BY_COLOR: Record<Deck, string> = {
  red: "/logos/card-back-red.png",
  blue: "/logos/card-back-blue.png",
  yellow: "/logos/card-back-yellow.png",
}

export default function TestimonialCard({
  color = "yellow",
  quote,
  author,
  variant = "card",       // por defecto, carta vertical
  width = "w-64 md:w-72",
  rotate = 0,
  canFlip = true,
}: {
  color?: Deck
  quote: string
  author: string
  variant?: Variant
  width?: string
  rotate?: number
  canFlip?: boolean
}) {
  const [flipped, setFlipped] = useState(false)
  const [hovered, setHovered] = useState(false)

  /* ─────────────────────────────
   * VARIANTE WIDE (estilo carta, horizontal)
   * ───────────────────────────── */
  if (variant === "wide") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full"
      >
        <div
          className={[
            "relative mx-auto",
            "max-w-[880px]",     // 👈 menos ancha (ajusta si quieres 820/900)
            "rounded-3xl border border-black", // borde como carta
            "shadow-[0_22px_44px_-18px_rgba(0,0,0,.35)]",
            "px-8 sm:px-12 py-10 sm:py-12",
            TEXT[color],
          ].join(" ")}
          style={{ backgroundColor: BG[color] }}
        >
          {/* Flechas dentro, centradas verticalmente */}
          <button
            aria-label="Anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-black p-2 text-black/80 hover:bg-black/10 transition"
          >
            {/* Las flechas se manejan afuera en la sección; este botón lo "ocupa" visualmente */}
          </button>

          <button
            aria-label="Siguiente"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-black p-2 text-black/80 hover:bg-black/10 transition"
          />

          {/* Contenido centrado (comilla, texto, autor) */}
          <div className="text-center">
            <div className={`mb-4 text-5xl leading-none ${color === "yellow" ? "text-black/70" : "text-white/80"}`}>“</div>

            <p className={`mx-auto max-w-[680px] text-[clamp(18px,2.2vw,26px)] font-extrabold leading-snug ${
              color === "yellow" ? "text-black" : "text-white"
            }`}>
              {quote}
            </p>

            <p className={`mt-5 text-sm underline underline-offset-4 ${
              color === "yellow" ? "text-black/80" : "text-white/90"
            }`}>
              — {author}
            </p>
          </div>

          {/* Badge inferior centrado como en la carta */}
          <div className="mt-8 flex items-center justify-center">
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
      </motion.div>
    )
  }

  /* ─────────────────────────────
   * VARIANTE REVIEW (blanca horizontal)
   * ───────────────────────────── */
  if (variant === "review") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-[980px] rounded-[18px] border border-black bg-white shadow-sm"
      >
        <div className="flex items-center gap-6 sm:gap-8 px-6 py-6 sm:px-10 sm:py-10 min-h-[180px] sm:min-h-[220px]">
          <div className="hidden sm:block flex-shrink-0 text-[56px] leading-none text-black/60">“</div>
          <div className="min-w-0 flex-1">
            <p className="text-balance text-[clamp(20px,2vw,28px)] font-extrabold leading-snug text-black">
              {quote}
            </p>
            <p className="mt-3 text-sm text-black underline underline-offset-4">
              — {author}
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  /* ─────────────────────────────
   * VARIANTE CARD (vertical original)
   * ───────────────────────────── */
  return (
    <motion.div
      initial={{ y: 30, opacity: 0, rotate: rotate - 4 }}
      animate={{ y: 0, opacity: 1, rotate }}
      transition={{ duration: 0.45, type: "spring", stiffness: 120, damping: 16 }}
      className={`relative ${width} aspect-[2/3] select-none`}
      style={{ transformStyle: "preserve-3d", zIndex: hovered ? 1000 : 10 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.04, y: -8 }}
      onClick={() => { if (canFlip) setFlipped(v => !v) }}
    >
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`absolute inset-0 overflow-hidden rounded-2xl border border-black/15 [backface-visibility:hidden] ${TEXT[color]}`}
        style={{
          backgroundColor: BG[color],
          boxShadow: hovered ? "0 28px 60px -18px rgba(0,0,0,0.55)" : "0 18px 40px -18px rgba(0,0,0,0.45)",
          zIndex: 20,
        }}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="px-5 pt-5 text-4xl/none opacity-80">“</div>
          <div className="px-5">
            <p className="text-center text-[18px] md:text-[20px] font-semibold leading-snug">
              {quote}
            </p>
            <p className="mt-4 text-center text-sm opacity-80">— {author}</p>
          </div>
          <div className="flex items-center justify-center pb-4">
            <div className="relative h-7 w-7">
              <Image src="/logos/card-front-badge-black.png" alt="¿Juego o Fuego? — badge" fill sizes="28px" className="object-contain" />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ rotateY: -180 }}
        animate={{ rotateY: flipped ? 0 : -180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 overflow-hidden rounded-2xl [backface-visibility:hidden]"
        style={{ background: "#000", rotateY: 180, boxShadow: "0 22px 44px -16px rgba(0,0,0,0.6)", zIndex: 5 }}
      >
        <div className="flex h-full items-center justify-center">
          <div className="relative h-20 w-20 md:h-24 md:w-24">
            <Image src={BACK_BY_COLOR[color]} alt="¿Juego o Fuego? — reverso" fill sizes="96px" className="object-contain" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
