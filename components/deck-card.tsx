"use client"
import { motion } from "framer-motion"

type Deck = "red" | "blue" | "yellow"

export function DeckCard({
  color,
  text,
  delay = 0,
  rotate = 0,
  width = "w-56 md:w-64",
  float = true,
}: {
  color: Deck
  text: string
  delay?: number
  rotate?: number
  width?: string
  float?: boolean
}) {
  const border = {
    red: "rgb(var(--red))",
    blue: "rgb(var(--blue))",
    yellow: "rgb(var(--yellow))",
  }[color]

  return (
    /* Capa 1: entrada con spring (sin keyframes) */
    <motion.div
      initial={{ y: 100, opacity: 0, rotate: rotate - 10 }}
      animate={{ y: 0, opacity: 1, rotate }}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 120, damping: 14 }}
      whileHover={{ scale: 1.06, rotate: rotate * 0.6 }}
      className={["relative", width].join(" ")}
      style={{ transformOrigin: "center" }}
    >
      {/* Capa 2: flotación con keyframes + ease (sin spring) */}
      <motion.div
        animate={float ? { y: [0, -6, 0] } : { y: 0 }}
        transition={float ? { duration: 2.4, ease: "easeInOut", repeat: Infinity } : {}}
        className={[
          "aspect-[2/3] select-none rounded-2xl bg-white text-black",
          "border-4 shadow-[0_18px_50px_-15px_rgba(0,0,0,0.35)]",
          "w-full",
        ].join(" ")}
        style={{ borderColor: border }}
      >
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <p className="text-lg font-extrabold leading-snug">{text}</p>
          <div className="text-xs opacity-70 font-semibold">¿Juego o Fuego?</div>
        </div>
      </motion.div>
    </motion.div>
  )
}
