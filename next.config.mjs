/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'placehold.co',
            port: ""
          },
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '8080',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
