const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
// pull in the rnx-kit symlink resolver factory
const createMetroResolverSymlinks = require("@rnx-kit/metro-resolver-symlinks");

const projectRoot = __dirname;

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

// 1) Prevent Metro from watching folders above this one
config.watchFolders = [];

// 2) Only resolve modules from this folder’s node_modules
config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [path.resolve(projectRoot, "node_modules")],
  // hook in the symlink‐aware resolver
  resolveRequest: createMetroResolverSymlinks(),
};

// 3) SVG transformer stays the same
config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);

config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
config.resolver.sourceExts.push("svg");

module.exports = config;
