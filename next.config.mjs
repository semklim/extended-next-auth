/* eslint-disable import/no-extraneous-dependencies */
import withBundleAnalyzer from '@next/bundle-analyzer';

const HOST_NAMES = process.env.HOST_NAMES?.split(',') || [];

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    remotePatterns: HOST_NAMES.map((host) => ({
      hostname: host,
    })),
  },
};

export default bundleAnalyzer(nextConfig);
