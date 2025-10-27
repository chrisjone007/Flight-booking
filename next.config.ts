/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'output: export' for dynamic features
  trailingSlash: true,
  images: {
    unoptimized: true, // Still needed for Netlify
  },
  // Enable CORS if needed
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ]
  }
}

module.exports = nextConfig