module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'addplaybuttontoimage.way4info.net',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*', // Apply to all pages
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=31536000, immutable', // Cache for 1 year
  //         },
  //       ],
  //     },
  //   ];
  // },
};
