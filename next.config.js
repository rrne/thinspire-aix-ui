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
    distDir : "build",
    trailingSlash: true,
  })
)

module.exports = nextConfig