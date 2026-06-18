const nextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ['192.168.100.75'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      },
    ],
  },
};

export default nextConfig;
