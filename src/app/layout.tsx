// import {} from "@karthi" // @karthi will be the workspace name.
import type { Metadata } from "next";
import localFont from "next/font/local";
import { AmbientGlow, CustomCursor, RevealObserver } from "@karthi/ui";
import { ViewTransitionProvider } from "@karthi/providers";
import "@karthi/styles";

const bigShoulders = localFont({
  src: [
    {
      path: "./fonts/BigShouldersDisplay-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/BigShouldersDisplay-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-big-shoulders",
  display: "swap",
});

const dmSans = localFont({
  src: [
    {
      path: "./fonts/DMSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/DMSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "./fonts/InstrumentSerif-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://karthi.me/"),
  title: "Karthik Narayanan — UI/UX, 3D, Code & XR.",
  description:
    "Portfolio of Karthik Narayanan — Creative Officer, UI/UX Designer & 3D Artist with 7+ years creating intuitive products and immersive 3D/XR experiences.",
  authors: [{ name: "Karthik Narayanan" }],
  keywords: [
    "Karthik Narayanan",
    "UI/UX Designer",
    "3D Artist",
    "Creative Officer",
    "Web Development",
    "XR",
    "Blender",
    "Three.js",
    "React",
    "Riglabs",
    "Zilicon",
    "Portfolio",
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    url: "https://karthi.me/",
    title: "Karthik Narayanan — UI/UX, 3D, Code & XR.",
    description:
      "Creative Officer specializing in UI/UX design, 3D modeling, web and XR. From code to pixels to polygons to 3D worlds.",
    images: [
      {
        url: "/meta/og-image.png",
        width: 1200,
        height: 630,
        alt: "Karthik Narayanan — UI/UX, 3D, Code & XR.",
      },
    ],
    siteName: "Karthik Narayanan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karthik Narayanan — UI/UX, 3D, Code & XR.",
    description:
      "Creative Officer specializing in UI/UX design, 3D modeling, web and XR. From code to pixels to polygons to 3D worlds.",
    images: ["/meta/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Karthik Narayanan",
  url: "https://karthi.me/",
  jobTitle: "Creative Officer",
  sameAs: ["https://www.linkedin.com/in/wizardsixteen", "https://riglabs.co", "https://wa.me/917306728337"],
  knowsAbout: [
    "UI/UX Design",
    "3D Modeling",
    "Web Development",
    "XR & Augmented Reality",
    "Creative Direction",
    "Front-end Engineering",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${dmSans.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#0b0b0c" />
        <meta name="msapplication-TileColor" content="#0b0b0c" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <AmbientGlow />
        <CustomCursor />
        <RevealObserver />
        <ViewTransitionProvider>{children}</ViewTransitionProvider>
      </body>
    </html>
  );
}
