// app/page.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CardFanRYB from "@/components/card-fan-ryb"
import SectionSummary from "@/components/section-summary"
import SectionPurchaseCards from "@/components/section-purchase-cards"
import SectionTestimonialsCards from "@/components/section-testimonials-cards"
import SectionFAQ from "@/components/section-faq"

export default function HomePage() {
  const pick1 = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

  const RED = [
    "¿Quién se hace el inocente pero es el más cochino?",
    "¿Quién ha tenido una fantasía con alguien de este grupo?",
    "¿Quién confundiría a una persona con otra en la cama?",
    "¿Quién ha salido con alguien solo por su dinero?",
    "¿Quién coquetearía con la pareja de un amigo?",
    "¿Quién sería escogido para hacer un trío?",
    "¿Quién se crearía un OnlyFans si nadie se enterara?",
    "¿Quién usaría una identidad falsa para coquetear?",
    "¿Quién haría un trío con una pareja que acaba de conocer?",
    "¿Quién ha sido “el/la otro/a” sin darse cuenta?",
    "¿Quién ha tenido sexo solo para superar a un/a ex?",
    "¿Quién fumaría marihuana con sus hijos?",
  ]

  const BLUE = [
    "¿A quién llamarías para esconder un cuerpo?",
    "¿Quién quebrantó más leyes?",
    "¿Quién estaría primero en la fila para el infierno?",
    "¿Quién sería expulsado de un hotel por consumo de sustancias?",
    "¿Quién intimidaría al sexo opuesto?",
    "¿Quién ha roto más corazones?",
    "¿A quién le han roto el corazón más veces?",
    "¿Quién tendría su propio reality show?",
    "Quién sobreviviría un apocalipsis?",
    "¿Quién moriría primero si despierta en medio de la Amazonía?",
  ]

  const YELLOW = [
    "¿Quién sería un hippie feliz?",
    "¿Quién es feliz los días lunes?",
    "¿Quién recibe más cumplidos de su pareja?",
    "¿Quién es el ciudadano ejemplar?",
    "¿Quién se quedaría sin comer por invitar a alguien que tiene hambre?",
    "¿Quién recibe más flores anónimas en San Valentín?",
    "¿Quién siempre defiende una injusticia?",
    "¿Quién recibirá un Premio Nobel?",
    "¿Quién sería un buen rey o reina?",
    "¿Quién ganaría un torneo de Catán?",
    "¿Quién recibió más estrellas por buen comportamiento en jardín de niños?",
  ]

  const red = pick1(RED)
  const blue = pick1(BLUE)
  const yellow = pick1(YELLOW)

  return (
    <>
      {/* HERO principal */}
      <section className="relative w-full overflow-hidden bg-[rgb(var(--bg))] min-h-[100svh] md:min-h-[94vh]">
        <div className="mx-auto grid min-h-[100svh] md:min-h-[94vh] max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-24 sm:px-8 lg:grid-cols-2 lg:px-12">
          {/* IZQUIERDA */}
          <div>
            {/* Título fluido y balanceado para que no se corte en iOS/Android */}
            <h1
              className="
                text-balance leading-[0.95]
                text-[clamp(36px,9vw,72px)] md:text-[clamp(48px,6.2vw,88px)]
                font-extrabold tracking-tight
                max-w-[22ch]
              "
            >
              Preguntas simples, <br /> votaciones épicas.
            </h1>

            <p className="mt-5 max-w-xl text-[clamp(16px,4.4vw,20px)] text-black/80">
              Descubre lo qué tus amigos realmente piensan de ti.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link href="/comprar">Cómpralo ahora</Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/como-jugar">Cómo se juega</Link>
              </Button>
            </div>
          </div>

          {/* DERECHA: Fan de cartas */}
          <div
            className="
              relative mx-auto w-full max-w-[520px]
              scale-90 sm:scale-95 md:scale-100
              max-[360px]:scale-[.84]
            "
          >
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
