import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve = config.resolve || {};
            config.resolve.alias = config.resolve.alias || {};
            config.resolve.alias["yjs"] = path.resolve(__dirname, "node_modules/yjs");
        }
        return config;
    },
};

export default nextConfig;
