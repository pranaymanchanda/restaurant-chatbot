"use client";

import { useChat } from "@/lib/ChatContext";
import { restaurantInfo } from "@/lib/menu";
import { IconArrow, IconChat } from "./Icons";

export default function Hero() {
  const { open } = useChat();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand/15 via-brand/5 to-transparent blur-3xl" />
      </div>

      <div className="container-px grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <span className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm font-medium text-neutral-600">
            <span className="h-2 w-2 rounded-full bg-brand" /> {restaurantInfo.cuisine} · Kuwait
          </span>
          <h1 className="animate-fade-up mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            {restaurantInfo.tagline}
          </h1>
          <p className="animate-fade-up mt-5 max-w-md text-lg text-neutral-600 [animation-delay:120ms]">
            Ask our AI host about tonight's specials, dietary options, or book a table — no forms, no phone tag.
          </p>
          <div className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row [animation-delay:240ms]">
            <button onClick={open} className="btn-dark">
              <IconChat className="h-4 w-4" /> Chat with our AI Host
            </button>
            <a href="#menu" className="btn-secondary">
              View Menu <IconArrow className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="animate-fade-up relative [animation-delay:160ms]">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex aspect-[3/4] items-center justify-center rounded-3xl bg-gradient-to-br from-amber-200 to-orange-300 text-7xl shadow-sm">
              🍖
            </div>
            <div className="mt-8 flex aspect-[3/4] items-center justify-center rounded-3xl bg-gradient-to-br from-rose-200 to-red-300 text-7xl shadow-sm">
              🥗
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold shadow-lg">
            Ask me anything <span className="text-brand">— I'm online now</span>
          </div>
        </div>
      </div>
    </section>
  );
}
