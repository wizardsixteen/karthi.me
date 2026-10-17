// import {} from "@karthi" // @karthi will be the workspace name.
import { brandsData } from "@karthi/data";

export function BrandsSection() {
  return (
    <section className="mb-64">
      <p className="lbl flex items-center gap-16 text-12 text-mute mb-28 after:flex-1 after:h-px after:bg-line">Brands &amp; communities</p>
      <div className="tags flex flex-wrap gap-8">
        {brandsData.map((brand) => (
          <span
            key={brand}
            className={`border px-14 py-5 text-13 ${
              brand === "+30 more"
                ? "more border-dashed border-accent/55 text-accent"
                : "border-line text-mute hover:text-ink transition-colors"
            }`}
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
