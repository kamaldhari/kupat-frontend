import { i18n } from "./next-i18next.config.mjs";

/* @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'strapi.kupat.webcase.me',
      },
      {
        protocol: 'https',
        hostname: 'kupatlv-test',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      }
    ],
    
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
          name: '[name].[hash].[ext]',
          esModule: false,
        },
      },
    });

    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  i18n
};

export default nextConfig;
