# @polkadex/thea

## 5.1.0

### Minor Changes

- 209e392: In this PR, we will be adding Deposit/Withdrawal for THEA for Bifrost chain, supporting BNC and vDOT tokens.

### Patch Changes

- Updated dependencies [209e392]
  - @polkadex/polkadex-api@3.6.0

## 5.0.0

### Major Changes

- 7a112a3: We have successfully added all the chains for cross chain transfer to Polkadex. In this task, we will be adding the withdraw logic for THEA so that user can withdraw thier assets from Polkadex network to other network.

  1. Polkadex to AssetHub - USDT, DED, PINK, USDC
  2. Polkadex to Astar - ASTR
  3. Polkadex to Moonbeam - GLMR
  4. Polkadex to Interlay - IBTC
  5. Polkadex to Unique - UNQ
  6. Polkadex to Polkadot - DOT
  7. Polkadex to Phala - PHA

## 4.1.0

### Minor Changes

- 966fba6: This task is about to add the metadata of supported assets for Polkadex network and make the project build succesful (if it breaks anything)
- a79b5ab: In this PR, we will be adding Polkadot XCM chain for DOT asset transfer. Users would be allowed to transfer DOT from Polkadot to Polkadex.

### Patch Changes

- Updated dependencies [966fba6]
- Updated dependencies [a79b5ab]
  - @polkadex/polkadex-api@3.5.0

## 4.0.0

### Major Changes

- dff153a: This PR aims to add the THEA interfaces and classes supported for substrate and EVM ecosystem. Along with that, we created a test-app for testing the related stuff we created, which would be used in future as well to test more chains/assets.

### Minor Changes

- df6030f: In this PR, we will be adding support for DED, PINK and USDC token which would be transferable from AssetHub to Polkadex.

### Patch Changes

- Updated dependencies [df6030f]
- Updated dependencies [6b5a833]
  - @polkadex/polkadex-api@3.4.0
  - @polkadex/utils@0.2.0

## 3.1.2

### Patch Changes

- 2dd551f: Thea api
