/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'storage.c-2.us-east-2.aws.neon.tech'],
  },
  serverExternalPackages: ['@prisma/client'],
  // Configuración de headers para evitar problemas
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // Optimizaciones para reducir el tamaño de las cabeceras
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig 