import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Quality 90: the work shots are UI screenshots full of small text, which 75 visibly smudges.
  images: { formats: ['image/avif', 'image/webp'], qualities: [75, 90] },
};

export default nextConfig;
