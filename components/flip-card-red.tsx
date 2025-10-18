"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

/** Default: reverso negro visible. Hover/tap: muestra frente rojo y pasa al frente. */
export default function FlipCardRed({
  text,
  delay = 0,
  width = "w-56 md:w-64",
  rotate = 0,
}: {
  text: string
  delay?: number
  width?: string
  rotate?: number
}) {
  // ⬇️ ARRANCA NEGRO (lomo)
  const [flipped, setFlipped] = useState(true)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ y: 60, opacity: 0, rotate: rotate - 6 }}
      animate={{ y: 0, opacity: 1, rotate }}
      transition={{ delay, duration: 0.45, type: "spring", stiffness: 120, damping: 16 }}
      className={`relative ${width} aspect-[2/3] select-none`}
      style={{
        transformStyle: "preserve-3d",
        zIndex: hovered ? 1000 : 10,       // 👈 sube al frente al hacer hover
      }}
      onMouseEnter={() => { setFlipped(false); setHovered(true) }}
      onMouseLeave={() => { setFlipped(true);  setHovered(false) }}
      onTouchStart={() => setFlipped(v => !v)}
      whileHover={{ scale: 1.08, y: -16 }} // elevación para que no quede tapada
    >
      {/* FRENTE — ROJO con pregunta + badge */}
      <motion.div
        // 👇 IMPORTANTE: inicial igual al estado (para evitar flash)
        initial={{ rotateY: 180 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
        className="absolute inset-0 rounded-2xl border border-black/20 [backface-visibility:hidden] overflow-hidden"
        style={{
          backgroundColor: "rgb(var(--red))",
          // sombra más fuerte cuando está al frente
          boxShadow: hovered
            ? "0 28px 60px -18px rgba(0,0,0,0.55)"
            : "0 18px 40px -18px rgba(0,0,0,0.45)",
          zIndex: 20,
        }}
      >
        <div className="flex h-full flex-col items-center justify-between p-6">
          <div className="mt-10" />
          <p className="px-6 text-center text-[18px] leading-snug font-semibold text-black">
            {text}
          </p>
          <div className="mb-4 h-7 w-7 relative">
            <Image
              src="/logos/card-front-badge-black.png"
              alt="¿Juego o Fuego? — badge"
              fill
              sizes="28px"
              className="object-contain"
            />
          </div>
        </div>
      </motion.div>

      {/* REVERSO — NEGRO con logo rojo pequeño */}
      <motion.div
        // 👇 inicial correcto para que se vea negro desde el principio
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
          {/* tamaño pequeño como en tu referencia */}
          <div className="relative h-20 w-20 md:h-24 md:w-24">
            <Image
              src="/logos/card-back-red.png"
              alt="¿Juego o Fuego? — reverso rojo"
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
