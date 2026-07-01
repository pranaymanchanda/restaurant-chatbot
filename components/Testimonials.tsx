import { restaurantInfo } from "@/lib/menu";
import { IconStar } from "./Icons";
import Reveal from "./Reveal";

const items = [
  { quote: "Asked the AI host for vegan options at midnight and got a full answer instantly. Then we booked a table in the same chat.", name: "Dana F.", role: "Regular guest" },
  { quote: "The mixed grill platter is unreal. Loved that I could check the menu and prices before even walking in.", name: "Omar S.", role: "First-time visitor" },
  { quote: "Booked a table for six through the chatbot in under a minute — no calls, no waiting.", name: "Reem A.", role: "Event organizer" },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="section bg-neutral-50">
      <div className="container-px">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow">Reviews</span>
          <h2 className="heading">What guests say about {restaurantInfo.name}</h2>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 70} className="flex flex-col rounded-3xl border border-neutral-200/80 bg-white p-7">
              <div className="mb-4 flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, s) => (
                  <IconStar key={s} className="h-4 w-4" />
                ))}
              </div>
              <p className="flex-1 text-[15px] leading-relaxed text-neutral-700">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand/10 font-semibold text-brand">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">{t.name}</div>
                  <div className="text-xs text-neutral-500">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
