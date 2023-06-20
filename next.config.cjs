/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    console.log('redirect!');
    return [
      {
        source: '/details/:id*',
        destination: '/details/:id/1',
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
