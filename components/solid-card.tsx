"use client"

import { motion } from "framer-motion"
import { useState } from "react"

type Deck = "red" | "blue" | "yellow"

const BG: Record<Deck, string> = {
  red: "rgb(var(--red))",
  blue: "rgb(var(--blue))",
  yellow: "rgb(var(--yellow))",
}

export function SolidCard({
  color,
  text,
  rotate = 0,
  width = "w-56 md:w-64",
  delay = 0,
}: {
  color: Deck
  text: string
  rotate?: number
  width?: string
  delay?: number
}) {
  const [z, setZ] = useState(1)

  return (
    <motion.div
      initial={{ y: 80, opacity: 0, rotate: rotate - 8 }}
      animate={{ y: 0, opacity: 1, rotate }}
      transition={{ delay, duration: 0.55, type: "spring", stiffness: 120, damping: 14 }}
      onHoverStart={() => setZ(100)}
      onHoverEnd={() => setZ(1)}
      whileHover={{ y: -12, scale: 1.08, rotate: rotate * 0.6 }}
      style={{ zIndex: z }}
      className={[
        "relative",
        width,
      ].join(" ")}
    >
      {/* carta llena color sólido */}
      <div
        className={[
          "aspect-[2/3] rounded-2xl shadow-[0_18px_50px_-15px_rgba(0,0,0,0.35)]",
          "border border-black/20 flex flex-col items-center justify-between",
        ].join(" ")}
        style={{ background: BG[color] }}
      >
        {/* espacio superior para respirar */}
        <div className="mt-8" />

        {/* texto centrado – usa color oscuro como en tu muestra */}
        <p className="px-6 text-center text-[18px] font-semibold leading-snug text-black/85">
          {text}
        </p>

        {/* “logo” placeholder (cambiarás por tu SVG/PNG) */}
        <div className="mb-4 rounded-md bg-black text-[10px] font-black uppercase tracking-widest text-white px-2 py-1">
          ¿Juego o Fuego? (logo)
        </div>
      </div>
    </motion.div>
  )
}
