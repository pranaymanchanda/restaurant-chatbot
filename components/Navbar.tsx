"use client";

import { useEffect, useState } from "react";
import { useChat } from "@/lib/ChatContext";
import { restaurantInfo } from "@/lib/menu";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#ai-host", label: "AI Host" },
  { href: "#visit", label: "Visit" },
  { href: "#reviews", label: "Reviews" },
];

export default function Navbar() {
  const { open } = useChat();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "border-b border-neutral-200/70 bg-white/85 backdrop-blur-xl" : "bg-white"
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between">
        <a href="#top" className="text-xl font-bold tracking-tight">
          {restaurantInfo.name}
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={open} className="btn-primary hidden sm:inline-flex !py-2 !px-5">
            Reserve a Table
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-neutral-200 md:hidden"
          >
            <span className="text-lg leading-none">{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <div className="container-px flex flex-col py-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="rounded-lg px-2 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                open();
              }}
              className="btn-primary mt-2"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
