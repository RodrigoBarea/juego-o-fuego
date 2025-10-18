"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import FlipCardRed from "./flip-card-red"

/**
 * Abanico de 3 cartas rojas.
 * - En desktop: “fan” con posiciones absolutas.
 * - En mobile: fila simple.
 * - La carta en hover/tap pasa AL FRENTE (z-index alto) y se eleva.
 */
export default function CardFanRed({ questions }: { questions: string[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  // Layout desktop
  const layout = [
    { style: { left: "5%", bottom: "8%", rotate: -12 }, scale: 0.98, z: 10 },
    { style: { left: "32%", bottom: "10%", rotate: -2 },  scale: 1.02, z: 20 }, // central
    { style: { right: "6%", bottom: "8%", rotate: 12 },  scale: 0.98, z: 12 },
  ]

  return (
    <>
      {/* Desktop */}
      <div
        className="relative hidden h-[62vh] w-full overflow-visible lg:block"
        style={{ perspective: 1200 }}
      >
        {questions.slice(0, 3).map((q, i) => {
          const isHover = hovered === i
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                ...layout[i].style,
                transformOrigin: "50% 85%",
                // 👇 sube MUY arriba en el apilado cuando está en hover
                zIndex: isHover ? 10_000 : layout[i].z,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              // animación de “respirar”
              animate={{
                y: isHover ? -18 : 0,
                scale: isHover ? 1.08 : layout[i].scale,
              }}
              transition={{ type: "tween", duration: 0.18 }}
            >
              <FlipCardRed text={q} />
            </motion.div>
          )
        })}
      </div>

{/* MOBILE/TABLET: SOLO < lg (desktop intacto) */}
<div
  className="relative lg:hidden overflow-visible"
  style={{ perspective: 1200 }}
>
  <div className="mx-auto flex w-full max-w-[92vw] items-end justify-center -space-x-5 sm:-space-x-7 pt-2">
    {questions.slice(0, 3).map((q, i) => (
      <motion.div
        key={i}
        className="rotate-[-6deg] first:rotate-[-4deg] last:rotate-[4deg]"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.6 + i * 0.15, ease: "easeInOut", repeat: Infinity }}
      >
        {/* tamaño controlado SOLO en mobile */}
        <div className="w-[clamp(8rem,40vw,12rem)] sm:w-[clamp(10rem,34vw,14rem)]">
          <FlipCardRed text={q} />
        </div>
      </motion.div>
    ))}
  </div>
</div>

    </>
  )
}
