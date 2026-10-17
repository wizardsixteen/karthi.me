// import {} from "@karthi" // @karthi will be the workspace name.
import { educationData } from "@karthi/data";
import { Button } from "@karthi/ui";

export function EducationSection() {
  return (
    <section className="mb-64">
      <p className="lbl flex items-center gap-16 text-12 text-mute mb-28 after:flex-1 after:h-px after:bg-line">Education &amp; certifications</p>
      <div className="cols grid grid-cols-1 sm:grid-cols-2 gap-32">
        {educationData.map((item, idx) => (
          <div key={idx}>
            <h4 className="text-16 font-medium mb-4 text-ink m-0">{item.title}</h4>
            <p className="text-14 text-mute mb-20 m-0 leading-normal">{item.institutionOrDate}</p>
          </div>
        ))}
      </div>
      <div className="acts flex flex-wrap gap-12 mt-28">
        <Button href="https://www.linkedin.com/in/wizardsixteen/details/certifications/" target="_blank">
          Certifications ↗
        </Button>
      </div>
    </section>
  );
}
