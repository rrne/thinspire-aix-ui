/** @type {import('next').NextConfig} */

const path = require('path');
const withImages = require('next-images');
const withLess = require("next-with-less");

const nextConfig = withImages(
  withLess({
    reactStrictMode: true,
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')], 
    },
    images: {
      disableStaticImages: true,
    },
    assetPrefix: ".", // 배포모드 설정
    trailingSlash: true,
  })
)

module.exports = nextConfig