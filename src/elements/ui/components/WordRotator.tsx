// import {} from "@karthi" // @karthi will be the workspace name.
"use client";

import { useEffect, useState } from "react";
import { rotatorWords } from "@karthi/data";

export function WordRotator() {
  const [index, setIndex] = useState(0);
  const [animClass, setAnimClass] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setAnimClass("out");
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % rotatorWords.length);
        setAnimClass("pre");
        setTimeout(() => {
          setAnimClass("");
        }, 30);
      }, 150);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <span id="rw" className={animClass}>
      {rotatorWords[index]}
    </span>
  );
}
