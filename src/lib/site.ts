const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://eclipse-esgen.vercel.app");

// Normalise once: strip trailing slashes so sitemap / canonical / OG URLs
// never emit `//about` or `http://localhost:3000` in production builds.
export const siteUrl = rawUrl.replace(/\/+$/, "");

export const site = {
  name: "ECLIPSE",
  fullName: "ECLIPSE — Scientific & Digital Student Club at ESGEN",
  description:
    "ECLIPSE is the scientific and digital student club at ESGEN (Higher School of Management & Digital Economy), Kolea University Hub, Algeria — workshops, research sprints, events and community for curious students.",
  url: siteUrl,
  locale: "en_US",
  themeColor: "#082b40",
  email: process.env.NEXT_PUBLIC_CLUB_EMAIL ?? "eclipse_club@esgen.edu.dz",
  keywords: [
    "ECLIPSE",
    "ECLIPSE ESGEN",
    "ESGEN student club",
    "ESGEN Kolea",
    "Higher School of Management and Digital Economy",
    "student club Algeria",
    "scientific club Algeria",
    "digital economy students",
    "workshops Kolea",
    "research sprints students",
    "university events Algeria",
  ],
  ogImage: `${siteUrl}/opengraph-image`,
};

export const clubSocialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/eclipse-esgen" },
  { label: "Instagram", href: "https://www.instagram.com/eclipse.esgen" },
  { label: "TikTok", href: "https://www.tiktok.com/@eclipse.club4" },
] as const;

export const socialLinks = [
  { label: "LinkedIn", href: process.env.NEXT_PUBLIC_CLUB_LINKEDIN || clubSocialLinks.find((l) => l.label === "LinkedIn")!.href },
  { label: "TikTok", href: process.env.NEXT_PUBLIC_CLUB_TIKTOK || clubSocialLinks.find((l) => l.label === "TikTok")!.href },
  { label: "Instagram", href: process.env.NEXT_PUBLIC_CLUB_INSTAGRAM || clubSocialLinks.find((l) => l.label === "Instagram")!.href },
  {
    label: "Email",
    href: process.env.NEXT_PUBLIC_CLUB_EMAIL
      ? `mailto:${process.env.NEXT_PUBLIC_CLUB_EMAIL}`
      : undefined,
  },
].filter((link): link is { label: string; href: string } => Boolean(link.href));
