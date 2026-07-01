"use client";

import { useMemo, useState } from "react";
import { categories, menu } from "@/lib/menu";
import Reveal from "./Reveal";

export default function Menu() {
  const [active, setActive] = useState<string>("Starters");

  const visible = useMemo(() => menu.filter((m) => m.category === active), [active]);

  return (
    <section id="menu" className="section">
      <div className="container-px">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <span className="eyebrow">The Menu</span>
          <h2 className="heading">Fresh, made to order</h2>
        </Reveal>

        <Reveal className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === c
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
              }`}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => (
            <Reveal key={item.id} delay={i * 60} className="flex items-start gap-4 rounded-3xl border border-neutral-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand/10 text-3xl">{item.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-neutral-900">{item.name}</h3>
                  <span className="shrink-0 text-sm font-bold text-brand">{item.price.toFixed(3)}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600">{item.desc}</p>
                {item.tags && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span key={t} className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium capitalize text-neutral-500">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
