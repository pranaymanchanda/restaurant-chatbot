"use client";

import { useChat } from "@/lib/ChatContext";
import { IconBolt, IconChat, IconLeaf, IconSparkle } from "./Icons";
import Reveal from "./Reveal";

const features = [
  { icon: IconChat, title: "Instant answers", desc: "Ask about any dish, ingredient or price and get a real answer in seconds." },
  { icon: IconLeaf, title: "Dietary guidance", desc: "Vegetarian, vegan or allergy questions — the host knows the whole menu." },
  { icon: IconBolt, title: "Always on", desc: "No hold music. The AI host is available 24/7, even after we close." },
  { icon: IconSparkle, title: "Reservation-ready", desc: "Start a booking right in the chat — our team confirms by WhatsApp." },
];

export default function AiHost() {
  const { open } = useChat();

  return (
    <section id="ai-host" className="section bg-neutral-50">
      <div className="container-px">
        <Reveal className="overflow-hidden rounded-3xl bg-neutral-900 p-8 text-white sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Powered by AI
              </span>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Meet your AI host</h2>
              <p className="mt-3 max-w-md text-neutral-300">
                Built by GulfAutomation — a live AI concierge that knows our full menu, hours and location, and can kick off a reservation without you ever picking up the phone.
              </p>
              <button onClick={open} className="btn-primary mt-6">
                <IconChat className="h-4 w-4" /> Try it now
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl bg-white/5 p-5">
                  <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-brand/20 text-brand">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-semibold">{f.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
