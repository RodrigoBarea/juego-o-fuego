"use client"

import { motion } from "framer-motion"
import { useState } from "react"

type Deck = "red" | "blue" | "yellow"

const COLORS: Record<Deck, { front: string; accent: string }> = {
  red:    { front: "rgb(var(--red))",    accent: "#E53935" },
  blue:   { front: "rgb(var(--blue))",   accent: "#1E88E5" },
  yellow: { front: "rgb(var(--yellow))", accent: "#FEE440" },
}

/**
 * FlipCard
 * - Cara A (frente): fondo sólido del mazo + pregunta + badge negro inferior
 * - Cara B (lomo): fondo negro + "badge" cuadrado del color del mazo (simula el logo)
 * - Hover/Tap: giro 3D, elevación y sombra natural
 */
export function FlipCard({
  color,
  text,
  delay = 0,
  width = "w-56 md:w-64",
  rotate = 0,
}: {
  color: Deck
  text: string
  delay?: number
  width?: string
  rotate?: number
}) {
  const [flipped, setFlipped] = useState(false)
  const [z, setZ] = useState(1)

  return (
    <motion.div
      initial={{ y: 70, opacity: 0, rotate: rotate - 6 }}
      animate={{ y: 0, opacity: 1, rotate }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 120, damping: 14 }}
      className={`relative ${width} select-none`}
      style={{ transformStyle: "preserve-3d", zIndex: z }}
      onMouseEnter={() => { setFlipped(true); setZ(50) }}
      onMouseLeave={() => { setFlipped(false); setZ(1) }}
      onTouchStart={() => setFlipped((v) => !v)}
      whileHover={{ scale: 1.05 }}
    >
      {/* Cara A — frente con pregunta */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
        className="absolute inset-0 [backface-visibility:hidden] rounded-2xl border border-black/20 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] overflow-hidden"
        style={{ backgroundColor: COLORS[color].front, transformStyle: "preserve-3d" }}
      >
        <div className="flex h-full flex-col items-center justify-between p-6">
          <div className="mt-8" />
          <p className="px-4 text-center text-[18px] leading-snug font-semibold text-black">
            {text}
          </p>

          {/* badge negro inferior (placeholder de isotipo) */}
          <div className="mb-3 h-7 w-7 rounded-md bg-black" />
        </div>
      </motion.div>

      {/* Cara B — lomo negro con “logo” de color (placeholder sin imagen) */}
      <motion.div
        animate={{ rotateY: flipped ? 0 : -180 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
        className="absolute inset-0 [backface-visibility:hidden] rounded-2xl shadow-[0_22px_44px_-16px_rgba(0,0,0,0.6)] overflow-hidden"
        style={{ transformStyle: "preserve-3d", rotateY: 180, backgroundColor: "#000" }}
      >
        <div className="flex h-full items-center justify-center">
          {/* “Logo” de color: bloque cuadrado con notch simple usando clip-path */}
          <div
            className="h-40 w-40 md:h-44 md:w-44"
            style={{
              background: COLORS[color].accent,
              clipPath:
                "polygon(0% 0%, 88% 0%, 100% 12%, 100% 100%, 0% 100%)", // simula la muesca
              boxShadow: "0 16px 40px -18px rgba(0,0,0,0.55)",
              borderRadius: "10px",
            }}
            aria-hidden
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
