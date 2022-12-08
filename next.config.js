/** @type {import('next').NextConfig} */

const path = require('path');
const withImages = require('next-images');
const withLess = require("next-with-less");

// const isProd = process.env.NODE_ENV === 'production'

const nextConfig = withImages(
  withLess({
    reactStrictMode: false,
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')], 
    },
    images: {
      disableStaticImages: true,
    },
    // assetPrefix: isProd ? "" : "", // 배포모드 설정
    trailingSlash: true, // 뒤에 슬래시를 붙여주는것
    useFileSystemPublicRoutes: false, //파일 시스템 라우팅 on/off
  })
)

module.exports = nextConfig