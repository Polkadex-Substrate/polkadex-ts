# @polkadex/thea

## 5.9.0

### Minor Changes

- 7aa046e: Added support for non-native assets from Bifrost to Polkadex
- 3716842: Added support for non-native assets of Moonbeam from Moonbeam to Polkadex and vice-versa

## 5.8.1

### Patch Changes

- 6f3c20a: Defined minimum bridge amount for some cross-chain combinations

## 5.8.0

### Minor Changes

- c12d819: Added support for more tokens between Astar and Polkadex

## 5.7.0

### Minor Changes

- 7a073e3: In this PR, we will be allowing DOT, GLMR, BNC & vDOT transfer from Interlay to Polkadex network.

## 5.6.0

### Minor Changes

- 539fde6: Added support for PDEX transfer between Moonbeam and Polkadex

## 5.5.1

### Patch Changes

- 02a8dda: Added destination fees for XCM transactions

## 5.5.0

### Minor Changes

- 64ec300: 1. Ask permisson for Extension to fetch accounts for AccountComboBox component 2. Remove `frozen` value from `free` balance while fetching PDEX balance

## 5.4.0

### Minor Changes

- 68c3484: Added a new enum for ChainType and minor UI fix

## 5.3.0

### Minor Changes

- a04122b: Added a helper function to get all supported assets and fixed issue with THEA withdrawal

## 5.2.0

### Minor Changes

- 0f4ec4c: In this PR, we will be doing a minor change in cross-chain interfaces that we designed earlier. There was a design flaw which have been fixed in this PR now.

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
