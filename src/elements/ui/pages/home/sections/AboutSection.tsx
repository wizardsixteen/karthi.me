// import {} from "@karthi" // @karthi will be the workspace name.
export function AboutSection() {
  return (
    <section id="about" className="mb-64 scroll-mt-80">
      <p className="lbl flex items-center gap-16 text-12 text-mute mb-28 after:flex-1 after:h-px after:bg-line">About</p>
      <p className="chip inline-flex items-center gap-10 bg-accent/10 border border-accent/50 text-accent rounded-full px-16 py-6 text-14 font-semibold tracking-wide mb-24 before:w-7 before:h-7 before:rounded-full before:bg-accent before:shadow-[0_0_0_4px_rgba(254,59,21,0.22)]">
        Visual designer by heart.
      </p>
      <div className="about-cols flex flex-col lg:flex-row gap-24">
        <p className="big font-serif italic text-32 sm:text-48 leading-tight mb-20 w-full lg:max-w-[60%]">
          &ldquo;I make products people understand at a glance and enjoy using.&rdquo;
        </p>
        <p className="txt text-mute max-w-prose leading-relaxed m-0 w-full lg:max-w-[40%]">
          UI/UX designer and 3D artist with 7+ years of experience in product design, animation, web development, and
          immersive technologies. As Creative Officer at Zilicon Technologies and trainer at Riglabs Collective, I
          create interactive digital experiences and empower learners through hands-on technology education.
        </p>
      </div>
    </section>
  );
}
