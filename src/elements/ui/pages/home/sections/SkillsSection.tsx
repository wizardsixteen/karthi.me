// import {} from "@karthi" // @karthi will be the workspace name.
import { skillsData } from "@karthi/data";

export function SkillsSection() {
  return (
    <section id="skills" className="mb-64 scroll-mt-80">
      <p className="lbl flex items-center gap-16 text-12 text-mute mb-28 after:flex-1 after:h-px after:bg-line">Skills</p>
      {skillsData.map((group, idx) => (
        <div key={group.category}>
          <p className="grp text-12 text-mute font-medium uppercase tracking-wider mt-24 mb-10 first:mt-0">
            {group.category}
          </p>
          <div className="tags flex flex-wrap gap-8">
            {group.skills.map((skill) => (
              <span key={skill} className="border border-line px-14 py-5 text-13 text-mute hover:text-ink transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
