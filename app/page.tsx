// app/page.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CardFanRYB from "@/components/card-fan-ryb"
import SectionSummary from "@/components/section-summary" // 👈 NUEVO IMPORT
import SectionPurchaseCards from "@/components/section-purchase-cards"
import SectionTestimonialsCards from "@/components/section-testimonials-cards"
import SectionFAQ from "@/components/section-faq"

export default function HomePage() {
  const pick1 = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

  const RED = [
    "¿Quién se cogería a su jefe?",
    "¿Qué parte de tu cuerpo te gustaría cambiar?",
    "¿Qué harías si fueras invisible por un día?",
    "¿Cuál fue tu peor cita?",
  ]
  const BLUE = [
    "¿Quién cuenta los chistes más malos pero igual hacen reír?",
    "¿Qué fue lo más gracioso que te pasó esta semana?",
    "¿Quién tiene la risa más contagiosa?",
  ]
  const YELLOW = [
    "¿Quién siempre ve el vaso medio lleno?",
    "¿Qué logro reciente te hizo sentir orgullx?",
    "¿Qué te motiva cuando el grupo está bajoneado?",
  ]

  const red = pick1(RED)
  const blue = pick1(BLUE)
  const yellow = pick1(YELLOW)

  return (
    <>
      {/* HERO principal */}
      <section className="relative min-h-[94vh] w-full overflow-hidden bg-[rgb(var(--bg))]">
      <div className="mx-auto grid min-h-[94vh] max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-28 sm:px-8 lg:grid-cols-2 lg:px-12">
        {/* IZQUIERDA */}
        <div>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
            Preguntas simples,<br />votaciones épicas.
          </h1>
          <p className="mt-6 max-w-xl text-xl text-black/80">
            Descubre qué piensa realmente tu grupo.
          </p>
          <div className="mt-8 flex gap-4">
<Button variant="outline" asChild><Link href="/comprar">Cómpralo ahora</Link></Button>

            <Button variant="outline" asChild><Link href="/como-jugar">Cómo se juega</Link></Button>
          </div>
        </div>

          <div className="relative">
            <CardFanRYB red={red} blue={blue} yellow={yellow} />
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN RESUMEN */}
      <SectionSummary />
      <SectionPurchaseCards productHref="/comprar" />
      <SectionTestimonialsCards autoplay intervalMs={6000} />
      <SectionFAQ />

    </>
  )
}
