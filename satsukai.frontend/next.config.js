/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cssModules: {
    // ...
    exclude: [
      /tailwind\.css$/, 
    ],
  },
}

module.exports = nextConfig
