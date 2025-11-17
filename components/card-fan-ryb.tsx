"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import FlipCardColored from "./flip-card-colored"

type ColorKey = "red" | "blue" | "yellow"
type LayoutItem = { styl:{ left:string; top:string; rotate?:number }; width:string }

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
  const [activeMobileColor, setActiveMobileColor] = useState<ColorKey>("blue")

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

  const activeMobile = items.find(c => c.color === activeMobileColor)!

  return (
    <>
      {/* ===== DESKTOP (abanico igual que antes) ===== */}
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

      {/* ===== MÓVIL / TABLET: una carta centrada ===== */}
      <div className="relative lg:hidden flex flex-col items-center gap-4 pt-3">
        {/* Carta grande */}
        <div className="w-[min(72vw,15.5rem)]">
          <FlipCardColored
            color={activeMobile.color}
            text={activeMobile.text}
          />
        </div>

        {/* Selector de color */}
        <div className="flex items-center gap-3 mt-1">
          {items.map(card => {
            const isActive = card.color === activeMobileColor

            const bg =
              card.color === "red"
                ? "bg-[rgb(var(--red))]"
                : card.color === "blue"
                ? "bg-[rgb(var(--blue))]"
                : "bg-[rgb(var(--yellow))]"

            return (
              <button
                key={card.color}
                type="button"
                onClick={() => setActiveMobileColor(card.color)}
                className={[
                  "h-4 w-4 rounded-full border border-black/15",
                  bg,
                  isActive ? "scale-110 ring-2 ring-black/40" : "opacity-70",
                  "transition-transform",
                ].join(" ")}
                aria-label={card.color}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
