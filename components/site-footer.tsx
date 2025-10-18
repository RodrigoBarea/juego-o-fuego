import Link from "next/link"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-black/10 bg-white py-10 text-sm text-black/80">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row sm:gap-0">
        
        {/* Texto izquierda */}
        <p className="text-center sm:text-left">
          © {year} <span className="font-semibold">¿Juego o Fuego?</span>. Todos los derechos reservados.
        </p>

        {/* Enlaces derecha */}
        <div className="flex items-center gap-6">
          <Link
            href="/legal/privacidad"
            className="hover:underline underline-offset-4 transition-colors"
          >
            Privacidad
          </Link>
          <Link
            href="/legal/terminos"
            className="hover:underline underline-offset-4 transition-colors"
          >
            Términos
          </Link>
        </div>
      </div>
    </footer>
  )
}
