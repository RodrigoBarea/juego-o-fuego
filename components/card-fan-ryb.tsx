// components/card-fan-ryb.tsx
"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import FlipCardColored from "./flip-card-colored"

type ColorKey = "red" | "blue" | "yellow"
type LayoutItem = { styl:{ left:string; top:string; rotate?:number }; width:string }

export default function CardFanRYB({
  red, blue, yellow,
}: { red:string; blue:string; yellow:string }) {
  const [hovered, setHovered] = useState<number | null>(null)     // desktop
  const [activeIdx, setActiveIdx] = useState<number | null>(null) // móvil: carta “arriba”

  const layout: LayoutItem[] = [
    { styl: { left: "8%",  top: "6%", rotate: -10 }, width: "w-56 md:w-64" },
    { styl: { left: "28%", top: "0%", rotate: -4  }, width: "w-56 md:w-64" },
    { styl: { left: "48%", top: "8%", rotate: 6   }, width: "w-56 md:w-64" },
  ]

  const items = [
    { color: "red" as ColorKey, text: red },
    { color: "blue" as ColorKey, text: blue },
    { color: "yellow" as ColorKey, text: yellow },
  ]

  return (
    <>
      {/* DESKTOP (>= lg) */}
      <div className="relative hidden h-[62vh] w-full overflow-visible lg:block" style={{ perspective: 1200 }}>
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
                filter: isHover ? "none" : "drop-shadow(0 8px 22px rgba(0,0,0,0.25))",
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
        <div className="mx-auto w-full px-1">
          <div
            className="
              mx-auto flex items-end justify-center
              max-w-[90vw] sm:max-w-[88vw]
              -space-x-1.5 sm:-space-x-2
              pt-1
            "
            // desplazamiento base hacia la izquierda
            style={{ transform: "translateX(-8px)" }} // ← más a la izquierda
          >
            {items.map((it, i) => {
              const rot = i === 0 ? -3.5 : i === 1 ? -1.2 : 2.8
              const insetX = i === 0 ? 6 : i === 2 ? -10 : 0 // mete la amarilla
              const isActive = activeIdx === i

              return (
                <motion.div
                  key={i}
                  className="relative will-change-transform transform-gpu"
                  animate={isActive ? { scale: 1.06, y: -6 } : { y: [0, -3, 0] }}
                  transition={
                    isActive
                      ? { type: "spring", stiffness: 260, damping: 20 }
                      : { duration: 2.4 + i * 0.12, ease: [0.42, 0, 0.58, 1], repeat: Infinity }
                  }
                  style={{
                    rotate: rot,
                    x: insetX,
                    zIndex: isActive ? 999 : i + 1,
                    filter: isActive ? "drop-shadow(0 18px 40px rgba(0,0,0,0.35))" : undefined,
                  }}
                >
                  <div
                    className="
                      w-[clamp(7.6rem,31.5vw,10.2rem)]
                      sm:w-[clamp(8.8rem,29vw,11.4rem)]
                      max-[360px]:w-[8rem]
                    "
                  >
                    <FlipCardColored
                      color={it.color}
                      text={it.text}
                      // al mostrar el frente, sube esta carta
                      onActivate={() => setActiveIdx(i)}
                      // al volver al reverso, baja
                      onDeactivate={() => setActiveIdx(prev => (prev === i ? null : prev))}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
