import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Asif Shahriar Tauhid — Portfolio",
    short_name: "Asif Tauhid",
    description: "Full Stack Developer Portfolio — Asif Shahriar Tauhid",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
