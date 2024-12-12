module.exports = {
    images: {
      domains: ['img.youtube.com', 'addplaybuttontoimage.way4info.net'],
    },
    async headers() {
        return [
          {
            source: '/:path*', // Apply to all pages
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable', // Cache for 1 year
              },
            ],
          },
        ];
      },    
  };
  