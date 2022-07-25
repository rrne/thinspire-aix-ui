/** @type {import('next').NextConfig} */

const path = require('path');
const withImages = require('next-images');
const withLess = require("next-with-less");

module.exports = withImages(
  withLess({
    sassOption:{
      includePaths: [path.join(__dirname, 'styles')],
      reactStrictMode: true,
      prependData: '@import "index.scss";'
    },
    lessLoaderOptions: {
    },
    images: {
      disableStaticImages: true
    },
    distDir : "build",
    trailingSlash: true,
    exportPathMap: function() {
        return {
            '/': {page: '/'},
            '/404': { page: '/404' },
            '/app': { page: '/App' },
        }
    }
  })
)