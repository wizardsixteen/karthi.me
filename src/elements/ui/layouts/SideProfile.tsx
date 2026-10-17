// import {} from "@karthi" // @karthi will be the workspace name.
import { Button } from "@karthi/ui";

export function SideProfile() {
  return (
    <>
      <div id="side-content" className="flex flex-col">
        <h1 id="hero-title" aria-label="Karthik Narayanan">
          <span>
            <b>Karthik</b>
          </span>
          <span>
            <b style={{ animationDelay: "0.12s" }}>Narayanan</b>
          </span>
        </h1>
        <p className="role font-serif italic text-24 leading-snug mt-20 text-mute">
          Creative Officer. UI/UX, 3D, Code &amp; XR.
        </p>
        <p className="promise text-15 text-ink mt-12 max-w-prose leading-normal">
          From code to pixels to polygons to 3D worlds.
          <br />
          I can turn your ideas into reality.
        </p>
        <div className="side-ctas flex flex-wrap gap-12 mt-28">
          <Button fill href="https://wa.me/917306728337" target="_blank">
            Hire me ↗
          </Button>
          <Button href="#services">See services</Button>
        </div>
      </div>
      <div id="side-bottom" className="mt-auto">
        <div className="side-stats grid grid-cols-3 border border-white/20 mb-12">
          <div className="p-14 border-r border-white/20">
            <b className="font-display text-24 sm:text-30 font-black block">7+</b>
            <span className="text-mute text-12 leading-tight block mt-3">years in design &amp; development</span>
          </div>
          <div className="p-14 border-r border-white/20">
            <b className="font-display text-24 sm:text-30 font-black block">100+</b>
            <span className="text-mute text-12 leading-tight block mt-3">events hosted</span>
          </div>
          <div className="p-14">
            <b className="font-display text-24 sm:text-30 font-black block">8,000+</b>
            <span className="text-mute text-12 leading-tight block mt-3">students trained</span>
          </div>
        </div>
        <p className="brands text-12 text-mute leading-normal m-0">
          Worked with Amazon, ASAP Kerala, Figma, GDG, ICTAK, IEEE, K-DISC, Meta, Riglabs Collective and Zilicon
          Technologies.
        </p>
      </div>
    </>
  );
}
