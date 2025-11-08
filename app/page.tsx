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
    "¿Quién se cogería a su jefe?",
    "¿Quién ha perdido su virginidad más joven?",
    "¿Quién tiene fantasías sexuales con el/la herman@ de su pareja?",
    "¿Quién haría un trío con su pareja?",
    "¿Quién pagaría el taxi con sexo oral si no tuviera dinero?",
    "¿Quién ha gastado más dinero en lencería?",
    "¿Quién tendría sexo en un lugar público?",
    "¿Qué participante sería escogido para hacer un trío?",
    "¿Quién tiene el menor respeto por las autoridades?",
    "¿Quién pasa más tiempo revisando cómo se ve en vez de entrenar en el gym?",
    "¿Quién es obviamente hijo único?",
    "¿Quién fumaría marihuana con sus hijos?",
    "¿Quién es el amigo que siempre está listo para salir de rumba?",
    "¿Quién se olvidaría de su hijo en el supermercado?",
  ]

  const BLUE = [
    "¿Quién cuenta los chistes más malos pero igual hacen reír?",
    "¿Quién tiene la risa más contagiosa?",
    "¿Quién ha continuado en una relación porque no sabía cómo terminar?",
    "¿Quién le ha robado dinero a un miembro de su familia?",
    "¿Quién le ha dejado su número a un/a meser@?",
    "¿Quién escribiría un libro sobre cómo conquistar hombres?",
    "¿Quién escribiría un libro sobre cómo conquistar mujeres?",
    "¿Quién no se comporta como alguien de su edad?",
    "¿Quién tiene una vida de Rock Star?",
    "¿Quién conquista a su pareja escribiendo poemas?",
    "¿Quién es feliz los días lunes?",
    "¿Quién es el empleado del mes?",
  ]

  const YELLOW = [
    "¿Quién siempre ve el vaso medio lleno?",
    "¿Qué logro reciente te hizo sentir orgullx?",
    "¿Qué te motiva cuando el grupo está bajoneado?",
    "¿Quién es el amigo con el que puedes contar en todo momento?",
    "¿Quién va a impactar la vida de más personas a lo largo de su vida?",
    "¿Quién escribiría un libro sobre cómo paternar?",
    "¿Quién recibirá un Premio Nobel?",
    "¿Quién la rompe en la pista de baile?",
    "¿Quién sería presidente del país?",
    "¿Quién ganaría Factor X?",
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
