/** @type {import('next').NextConfig} */
const withImages = require('next-images')

module.exports = Object.assign({
  reactStrictMode: true,
}, withImages({
  webpack(config, options) {
    return config
  }
}));
