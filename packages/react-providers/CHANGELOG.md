# @polkadex/react-providers

## 2.2.0

### Minor Changes

- 1c2c6e9: This changes in this PR handles the error events for blockchain gracefully and fixes the transaction status array. Along with that, there are minor changes in Progress bar component to fix it's statuses checks.

## 2.1.0

### Minor Changes

- 4ac47e2: fix: transaction status

## 2.0.0

### Major Changes

- 3da8bef: 1. This PR aims to make a transaction manager provider which takes a submittable extrinsic as input and enqueue it. 2. Submits the extrinsic one by one from queue & updates the status and sends it back

## 1.2.0

### Minor Changes

- 280ca05: - [x] fix: Resolved an issue in the ExtensionsAccounts provider by memoizing functions and adding a dependency in useEffect.
  - [x] fix: Resolved an issue in the Extensions provider by memoizing functions and adding a dependency in useEffect.
  - [x] feat: Enhanced Next.js Support: To provide better support for Next.js, we will adopt the "use client" tag.

## 1.1.1

### Patch Changes

- 6696360: feat: Swap api
- Updated dependencies [6696360]
  - @polkadex/local-wallets@2.0.3
  - @polkadex/utils@0.1.1

## 1.1.0

### Minor Changes

- b66f916: Revert PR#52: Undo Client-Side Compatibility Fix in @polkadot-cloud/assets Package

## 1.0.0

### Major Changes

- dc5b31c: imporve naming convention w.r.t wallets and accounts

### Patch Changes

- Updated dependencies [dc5b31c]
  - @polkadex/local-wallets@2.0.0

## 0.3.0

### Minor Changes

- 75d7c2f: fix: dynamic import @polkadot-cloud/assets/extensions
- 5b7d868: fix: removed @chainsafe/metamask-polkadot-adapter dependency
  fix: metamask-polkadot-snap filtered from connect wallet

## 0.2.0

### Minor Changes

- cdc918a: Provider hook improvements

## 0.1.0

### Minor Changes

- da1a08f: Eslint dependency removed

## 0.0.3

### Patch Changes

- d2f7f25: Trade account provider
- Updated dependencies [d2f7f25]
  - @polkadex/trade-wallet@1.0.0

## 0.0.2

### Patch Changes

- 4046d3e: (ignore): add prepublish script
- Updated dependencies [4046d3e]
  - @polkadex/react-hooks@0.0.2
  - @polkadex/utils@0.0.2

## 0.0.1

### Patch Changes

- 2beeb9c: Initial release
- Updated dependencies [2beeb9c]
  - @polkadex/react-hooks@0.0.1
  - @polkadex/utils@0.0.1
