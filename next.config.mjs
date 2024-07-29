/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    transpilePackages: ['three'],
    compiler: {
        styledComponents: true,
    },
    output: "standalone",
};

export default nextConfig;
