"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import FlipCardColored from "@/components/flip-card-colored"

export default function JuanPage() {
  // Estado para manejar el índice del video actual
  const [currentVideo, setCurrentVideo] = useState(0)

  // Lista de videos
  const videos = [
    { src: "/videos/1.mp4", title: "Video 1" },
    { src: "/videos/2.mp4", title: "Video 2" },  // Reemplazar espacio con %20
    { src: "/videos/3.mp4", title: "Video 3" },  // Reemplazar espacio con %20
    { src: "/videos/4.mp4", title: "Video 4" },  // Reemplazar espacio con %20
  ]

  // Función para cambiar al siguiente video
  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length) // Asegura que no se pase del límite
  }

  // Función para cambiar al video anterior
  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length) // Asegura que no se pase del límite
  }

  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* fondo animado con cartas */}
      <div className="pointer-events-none absolute inset-0 flex justify-center opacity-30 blur-[2px]">
        <div className="relative w-[500px] h-[500px]">
          <motion.div
            initial={{ rotate: -10, y: 40, opacity: 0 }}
            animate={{ rotate: -10, y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-0 top-10"
          >
            <FlipCardColored color="red" text="" width="w-44 md:w-52" rotate={-10} />
          </motion.div>
          <motion.div
            initial={{ rotate: 5, y: 60, opacity: 0 }}
            animate={{ rotate: 5, y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="absolute left-24 top-0"
          >
            <FlipCardColored color="blue" text="" width="w-44 md:w-52" rotate={5} />
          </motion.div>
          <motion.div
            initial={{ rotate: 15, y: 60, opacity: 0 }}
            animate={{ rotate: 15, y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="absolute left-44 top-8"
          >
            <FlipCardColored color="yellow" text="" width="w-44 md:w-52" rotate={15} />
          </motion.div>
        </div>
      </div>

      {/* texto principal */}
      <div className="relative z-10 mx-auto max-w-[680px] px-6 text-center mt-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[clamp(34px,6vw,60px)] font-extrabold leading-tight"
        >
          Miehh, qué sos chismoso... 😜
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-4 text-[clamp(16px,2vw,20px)] text-white/80"
        >
          <strong>Juan no engañó a nadie 😳</strong>
          pero ya que tenemos tu atención... 🔥<br />
          Descubre <strong>¿Juego o Fuego?</strong>, el juego de cartas que
          revela qué tanto te conocen tus amigos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/como-jugar"
            className="rounded-xl border border-white px-6 py-3 text-[15px] font-semibold transition hover:bg-white hover:text-black"
          >
            Descubre cómo se juega
          </Link>
          <Link
            href="/comprar"
            className="rounded-xl border border-white bg-white px-6 py-3 text-[15px] font-semibold text-black transition hover:bg-black hover:text-white"
          >
            Cómpralo ahora
          </Link>
        </motion.div>
      </div>

      {/* Galería de videos */}
      <div className="relative z-10 mt-16 w-full max-w-[680px] px-6 pt-8">
        <div className="aspect-w-9 aspect-h-16">
          <video
            className="w-full max-w-[500px] h-auto rounded-xl mx-auto"
            controls
          >
            <source src={videos[currentVideo].src} type="video/mp4" />
            Tu navegador no soporta este formato de video.
          </video>
        </div>

        {/* Botones para cambiar videos */}
        <div className="flex justify-between mt-4">
          <button
            onClick={prevVideo}
            className="text-white font-bold px-4 py-2 bg-black rounded-xl hover:bg-gray-800"
          >
            Anterior
          </button>
          <button
            onClick={nextVideo}
            className="text-white font-bold px-4 py-2 bg-black rounded-xl hover:bg-gray-800"
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 text-sm text-white/50"
      >

      </motion.p>
    </main>
  )
}
