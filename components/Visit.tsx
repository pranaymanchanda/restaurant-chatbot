"use client";

import { useChat } from "@/lib/ChatContext";
import { restaurantInfo } from "@/lib/menu";
import { IconArrow, IconClock, IconMail, IconPhone, IconPin, IconWhatsApp } from "./Icons";
import Reveal from "./Reveal";

export default function Visit() {
  const { open } = useChat();

  return (
    <section id="visit" className="section">
      <div className="container-px">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow">Visit Us</span>
          <h2 className="heading">Find {restaurantInfo.name}</h2>
        </Reveal>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-neutral-200/80 bg-gradient-to-br from-amber-100 to-orange-200 lg:aspect-auto">
            <div className="text-center text-neutral-700">
              <IconPin className="mx-auto mb-2 h-10 w-10 text-brand" />
              <p className="font-semibold">{restaurantInfo.address}</p>
            </div>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-2 flex flex-col gap-4">
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6">
              <div className="flex items-start gap-3">
                <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h3 className="text-sm font-semibold">Address</h3>
                  <p className="mt-1 text-sm text-neutral-600">{restaurantInfo.address}</p>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <IconClock className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div className="w-full">
                  <h3 className="text-sm font-semibold">Hours</h3>
                  <ul className="mt-1 space-y-1 text-sm text-neutral-600">
                    {restaurantInfo.hours.map((h) => (
                      <li key={h.day} className="flex justify-between gap-3">
                        <span>{h.day}</span>
                        <span className="font-medium text-neutral-900">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <IconPhone className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h3 className="text-sm font-semibold">Phone</h3>
                  <a href={`tel:${restaurantInfo.phone.replace(/\s/g, "")}`} className="mt-1 block text-sm text-neutral-600 hover:text-brand">
                    {restaurantInfo.phone}
                  </a>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <IconMail className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h3 className="text-sm font-semibold">Email</h3>
                  <a href={`mailto:${restaurantInfo.email}`} className="mt-1 block break-all text-sm text-neutral-600 hover:text-brand">
                    {restaurantInfo.email}
                  </a>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${restaurantInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-3xl bg-[#25D366] p-5 text-white transition-transform hover:-translate-y-0.5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/20">
                <IconWhatsApp className="h-5 w-5" />
              </span>
              <span className="font-semibold">Chat with us on WhatsApp</span>
            </a>

            <button onClick={open} className="btn-dark">
              Chat with our AI host <IconArrow className="h-4 w-4" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
