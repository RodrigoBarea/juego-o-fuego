// components/collage3-slider.tsx
"use client"

import Image from "next/image"
import { useState } from "react"

type Img = { src: string; alt: string }

export default function Collage3Slider({ images }: { images: Img[] }) {
  const [i, setI] = useState(0)
  const n = images.length
  const go = (dir: -1 | 1) => setI((p) => (p + dir + n) % n)
  const goto = (k: number) => setI(k)

  return (
    <div className="relative" aria-label="Galería de fotos">
      {/* Viewport con altura fija (evita saltos/errores de carga) */}
      <div className="relative overflow-hidden rounded-2xl ring-8 ring-white shadow-[0_16px_48px_rgba(0,0,0,0.18)] h-[260px] xs:h-[280px]">
        {/* Track */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={img.src + idx} className="relative min-w-full">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="100vw"
                // pre-carga el slide visible, los demás lazy
                priority={idx === i}
                loading={idx === i ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Flechas */}
        <button
          onClick={() => go(-1)}
          aria-label="Anterior"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur px-3 py-2 text-black shadow hover:bg-white"
        >
          ‹
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Siguiente"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur px-3 py-2 text-black shadow hover:bg-white"
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {images.map((_, k) => (
          <button
            key={k}
            aria-label={`Ir a imagen ${k + 1}`}
            onClick={() => goto(k)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              k === i ? "bg-black/80" : "bg-black/25 hover:bg-black/40"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
