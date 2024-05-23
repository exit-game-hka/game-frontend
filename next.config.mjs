/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/exit-game-frontend",
    transpilePackages: ['three'],
    compiler: {
        styledComponents: true,
    },
    output: "standalone",
};

export default nextConfig;
