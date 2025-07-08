import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: ({ hash }) => `folink_${hash}`,
});

/** @type {import('next').NextConfig} */
const nextConfig = withVanillaExtract({
  
});

export default nextConfig;
