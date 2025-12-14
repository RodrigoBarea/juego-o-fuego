/* app/comprar/page.tsx */
"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { motion, type MotionProps } from "framer-motion"

const WHATSAPP_NUMBER = "59162379797" // 👈 Reemplaza por tu número

// ===== Config del producto =====
const PRODUCT = {
  name: "¿Juego o Fuego? — Juego de cartas",
  priceBs: 190,
  sku: "JOF-BASE-001",
  images: [
    { src: "/producto/3 (1).jpg", alt: "Caja ¿Juego o Fuego? vista frontal" },
    { src: "/producto/4.jpg", alt: "Vista lateral del producto" },
    { src: "/producto/1.jpg", alt: "Contenido de cartas" },
    { src: "/producto/7.jpg", alt: "Detalle del emblema" },
  ],
  short:
    "Preguntas simples, votaciones épicas. El party game para romper el hielo y descubrir la vibra del grupo.",
  includes: [
    "10 pins de numeración.",
    "90 cartas de votación.",
    "180 cartas de preguntas.",
    "1 set de instrucciones.",
  ],
  // 👇 Detalles actualizados según la caja
  details: [
    "Edad recomendada: 16+",
    "Jugadores: 5–10",
    "Hecho en Bolivia",
    "Idioma: Español",
  ],
}

// Utilidad de moneda
const formatBs = (n: number) =>
  new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency: "BOB",
    maximumFractionDigits: 0,
  }).format(n)

// TIPADO + ease numérico (evita errores de Motion/Transition)
const fade: MotionProps = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function ComprarPage() {
  const [qty, setQty] = useState(1)
  const [idx, setIdx] = useState(0)

  const subtotal = useMemo(
    () => PRODUCT.priceBs * Math.max(1, qty),
    [qty]
  )

  const waText = useMemo(() => {
    const lines = [
      `👋 Hola, quiero hacer un pedido:`,
      `• Producto: ${PRODUCT.name}`,
      `• SKU: ${PRODUCT.sku}`,
      `• Cantidad: ${qty}`,
      `• Subtotal: ${formatBs(subtotal)}`,
      "",
      "Mi ciudad: ______",
      "Dirección / Punto de entrega: ______",
      "Nombre: ______",
    ]
    return encodeURIComponent(lines.join("\n"))
  }, [qty, subtotal])

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`

  return (
    <main className="bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
      <section className="relative mx-auto max-w-[1280px] px-8 lg:px-16 pt-28 sm:pt-36 pb-20">
        <div className="grid gap-14 md:grid-cols-2">
          {/* ===== Galería ===== */}
          <motion.div {...fade}>
            <div className="sticky top-10">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
                <Image
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 600px"
                  src={PRODUCT.images[idx].src}
                  alt={PRODUCT.images[idx].alt}
                  className="object-contain p-6"
                />
              </div>

              <div className="mt-5 grid grid-cols-4 gap-4">
                {PRODUCT.images.map((img, i) => (
                  <button
                    key={img.src}
                    onClick={() => setIdx(i)}
                    className={`relative aspect-[4/3] overflow-hidden rounded-xl border transition ${
                      idx === i
                        ? "border-black shadow-md"
                        : "border-black/10 hover:border-black/40"
                    }`}
                    aria-label={`Ver imagen ${i + 1}`}
                  >
                    <Image
                      fill
                      sizes="120px"
                      src={img.src}
                      alt={img.alt}
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ===== Información / Orden ===== */}
          <motion.div {...fade}>
            <div className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10 shadow-sm">
              <h2 className="text-[clamp(22px,3.4vw,30px)] font-extrabold">
                {PRODUCT.name}
              </h2>

              <p className="mt-4 text-black/70">{PRODUCT.short}</p>

              {/* Cantidad */}
              <div className="mt-6">
                <label className="mb-2 block text-sm font-semibold">
                  Cantidad
                </label>
                <div className="inline-flex items-center rounded-xl border border-black/20">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-lg hover:bg-black/5"
                    aria-label="Disminuir"
                  >
                    –
                  </button>
                  <input
                    aria-label="Cantidad"
                    inputMode="numeric"
                    className="w-12 border-x border-black/10 py-2 text-center outline-none"
                    value={qty}
                    onChange={(e) => {
                      const n =
                        Number(e.target.value.replace(/\D/g, "")) || 1
                      setQty(Math.max(1, n))
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="px-3 py-2 text-lg hover:bg-black/5"
                    aria-label="Aumentar"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-4 text-sm text-black/70">
                Subtotal:{" "}
                <span className="font-semibold text-black">
                  {formatBs(subtotal)}
                </span>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black px-4 py-3 text-[15px] font-semibold transition hover:bg-black hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.52 3.48A11.8 11.8 0 0 0 11.99 0C5.37 0 .01 5.36.01 11.98c0 2.11.55 4.18 1.6 6.01L0 24l6.18-1.61a11.93 11.93 0 0 0 5.82 1.49h.01c6.62 0 11.99-5.36 11.99-11.98 0-3.2-1.25-6.21-3.48-8.42ZM12 21.44h-.01a9.46 9.46 0 0 1-4.83-1.32l-.35-.2-3.67.95.98-3.58-.23-.37a9.44 9.44 0 0 1-1.45-5.02C2.44 6.5 6.51 2.44 12 2.44c2.52 0 4.88.98 6.66 2.76a9.36 9.36 0 0 1 2.76 6.66c0 5.49-4.47 9.58-9.42 9.58Zm5.4-7.13c-.29-.15-1.72-.85-1.99-.95-.27-.1-.47-.15-.67.15-.2.29-.77.95-.95 1.15-.17.2-.35.22-.64.07-.29-.15-1.23-.45-2.34-1.44-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.59.13-.13.29-.35.44-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.91-2.24-.24-.58-.49-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.08-.79.37-.27.29-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.72-.7 1.97-1.37.24-.67.24-1.24.17-1.37-.07-.13-.26-.2-.55-.35Z" />
                </svg>
                Ordenar por WhatsApp
              </a>

              <div className="mt-6 grid gap-4 text-sm text-black/75 sm:grid-cols-2">
                <div className="rounded-xl border border-black/10 p-3">
                  🚚 Envíos a todo Bolivia. Tracking y soporte por WhatsApp.
                </div>
                <div className="rounded-xl border border-black/10 p-3">
                  💳 Pagos por transferencia/QR. Confirmación inmediata.
                </div>
              </div>

              <div className="mt-8">
                <h3 className="mb-2 text-lg font-extrabold">Qué incluye</h3>
                <ul className="list-disc space-y-1 pl-5 text-black/75">
                  {PRODUCT.includes.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 text-lg font-extrabold">Detalles</h3>
                <ul className="list-disc space-y-1 pl-5 text-black/75">
                  {PRODUCT.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
