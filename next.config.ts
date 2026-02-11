import type { NextConfig } from "next";

// Environment variable validation
const requiredEnvs = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

const missingEnvs = requiredEnvs.filter(env => !process.env[env]);

if (missingEnvs.length > 0) {
  if (process.env.NODE_ENV === 'production') {
    console.error(`❌ Missing required environment variables: ${missingEnvs.join(', ')}`);
    // In strict production builds, you might want to throw an error:
    // throw new Error(`Missing required environment variables: ${missingEnvs.join(', ')}`);
  } else {
    console.warn(`⚠️ Missing environment variables: ${missingEnvs.join(', ')}`);
  }
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
