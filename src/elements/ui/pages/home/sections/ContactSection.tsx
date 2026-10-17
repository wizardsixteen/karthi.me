// import {} from "@karthi" // @karthi will be the workspace name.
import { WordRotator, Button } from "@karthi/ui";

export function ContactSection() {
  return (
    <section id="contact" className="mb-64 scroll-mt-80">
      <p className="lbl flex items-center gap-16 text-12 text-mute mb-28 after:flex-1 after:h-px after:bg-line">Contact</p>
      <p className="chip inline-flex items-center gap-10 bg-accent/10 border border-accent/50 text-accent rounded-full px-16 py-6 text-14 font-semibold tracking-wide mb-24 before:w-7 before:h-7 before:rounded-full before:bg-accent before:shadow-[0_0_0_4px_rgba(254,59,21,0.22)]">
        It&apos;s time to
      </p>
      <p className="cta font-display font-black text-56 sm:text-96 leading-none uppercase m-0" aria-label="Build your brand">
        Build your
        <em className="rot font-serif italic font-normal text-mute lowercase block not-italic" aria-hidden="true">
          <WordRotator />
        </em>
      </p>
      <div className="acts flex flex-wrap gap-12 mt-28">
        <Button fill href="https://wa.me/917306728337" target="_blank">
          Hire me ↗
        </Button>
        <Button href="https://www.linkedin.com/in/wizardsixteen" target="_blank">
          LinkedIn ↗
        </Button>
        <Button href="https://riglabs.co" target="_blank">
          riglabs.co ↗
        </Button>
      </div>
    </section>
  );
}
