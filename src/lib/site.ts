export const site = {
  name: "ECLIPSE",
  description:
    "ECLIPSE is a scientific and digital student club at ESGEN, built around discovery, research, workshops, and meaningful exchange.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const socialLinks = [
  { label: "LinkedIn", href: process.env.NEXT_PUBLIC_CLUB_LINKEDIN },
  { label: "TikTok", href: process.env.NEXT_PUBLIC_CLUB_TIKTOK },
  { label: "Instagram", href: process.env.NEXT_PUBLIC_CLUB_INSTAGRAM },
  {
    label: "Email",
    href: process.env.NEXT_PUBLIC_CLUB_EMAIL
      ? `mailto:${process.env.NEXT_PUBLIC_CLUB_EMAIL}`
      : undefined,
  },
].filter((link): link is { label: string; href: string } => Boolean(link.href));

export const clubSocialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/eclipse-esgen" },
  { label: "Instagram", href: "https://www.instagram.com/eclipse.esgen" },
  { label: "TikTok", href: "https://www.tiktok.com/@eclipse.club4" },
] as const;
