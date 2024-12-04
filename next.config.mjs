/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**', // مجاز کردن تمامی دامنه‌ها
            port: '', // برای پورت می‌توانید خالی بگذارید
            pathname: '/**', // مجاز کردن تمامی مسیرها
          },
          {
            protocol: 'http',
            hostname: '**',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
