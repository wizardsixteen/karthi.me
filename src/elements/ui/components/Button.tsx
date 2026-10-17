// import {} from "@karthi" // @karthi will be the workspace name.
"use client";

import { useRef, MouseEvent, ReactNode } from "react";

interface ButtonProps {
  href?: string;
  target?: string;
  className?: string;
  fill?: boolean;
  children: ReactNode;
  onClick?: () => void;
  id?: string;
}

export function Button({ href, target, className = "", fill = false, children, onClick, id }: ButtonProps) {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
  };

  const baseClasses = "btn inline-block relative overflow-hidden isolate border rounded-full px-22 py-11 font-medium transition-colors cursor-pointer text-center";
  const stateClasses = fill
    ? "fill bg-ink text-bg border-ink"
    : "border-ink text-ink bg-transparent";

  const combinedClass = `${baseClasses} ${stateClasses} ${className}`.trim();

  if (href) {
    return (
      <a
        ref={btnRef}
        id={id}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={combinedClass}
        onMouseMove={handleMouseMove}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button ref={btnRef} id={id} type="button" className={combinedClass} onMouseMove={handleMouseMove} onClick={onClick}>
      {children}
    </button>
  );
}
