import { z } from "zod";

const url = z.string().url("Enter a valid URL.");
export const leaderSchema = z.object({
  name: z.string().trim().min(2, "Enter a name."),
  position: z.string().trim().min(2, "Enter a position."),
  photoUrl: z.string().url("Upload a portrait first."),
  bio: z.string().trim().min(8, "Add a short bio."),
  linkedinUrl: url,
});

export const eventSchema = z.object({
  title: z.string().trim().min(2, "Enter an event title."),
  shortDescription: z.string().trim().min(8, "Add a short description."),
  fullDescription: z.string().trim().min(20, "Add the full event description."),
  date: z.string().date("Select a valid date."),
  location: z.string().trim().min(2, "Enter the event location."),
  images: z.array(z.string().url()).min(1, "Upload at least one image."),
  primaryImage: z.string().url("Select a primary image."),
}).refine((value) => value.images.includes(value.primaryImage), { path: ["primaryImage"], message: "The primary image must be one of the uploaded images." });

export const contactSchema = z.object({
  lastName: z.string().trim().min(2, "Enter your name."),
  firstName: z.string().trim().min(2, "Enter your first name."),
  email: z.string().trim().email("Enter a valid email."),
  phone: z.string().trim().min(6, "Enter a valid phone number."),
  message: z.string().trim().min(15, "Tell us a little more."),
});
