// import {} from "@karthi" // @karthi will be the workspace name.
import { experienceData } from "@karthi/data";

export function ExperienceSection() {
  return (
    <section id="experience" className="mb-64 scroll-mt-80">
      <p className="lbl flex items-center gap-16 text-12 text-mute mb-28 after:flex-1 after:h-px after:bg-line">Experience</p>
      {experienceData.map((item, idx) => (
        <div key={idx} className="row grid grid-cols-[1fr_auto] gap-x-24 gap-y-4 py-22 border-t border-line last:border-b transition-all items-baseline">
          <h3 className="sm font-display text-24 sm:text-30 font-extrabold uppercase leading-none m-0">{item.role}</h3>
          <i className="text-13 text-mute not-italic">{item.date}</i>
          <p className="col-span-1 text-mute text-15 max-w-prose mt-6 m-0 leading-normal">{item.description}</p>
        </div>
      ))}
    </section>
  );
}
