/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three'],
    compiler: {
        styledComponents: true,
    },
    output: "standalone",
};

export default nextConfig;
