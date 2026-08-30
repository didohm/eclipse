import { v2 as cloudinary } from "cloudinary";

function configured() {
  return Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
}

export function uploadToCloudinary(file: File, folder: string) {
  if (!configured()) throw new Error("Cloudinary is not configured");
  cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: "image", transformation: [{ quality: "auto", fetch_format: "auto" }] }, (error, result) => {
      if (error || !result?.secure_url) reject(error ?? new Error("Upload failed"));
      else resolve(result.secure_url);
    });
    file.arrayBuffer().then((buffer) => stream.end(Buffer.from(buffer))).catch(reject);
  });
}
