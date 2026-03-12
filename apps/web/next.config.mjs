/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      { 
        hostname: 'i.pinimg.com', 
      }
    ]
  }
}

export default nextConfig
