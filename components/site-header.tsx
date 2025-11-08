// components/site-header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const lockedScrollY = useRef(0); // guarda el scroll para restaurar

  // ===== helpers: lock/unlock scroll cross-browser (iOS friendly) =====
  const lockBodyScroll = () => {
    lockedScrollY.current = window.scrollY || window.pageYOffset || 0;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${lockedScrollY.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden"; // redundante pero ayuda en Android
    // evita “bounce” en iOS
    document.documentElement.style.overscrollBehavior = "none";
  };

  const unlockBodyScroll = () => {
    const body = document.body;
    const y = lockedScrollY.current;
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    body.style.width = "";
    body.style.overflow = "";
    document.documentElement.style.overscrollBehavior = "";
    window.scrollTo(0, y);
  };
  // ===================================================================

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esc para cerrar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock/unlock de scroll al abrir/cerrar
  useEffect(() => {
    if (mobileOpen) lockBodyScroll();
    else unlockBodyScroll();
    // limpieza por si el componente se desmonta con el menú abierto
    return () => unlockBodyScroll();
  }, [mobileOpen]);

  const navItems = [
    { href: "/comprar", label: "Comprar" },
    { href: "/como-jugar", label: "Cómo se juega" },
    { href: "/#faqs", label: "FAQS" },
    { href: "/contacto", label: "Contacto", newTab: true },
  ];

  const hideOn = (p?: string | null) => !!p && /^\/(contacto|juan)(\/|$)/.test(p);

  if (!mounted) return null;
  if (hideOn(pathname)) return null;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors",
        scrolled
          ? "bg-[rgb(var(--bg))]/90 backdrop-blur border-b border-black/10"
          : "bg-transparent border-b-0",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-12 w-12 sm:h-14 sm:w-14">
            <Image
              src="/logo-hero.png"
              alt="¿Juego o Fuego?"
              fill
              sizes="(min-width: 1280px) 56px, (min-width: 640px) 48px, 44px"
              className="object-contain"
              priority
            />
          </div>
          <span className="sr-only">¿Juego o Fuego?</span>
        </Link>

        {/* Menú principal (desktop) */}
        <nav className="hidden md:flex items-center gap-10 text-lg font-semibold">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:underline"
              {...(item.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Botón móvil */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-xl p-2 outline-none ring-0 hover:bg-black/5"
          aria-label="Abrir menú"
          aria-controls="mobile-menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Overlay + Drawer móvil */}
      {mobileOpen && (
        <div className="md:hidden" id="mobile-menu">
          {/* overlay */}
          <div
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[1px]"
            onClick={() => setMobileOpen(false)}
          />
          {/* drawer */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="fixed right-0 top-0 z-[70] h-full w-80 max-w-[85%] bg-[rgb(var(--bg))] shadow-2xl border-l border-black/10 animate-in slide-in-from-right duration-200 overscroll-contain"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
              <span className="text-base font-semibold tracking-tight">Menú</span>
              <button
                className="inline-flex items-center justify-center rounded-xl p-2 outline-none hover:bg-black/5"
                aria-label="Cerrar menú"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-2 p-4 text-base">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 hover:bg-black/5"
                  {...(item.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
