// import {} from "@karthi" // @karthi will be the workspace name.
import type { ServiceItem } from "@karthi/types";

export const servicesData: ServiceItem[] = [
  {
    title: "Technologist",
    description: "Understands technology and picks the right tools to turn it into working products.",
    svg: {
      viewBox: "0 0 48 48",
      elements: [
        { type: "rect", props: { x: 14, y: 14, width: 20, height: 20, rx: 3 } },
        { type: "rect", props: { x: 20, y: 20, width: 8, height: 8 } },
        { type: "path", props: { d: "M19 6v8M29 6v8M19 34v8M29 34v8M6 19h8M6 29h8M34 19h8M34 29h8" } },
      ],
    },
  },
  {
    title: "3D",
    description: "Models and scenes for products, brands and XR.",
    svg: {
      viewBox: "0 0 48 48",
      elements: [
        { type: "path", props: { d: "M24 5 41 14.5v19L24 43 7 33.5v-19zM7 14.5 24 24l17-9.5M24 24v19" } },
      ],
    },
  },
  {
    title: "Animation",
    description: "Motion graphics and 3D animation that explain and engage.",
    svg: {
      viewBox: "0 0 48 48",
      elements: [
        { type: "path", props: { d: "M6 36C14 36 14 12 24 12s10 24 18 24" } },
        { type: "circle", props: { cx: 6, cy: 36, r: 2.5 } },
        { type: "circle", props: { cx: 42, cy: 36, r: 2.5 } },
        { type: "circle", props: { cx: 24, cy: 12, r: 2.5 } },
      ],
    },
  },
  {
    title: "Brand assets",
    description: "Logos, style guides, social and ad creatives that stay consistent.",
    svg: {
      viewBox: "0 0 48 48",
      elements: [
        { type: "rect", props: { x: 7, y: 7, width: 22, height: 22, rx: 4 } },
        { type: "circle", props: { cx: 30, cy: 30, r: 12 } },
      ],
    },
  },
  {
    title: "Media assets",
    description: "Video edits, graphics and visuals for campaigns and courses.",
    svg: {
      viewBox: "0 0 48 48",
      elements: [
        { type: "rect", props: { x: 6, y: 10, width: 36, height: 28, rx: 4 } },
        { type: "path", props: { d: "M20 19v10l9-5z" } },
      ],
    },
  },
  {
    title: "Design system",
    description: "Reusable components and tokens so teams ship consistent UI faster.",
    svg: {
      viewBox: "0 0 48 48",
      elements: [
        { type: "rect", props: { x: 7, y: 7, width: 14, height: 14, rx: 2 } },
        { type: "circle", props: { cx: 33, cy: 14, r: 7 } },
        { type: "rect", props: { x: 7, y: 27, width: 14, height: 14, rx: 7 } },
        { type: "path", props: { d: "M33 27l7 14H26z" } },
      ],
    },
  },
  {
    title: "Product page",
    description: "Clear, responsive pages that explain a product and prompt action.",
    svg: {
      viewBox: "0 0 48 48",
      elements: [
        { type: "rect", props: { x: 6, y: 8, width: 36, height: 32, rx: 4 } },
        { type: "path", props: { d: "M6 16h36M12 22h12v12H12zM29 24h8M29 30h8" } },
      ],
    },
  },
  {
    title: "Critical thinking",
    description: "Sharp questions and testing that find the real problem.",
    svg: {
      viewBox: "0 0 48 48",
      elements: [
        { type: "circle", props: { cx: 21, cy: 21, r: 12 } },
        { type: "path", props: { d: "M30 30l11 11" } },
      ],
    },
  },
  {
    title: "Creative thinking",
    description: "Fresh concepts and directions to choose from.",
    svg: {
      viewBox: "0 0 48 48",
      elements: [
        { type: "path", props: { d: "M24 5a12 12 0 0 0-6 22c1 1 1 3 1 4h10c0-1 0-3 1-4a12 12 0 0 0-6-22zM19 37h10M21 42h6" } },
      ],
    },
  },
  {
    title: "Consultation",
    description: "Reviews, workshops and advice on design, XR and brand.",
    svg: {
      viewBox: "0 0 48 48",
      elements: [
        { type: "path", props: { d: "M7 9h24v16H18l-6 6v-6H7zM35 19h6v14h-4v6l-6-6H21v-5" } },
      ],
    },
  },
];
