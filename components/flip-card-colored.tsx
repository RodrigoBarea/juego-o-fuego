"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

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
  const [flipped, setFlipped] = useState(true)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ y: 60, opacity: 0, rotate: rotate - 6 }}
      animate={{ y: 0, opacity: 1, rotate }}
      transition={{ delay, duration: 0.45, type: "spring", stiffness: 120, damping: 16 }}
      className={`relative ${width} aspect-[2/3] select-none isolate`} /* 👈 isolate */
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        zIndex: hovered ? 1000 : 10,
      }}
      onMouseEnter={() => { setFlipped(false); setHovered(true); onActivate?.() }}
      onMouseLeave={() => { setFlipped(true);  setHovered(false); onDeactivate?.() }}
      onMouseDown={() => onActivate?.()}
      onMouseUp={() => onDeactivate?.()}
      onTouchStart={() => { setFlipped(v => !v); onActivate?.() }}
      onTouchEnd={() => onDeactivate?.()}
      onTouchCancel={() => onDeactivate?.()}
      whileHover={{ scale: 1.08, y: -16 }}
    >
      {/* FRENTE */}
      <motion.div
        initial={{ rotateY: 180 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
        className="absolute inset-0 rounded-2xl border border-black/20 [backface-visibility:hidden] overflow-hidden"
        style={{
          backgroundColor: FRONT_BY_COLOR[color],
          boxShadow: hovered
            ? "0 28px 60px -18px rgba(0,0,0,0.55)"
            : "0 18px 40px -18px rgba(0,0,0,0.45)",
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
        transition={{ duration: 0.55, ease: "easeInOut" }}
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
