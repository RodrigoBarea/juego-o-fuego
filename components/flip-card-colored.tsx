// components/flip-card-colored.tsx
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"

type Deck = "red" | "blue" | "yellow"

const FRONT_BY_COLOR: Record<Deck, string> = {
  red: "rgb(var(--red))",
  blue: "rgb(var(--blue))",
  yellow: "rgb(var(--yellow))",
}

const BACK_BY_COLOR: Record<Deck, string> = {
  red: "/logos/card-back-red.png",
  blue: "/logos/card-back-blue.png",
  yellow: "/logos/card-back-yellow.png",
}

export default function FlipCardColored({
  color,
  text,
  delay = 0,
  width = "w-56 md:w-64",
  rotate = 0,
  /** eventos para que el padre “suba” esta carta */
  onActivate,
  onDeactivate,
}: {
  color: Deck
  text: string
  delay?: number
  width?: string
  rotate?: number
  onActivate?: () => void
  onDeactivate?: () => void
}) {
  const isCoarse = useMemo(
    () => typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches,
    []
  )

  const [flipped, setFlipped] = useState(true)   // true = muestra reverso (negro)
  const [hovered, setHovered] = useState(false)

  // En móviles: solo tap. En desktop: hover + tap
  const handleMouseEnter = () => {
    if (!isCoarse) {
      setFlipped(false)
      setHovered(true)
      onActivate?.()
    }
  }
  const handleMouseLeave = () => {
    if (!isCoarse) {
      setFlipped(true)
      setHovered(false)
      onDeactivate?.()
    }
  }

  const handleClick = () => {
    setFlipped(v => {
      const next = !v
      if (!v) {
        // estaba frente → pasará a reverso
        onDeactivate?.()
      } else {
        // estaba reverso → pasará a frente (mostrar texto)
        onActivate?.()
      }
      return next
    })
  }

  // Por si el usuario deja el dedo sobre la carta (iOS), limpiamos “hover”
  useEffect(() => {
    if (isCoarse && hovered) setHovered(false)
  }, [isCoarse, hovered])

  return (
    <motion.div
      initial={{ y: 60, opacity: 0, rotate: rotate - 6 }}
      animate={{ y: 0, opacity: 1, rotate }}
      transition={{ delay, duration: 0.45, type: "spring", stiffness: 120, damping: 16 }}
      className={`relative ${width} aspect-[2/3] select-none`}
      style={{ transformStyle: "preserve-3d", zIndex: hovered ? 1000 : 10 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={!isCoarse ? { scale: 1.08, y: -16 } : undefined}
    >
      {/* FRENTE (texto) */}
      <motion.div
        initial={{ rotateY: 180 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 rounded-2xl border border-black/20 [backface-visibility:hidden] overflow-hidden"
        style={{
          backgroundColor: FRONT_BY_COLOR[color],
          boxShadow: "0 24px 56px -18px rgba(0,0,0,0.5)",
          zIndex: 20,
        }}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="p-5" />
          <p className="px-5 pb-4 text-center text-[18px] leading-snug font-semibold text-black">
            {text}
          </p>
          <div className="flex items-center justify-center pb-4">
            <div className="relative h-7 w-7">
              <Image
                src="/logos/card-front-badge-black.png"
                alt="¿Juego o Fuego? — badge"
                fill
                sizes="28px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* REVERSO */}
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: flipped ? 0 : -180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 rounded-2xl [backface-visibility:hidden] overflow-hidden"
        style={{
          rotateY: 180,
          backgroundColor: "#000",
          boxShadow: "0 22px 44px -16px rgba(0,0,0,0.6)",
          zIndex: 5,
        }}
      >
        <div className="flex h-full items-center justify-center">
          <div className="relative h-20 w-20 md:h-24 md:w-24">
            <Image
              src={BACK_BY_COLOR[color]}
              alt={`¿Juego o Fuego? — reverso ${color}`}
              fill
              sizes="(min-width: 1024px) 96px, 80px"
              className="object-contain"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
