/** @type {import('next').NextConfig} */

function defineNextConfig(config) {
  return config;
}

module.exports = defineNextConfig({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
});
