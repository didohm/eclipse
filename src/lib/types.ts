export type Leader = {
  id: string;
  name: string;
  position: string;
  photoUrl: string;
  bio: string;
  linkedinUrl: string;
};

export type ClubEvent = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  date: string;
  location: string;
  images: string[];
  primaryImage: string;
  slug: string;
};
