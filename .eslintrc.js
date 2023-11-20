module.exports = {
  root: true,
  extends: ["@polkadex/eslint-config"],
  settings: {
    next: {
      rootDir: ["apps/*/**", "packages/*/**"],
    },
  },
};
