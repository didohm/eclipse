import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ECLIPSE — Scientific & Digital Student Club at ESGEN",
    short_name: "ECLIPSE",
    description:
      "ECLIPSE is the scientific and digital student club at ESGEN, Kolea — workshops, research sprints, events and community.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f1",
    theme_color: "#082b40",
    lang: "en",
    dir: "ltr",
    categories: ["education", "social"],
    icons: [
      {
        src: "/eclipse-logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
