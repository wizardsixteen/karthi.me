// import {} from "@karthi" // @karthi will be the workspace name.
"use client";

import Image from "next/image";

interface MobileHeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export function MobileHeader({ isMenuOpen, onToggleMenu }: MobileHeaderProps) {
  return (
    <header className="mobile-header fixed top-0 left-0 right-0 lg:hidden z-50 flex items-center justify-between px-20 py-10 bg-bg/45 backdrop-blur-xl border-b border-white/8 md:w-[45.4545%] md:border-r md:border-line">
      <a href="#" className="mobile-logo-link inline-flex items-center p-2 rounded-6 transition-all hover:opacity-85 hover:scale-105" aria-label="Home">
        <Image
          src="/favicon/android-chrome-512x512.png"
          alt="Karthik Narayanan Logo"
          className="mobile-logo-img rounded-6 block object-contain w-32 h-32"
          width={32}
          height={32}
          priority
        />
      </a>
      <button
        className={`menu-btn flex items-center justify-center p-8 rounded-8 bg-white/4 border border-white/12 text-ink backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/25 cursor-pointer ${
          isMenuOpen ? "active" : ""
        }`}
        id="menuToggle"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        onClick={onToggleMenu}
      >
        <svg className="icon-bars w-20 h-20 fill-none stroke-current stroke-2 stroke-round" viewBox="0 0 24 24">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <svg className="icon-close w-20 h-20 fill-none stroke-current stroke-2 stroke-round" viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </header>
  );
}
