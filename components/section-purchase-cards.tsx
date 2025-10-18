import Link from "next/link"
import { Button } from "@/components/ui/button"


export default function SectionPurchaseCards({
  productHref = "/producto/juego-o-fuego",
}: { productHref?: string }) {
  const cards = [
    {
      badge: "ENVÍOS",
      title: "Envíos a todo Bolivia.",
      desc: "Llegamos a todas las capitales y provincias. Tracking y soporte por WhatsApp.",
      bg: "bg-[rgb(var(--yellow))]",
      fg: "text-black",
    },
    {
      badge: "PAGOS EN LÍNEA",
      title: "Tarjeta, QR y transferencia.",
      desc: "Pagá como prefieras: tarjetas, QR bancario y transferencias interbancarias seguras.",
      bg: "bg-[rgb(var(--blue))]",
      fg: "text-white",
    },
    {
      badge: "PEDIDO FÁCIL",
      title: "Compra en 2 minutos.",
      desc: "Proceso simple, confirmación inmediata y atención ante cualquier duda.",
      bg: "bg-[rgb(var(--red))]",
      fg: "text-white",
    },
  ]

  return (
    <section className="relative overflow-hidden bg-[rgb(var(--bg))] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
<h2 className="mb-10 text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
  Cómo conseguir tu juego.
</h2>


        {/* Grid de tarjetas */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <article
              key={i}
              className={[
                "relative rounded-3xl p-6 sm:p-8",
                "shadow-[0_20px_60px_-15px_rgba(0,0,0,.25)]",
                "transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01]",
                c.bg,
                c.fg,
              ].join(" ")}
            >
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 rounded-full bg-black/10 px-4 py-2 text-xs font-bold uppercase tracking-wider ${c.fg === "text-black" ? "text-black" : "text-white"}`}>
                {c.badge}
              </div>

              {/* Título grande */}
              <h3 className="mt-6 text-[clamp(22px,3vw,38px)] leading-[1.15] font-extrabold">
                {c.title}
              </h3>

              {/* Descripción */}
              <p className="mt-4 text-[clamp(15px,1.6vw,18px)] leading-relaxed opacity-90">
                {c.desc}
              </p>
            </article>
          ))}
        </div>

        {/* CTA principal */}
<div className="mt-12 flex justify-center">
  <Button asChild variant="outline" className="rounded-full px-8 py-5 text-base font-semibold">
    <Link href={productHref}>Ordenar ahora</Link>
  </Button>
</div>
      </div>
    </section>
  )
}
