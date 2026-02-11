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
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
