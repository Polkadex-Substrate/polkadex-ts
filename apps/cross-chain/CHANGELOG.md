# @polkadex/cross-chain

## 0.3.1

### Patch Changes

- 2ab5735: This task aims to integrate Astar chain & Interlay chain and more remaining chains which will allow deposit from respective chains to Polkadex. The objective is to enhance cross-chain functionality.

  - [x] Astar to Polkadex - ASTR
  - [x] Interlay to Polkadex - IBTC
  - [x] Moonbeam to Polkadex - GLMR
  - [x] Unique to Polkadex - UNQ
  - [x] Phala to Polkadex - PHA

  from respective chains to Polkadex network.

- Updated dependencies [7a112a3]
  - @polkadex/thea@5.0.0

## 0.3.0

### Minor Changes

- 966fba6: This task is about to add the metadata of supported assets for Polkadex network and make the project build succesful (if it breaks anything)
- a79b5ab: In this PR, we will be adding Polkadot XCM chain for DOT asset transfer. Users would be allowed to transfer DOT from Polkadot to Polkadex.

### Patch Changes

- Updated dependencies [966fba6]
- Updated dependencies [a79b5ab]
  - @polkadex/thea@4.1.0

## 0.2.0

### Minor Changes

- df6030f: In this PR, we will be adding support for DED, PINK and USDC token which would be transferable from AssetHub to Polkadex.
- dff153a: This PR aims to add the THEA interfaces and classes supported for substrate and EVM ecosystem. Along with that, we created a test-app for testing the related stuff we created, which would be used in future as well to test more chains/assets.

### Patch Changes

- Updated dependencies [df6030f]
- Updated dependencies [dff153a]
  - @polkadex/thea@4.0.0
