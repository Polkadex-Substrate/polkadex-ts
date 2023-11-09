module.exports = {
  root: true,
  extends: ["@polkadex-ts/eslint-config"],
  settings: {
    next: {
      rootDir: ["apps/*/**", "packages/*/**"],
    },
  },
};
