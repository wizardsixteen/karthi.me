// import {} from "@karthi" // @karthi will be the workspace name.
"use client";

import { navItems } from "@karthi/data";

export function SideNav() {
  return (
    <nav id="side-nav" className="hidden lg:flex flex-wrap gap-x-24 gap-y-8 text-13 text-mute">
      {navItems.map((item) => (
        <a key={item.href} href={item.href} className="transition-colors hover:text-ink">
          {item.label}
        </a>
      ))}
    </nav>
  );
}
