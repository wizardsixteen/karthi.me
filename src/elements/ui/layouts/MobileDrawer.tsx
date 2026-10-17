// import {} from "@karthi" // @karthi will be the workspace name.
"use client";

import { navItems } from "@karthi/data";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  return (
    <nav
      className={`mobile-menu-drawer fixed top-50 left-0 right-0 bottom-0 lg:hidden z-40 flex flex-col gap-20 p-24 bg-bg/75 backdrop-blur-2xl border-r border-line overflow-y-auto transition-all duration-700 md:w-[45.4545%] ${
        isOpen ? "open opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none"
      }`}
      id="mobileDrawer"
      aria-label="Mobile Navigation"
    >
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="font-display text-32 font-extrabold uppercase text-mute border-b border-white/8 pb-12 transition-all hover:text-ink hover:translate-x-6"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
