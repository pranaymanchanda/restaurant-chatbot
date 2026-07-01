import { restaurantInfo } from "@/lib/menu";

const columns = [
  { title: "Menu", links: ["Starters", "Mains", "Salads", "Desserts"] },
  { title: "Guests", links: ["Reservations", "Private Events", "Gift Cards", "Contact"] },
  { title: "Restaurant", links: ["About", "Careers", "Press", "Privacy"] },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="container-px py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="text-xl font-bold tracking-tight">{restaurantInfo.name}</div>
            <p className="mt-3 max-w-xs text-sm text-neutral-600">{restaurantInfo.tagline}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-neutral-900">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-neutral-500 transition-colors hover:text-brand">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-neutral-200 pt-6 text-xs text-neutral-500 sm:flex-row">
          <span>© {year} {restaurantInfo.name}. All rights reserved.</span>
          <span>
            AI concierge by{" "}
            <a
              href="https://agency-website.pranaykuwait.workers.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand hover:underline"
            >
              GulfAutomation
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
