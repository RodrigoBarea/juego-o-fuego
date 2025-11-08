import Image from "next/image"
import Collage3Slider from "@/components/collage3-slider"

export default function SectionSummary() {
  // Fotos fijas (ya no aleatorias)
  const picks: Img[] = [
    { src: "/images/3 (1).jpg", alt: "Jugadores riendo en la partida" },
    { src: "/images/4.jpg", alt: "Cartas y copas sobre la mesa" },
    { src: "/images/7.jpg", alt: "Grupo levantando cartas en ronda final" },
  ]

  return (
    <section className="relative overflow-hidden bg-[rgb(var(--yellow))]">
      {/* === TEXTO === */}
      <div className="mx-auto w-[80%] max-w-6xl px-8 py-20 sm:py-24">
        <p className="text-[clamp(22px,2.6vw,36px)] leading-[1.35] text-black/90">
          Listo para convertir tus reuniones en noches inolvidables. <br />
          Preguntas Simples, Votaciones Épicas.
        </p>

        <p className="mt-8 text-[clamp(22px,2.6vw,36px)] leading-[1.35] text-black/90">
          En casa ronda alguien lee una pregunta y todos votan en secreto por quien encaja mejor eligiendo una carta de las 3 categorías: 
          <strong> Rojas</strong> (Picantes), <strong>Azules</strong> (Divertidas) y <strong>Amarillas</strong> (Optimistas). 
          Cada jugador elige qué carta sacar y las risas quedan registradas.
        </p>

        <p className="mt-8 text-[clamp(22px,2.6vw,36px)] leading-[1.35] text-black/90">
          Si buscan algo más chill, jueguen en <em>modo tranqui</em> solo con azules y amarillas. 
          Al final lean el <strong>Diagnóstico</strong> y descubrirán la vibra que el grupo vio en cada uno.
        </p>
      </div>

      {/* === COLLAGE === */}
      <div className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          {/* 📱 MÓVIL: slider de 1 foto */}
          <div className="md:hidden">
            <Collage3Slider images={picks} />
          </div>

          {/* 💻 DESKTOP/TABLET: 3 fotos fijas */}
          <div className="hidden md:flex items-stretch gap-8">
            {picks.map((img, i) => (
              <div
                key={img.src + i}
                className={[
                  "relative overflow-hidden rounded-2xl ring-8 ring-white shadow-[0_16px_48px_rgba(0,0,0,0.18)]",
                  "transition-transform duration-300 hover:-translate-y-1",
                  "md:flex-1",
                  "h-[220px] sm:h-[260px] md:h-[300px]",
                  i === 0 ? "md:rotate-[-2deg]" : i === 1 ? "md:rotate-[1.5deg]" : "md:rotate-[-1deg]",
                ].join(" ")}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, 33vw"
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Tipos ---------- */
type Img = { src: string; alt: string }
