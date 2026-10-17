// import {} from "@karthi" // @karthi will be the workspace name.
import { servicesData } from "@karthi/data";
import { Button } from "@karthi/ui";

export function ServicesSection() {
  return (
    <section id="services" className="mb-64 scroll-mt-80">
      <p className="lbl flex items-center gap-16 text-12 text-mute mb-28 after:flex-1 after:h-px after:bg-line">Services</p>
      <div className="svc grid grid-cols-1 sm:grid-cols-2 sm:gap-x-40">
        {servicesData.map((svc) => (
          <div key={svc.title} className="grid grid-cols-[48px_1fr] gap-16 py-24 border-b border-line items-start">
            <svg viewBox={svc.svg.viewBox} className="w-40 h-40 fill-none stroke-ink stroke-[1.5] stroke-round stroke-join-round" aria-hidden="true">
              {svc.svg.elements.map((el, i) => {
                if (el.type === "rect") {
                  return <rect key={i} {...(el.props as any)} />;
                }
                if (el.type === "circle") {
                  return <circle key={i} {...(el.props as any)} />;
                }
                return <path key={i} {...(el.props as any)} />;
              })}
            </svg>
            <div>
              <h3 className="font-display text-24 font-extrabold uppercase leading-none m-0">{svc.title}</h3>
              <p className="text-mute text-15 mt-5 leading-normal">{svc.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="acts flex flex-wrap gap-12 mt-28">
        <Button href="https://wa.me/917306728337" target="_blank">
          Hire me ↗
        </Button>
      </div>
    </section>
  );
}
