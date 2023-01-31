// @ts-check

const nextConfig = {
  output: 'standalone',
  images: {
    domains: [
      'pbs.twimg.com',
      'avatars.githubusercontent.com',
      'i.imgur.com',
      'user-images.githubusercontent.com',
      'colab.research.google.com',
      'avatars.githubusercontent.com',
      'avatars.githubusercontent.com',
      'github.com',
    ],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'Strict-Transport-Security', value: '' },
        { key: 'X-Robots-Tag', value: 'all' },
        { key: 'X-Frame-Options', value: 'DENY' },
      ],
    },
  ],
  env: {
    webpack5: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
