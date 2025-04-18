import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    PEKERJA_AI_IMG_UPLOAD_KEY: process.env.PEKERJA_AI_IMG_UPLOAD_KEY,

  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // Allow images from all domains
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
