// components/card-fan-ryb.tsx
"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import FlipCardColored from "./flip-card-colored"

type ColorKey = "red" | "blue" | "yellow"

type LayoutItem = {
  styl: {
    left: string
    top: string
    rotate?: number
  }
  width: string
}

export default function CardFanRYB({
  red,
  blue,
  yellow,
}: {
  red: string
  blue: string
  yellow: string
}) {
  const [hovered, setHovered] = useState<number | null>(null)

  // layout desktop (similar al abanico actual)
  const layout: LayoutItem[] = [
    { styl: { left: "8%", top: "6%", rotate: -10 }, width: "w-56 md:w-64" }, // izquierda — roja
    { styl: { left: "28%", top: "0%", rotate: -4 }, width: "w-56 md:w-64" }, // centro  — azul
    { styl: { left: "48%", top: "8%", rotate: 6 }, width: "w-56 md:w-64" }, // derecha — amarilla
  ]

  const items: Array<{ color: ColorKey; text: string }> = [
    { color: "red", text: red },
    { color: "blue", text: blue },
    { color: "yellow", text: yellow },
  ]

  return (
    <>
      {/* DESKTOP (>= lg) */}
      <div
        className="relative hidden h-[62vh] w-full overflow-visible lg:block"
        style={{ perspective: 1200 }}
      >
        {items.map((it, i) => {
          const isHover = hovered === i
          const rot = layout[i]?.styl.rotate ?? 0
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: layout[i].styl.left,
                top: layout[i].styl.top,
                zIndex: isHover ? 1000 : i + 1,
                filter: isHover
                  ? "none"
                  : "drop-shadow(0 8px 22px rgba(0,0,0,0.25))",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <FlipCardColored
                color={it.color}
                text={it.text}
                width={layout[i].width}
                rotate={rot}
              />
            </motion.div>
          )
        })}
      </div>

      {/* MOBILE/TABLET (< lg) */}
      <div className="relative lg:hidden overflow-visible" style={{ perspective: 1200 }}>
        <div className="mx-auto flex w-full max-w-[92vw] items-end justify-center -space-x-5 sm:-space-x-7 pt-2">
          {items.map((it, i) => (
            <motion.div
              key={i}
              className="rotate-[-6deg] first:rotate-[-4deg] last:rotate-[4deg]"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2.6 + i * 0.15,
                // easeInOut en números (cubic-bezier) => evita error de TS
                ease: [0.42, 0, 0.58, 1],
                repeat: Infinity,
              }}
            >
              <div className="w-[clamp(8rem,40vw,12rem)] sm:w-[clamp(10rem,34vw,14rem)]">
                <FlipCardColored color={it.color} text={it.text} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
