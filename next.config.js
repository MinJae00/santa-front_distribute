/** @type {import('next').NextConfig} */
// 이미지 사용 코드 추가
const withImages = require('next-images');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
}

module.exports = nextConfig
module.exports = withImages();

module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["advent-reindeer-test.s3.ap-northeast-2.amazonaws.com", 'localhost'],
    formats: ['image/webp'],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: 'http://3.39.27.62:8000/:path*',
      },
    ];
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: 'http://localhost:8000/:path*'
  //     },
  //   ];
  // },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300
    };
    return config;
  }
};