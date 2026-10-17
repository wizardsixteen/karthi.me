// import {} from "@karthi" // @karthi will be the workspace name.
"use client";

import { useState, ReactNode } from "react";
import { MobileHeader, MobileDrawer, SideNav, SideProfile, PolyhedronCanvas } from "@karthi/ui";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <MobileHeader isMenuOpen={isMenuOpen} onToggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
      <MobileDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="wrap grid grid-cols-1 md:grid-cols-[5fr_6fr] min-h-screen bg-bg text-ink font-sans">
        <aside className="side relative md:sticky md:top-0 md:h-screen flex flex-col justify-between gap-48 p-24 md:p-36 md:pb-40 border-b md:border-b-0 md:border-r border-line overflow-hidden pt-80 md:pt-36 bg-bg">
          <PolyhedronCanvas />
          <SideNav />
          <SideProfile />
        </aside>
        <main className="relative z-1 p-24 md:p-48 pb-16">{children}</main>
      </div>
    </>
  );
}
