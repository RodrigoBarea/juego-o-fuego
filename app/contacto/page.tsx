"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"

/* ===== Config de tus links ===== */
const LINKS = {
  // cambia estos valores por los reales
  brand: {
    handle: "@juegofuego.bo",
    tagline: "Preguntas simples, votaciones épicas.",
    avatar: "/logos/card-front-badge-black.png", // logo cuadrado que ya tienes
  },
  whatsappNumber: "59162379797",
  social: {
    instagram: "https://instagram.com/juegoofuego.bol",
    tiktok: "https://www.tiktok.com/@tu_cuenta",
    youtube: "https://www.youtube.com/@tu_cuenta",
    twitter: "https://x.com/tu_cuenta",
    facebook: "https://facebook.com/tu_cuenta",
  },
  pages: {
    comprar: "/comprar",
    comoJugar: "/como-jugar",
    catalogoPDF: "/catalogos/juego-o-fuego.pdf", // pon tu ruta si tienes PDF
    puntosVenta: "https://maps.google.com/?q=Puntos+de+venta+Juego+o+Fuego",
    web: "https://tudominio.com", // si quieres añadirlo
  },
}

/* Utilidad para WhatsApp */
function useWhatsAppLink(text?: string) {
  const msg = useMemo(
    () =>
      encodeURIComponent(
        text ??
          "Hola 👋 quiero info para comprar ¿Juego o Fuego? (cantidad, envío y formas de pago)."
      ),
    [text]
  )
  return `https://wa.me/${LINKS.whatsappNumber}?text=${msg}`
}

/* Botón grande estilo linktree */
function LinkTile({
  href,
  children,
  external = true,
  icon,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  icon?: React.ReactNode
}) {
  const cls =
    "group inline-flex w-full items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white/95 px-4 py-4 text-[15px] font-semibold backdrop-blur transition hover:shadow-[0_18px_35px_-20px_rgba(0,0,0,0.35)] hover:border-black"
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        <span className="inline-flex items-center gap-3">
          {icon}
          {children}
        </span>
        <span className="opacity-50 transition group-hover:opacity-80">↗</span>
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      <span className="inline-flex items-center gap-3">
        {icon}
        {children}
      </span>
      <span className="opacity-50 transition group-hover:opacity-80">→</span>
    </Link>
  )
}

/* Íconos mini (SVG inline, sin dependencias) */
const Icons = {
  wa: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.52 3.48A11.8 11.8 0 0 0 12 0C5.38 0 0 5.36 0 12c0 2.11.55 4.18 1.6 6.01L0 24l6.18-1.61A11.9 11.9 0 0 0 12 23.88C18.62 23.88 24 18.52 24 11.9c0-3.2-1.25-6.21-3.48-8.42ZM12 21.44A9.5 9.5 0 0 1 7.16 20l-.35-.2-3.67.95.98-3.58-.23-.37A9.5 9.5 0 1 1 12 21.44Zm5.4-7.13c-.29-.15-1.72-.85-1.99-.95-.27-.1-.47-.15-.67.15-.2.29-.77.95-.95 1.15-.17.2-.35.22-.64.07-.29-.15-1.23-.45-2.34-1.44-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.59.13-.13.29-.35.44-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.91-2.24-.24-.58-.49-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.08-.79.37-.27.29-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.72-.7 1.97-1.37.24-.67.24-1.24.17-1.37-.07-.13-.26-.2-.55-.35Z" />
    </svg>
  ),
  ig: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.9.26 2.4.43.6.23 1 .5 1.5 1 .5.5.8.9 1 1.5.17.5.37 1.2.43 2.4.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.26 1.9-.43 2.4-.23.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.5.17-1.2.37-2.4.43-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.9-.26-2.4-.43-.6-.23-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.17-.5-.37-1.2-.43-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.26-1.9.43-2.4.23-.6.5-1 1-1.5.5-.5.9-.8 1.5-1 .5-.17 1.2-.37 2.4-.43C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.07-.9.05-1.4.2-1.7.33-.4.15-.6.32-.9.6-.28.28-.46.5-.6.9-.13.3-.28.8-.33 1.7C3.7 9.1 3.7 9.5 3.7 12s0 2.9.07 4.2c.05.9.2 1.4.33 1.7.15.4.32.6.6.9.28.28.5.46.9.6.3.13.8.28 1.7.33 1.2.07 1.6.07 4.2.07s2.9 0 4.2-.07c.9-.05 1.4-.2 1.7-.33.4-.15.6-.32.9-.6.28-.28.46-.5.6-.9.13-.3.28-.8.33-1.7.07-1.2.07-1.6.07-4.2s0-2.9-.07-4.2c-.05-.9-.2-1.4-.33-1.7-.15-.4-.32-.6-.6-.9-.28-.28-.5-.46-.9-.6-.3-.13-.8-.28-1.7-.33-1.2-.07-1.6-.07-4.2-.07Zm0 3.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 1.8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.4-.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
    </svg>
  ),
  tiktok: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 8.1a7 7 0 0 1-4.3-1.5v7.4a6 6 0 1 1-6-6c.3 0 .6 0 .9.1v3.1a3 3 0 1 0 2.1 2.8V2h3a7 7 0 0 0 4.3 6.1Z" />
    </svg>
  ),
  yt: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3.5 3.5 0 0 0-2.5-2.5C19.2 3.2 12 3.2 12 3.2s-7.2 0-9 .5A3.5 3.5 0 0 0 .5 6.2 36 36 0 0 0 0 12c0 1.9.2 3.8.5 5.8a3.5 3.5 0 0 0 2.5 2.5c1.8.5 9 .5 9 .5s7.2 0 9-.5a3.5 3.5 0 0 0 2.5-2.5c.3-2 .5-3.9.5-5.8s-.2-3.8-.5-5.8ZM9.6 15.5V8.5l6.1 3.5-6.1 3.5Z" />
    </svg>
  ),
  x: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.2 2H21l-6.3 7.2L22.5 22H16l-5-6.5L4.8 22H2l6.8-7.8L1.5 2H8l4.5 6L18.2 2ZM16 20h1.8L8.1 4H6.3L16 20Z" />
    </svg>
  ),
  fb: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12A10 10 0 1 0 10.8 22v-7h-2.5v-3h2.5V9.5c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.8l-.4 3h-2.4v7A10 10 0 0 0 22 12Z" />
    </svg>
  ),
  link: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.9 12a4.1 4.1 0 0 1 4.1-4.1h3V5H8A7 7 0 0 0 8 19h3v-2.9H8A4.1 4.1 0 0 1 3.9 12Zm5.2 1h5.8v-2H9.1v2Zm6.8-8h-3v2.9h3A4.1 4.1 0 0 1 20.1 12 4.1 4.1 0 0 1 15.9 16.1h-3V19h3a7 7 0 0 0 0-14Z" />
    </svg>
  ),
}

export default function ContactoPage() {
  const wa = useWhatsAppLink()

  return (
    <main className="min-h-[100dvh] bg-gradient-to-b from-[rgb(var(--blue))]/12 via-transparent to-[rgb(var(--yellow))]/12">
      <section className="mx-auto flex max-w-[640px] flex-col items-center px-6 pb-24 pt-20 sm:pt-24">
        {/* avatar + header */}
        <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border border-black/10 bg-white shadow">
          <Image
            src={LINKS.brand.avatar}
            alt="¿Juego o Fuego? — logo"
            fill
            sizes="96px"
            className="object-contain p-3"
          />
        </div>
        <h1 className="text-center text-2xl font-extrabold tracking-tight">
          {LINKS.brand.handle}
        </h1>
        <p className="mt-1 text-center text-sm text-black/60">
          {LINKS.brand.tagline}
        </p>

        {/* botones */}
        <div className="mt-6 w-full space-y-4">
          <LinkTile href={wa} icon={Icons.wa}>
            Comprar por WhatsApp
          </LinkTile>

          <LinkTile href={LINKS.pages.comprar} external={false} icon={Icons.link}>
            Comprar en la web
          </LinkTile>

          <LinkTile href={LINKS.pages.comoJugar} external={false} icon={Icons.link}>
            Cómo se juega
          </LinkTile>

          {/* redes */}
          <LinkTile href={LINKS.social.instagram} icon={Icons.ig}>
            Instagram
          </LinkTile>
          <LinkTile href={LINKS.social.tiktok} icon={Icons.tiktok}>
            TikTok
          </LinkTile>
    
          <LinkTile href={LINKS.social.facebook} icon={Icons.fb}>
            Facebook
          </LinkTile>

          {/* extras opcionales */}
          <LinkTile href={LINKS.pages.catalogoPDF} icon={Icons.link}>
            Catálogo PDF
          </LinkTile>
          <LinkTile href={LINKS.pages.puntosVenta} icon={Icons.link}>
            Puntos de venta
          </LinkTile>
        </div>


      </section>
    </main>
  )
}
