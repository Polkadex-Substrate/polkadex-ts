# @polkadex/ux

## 4.6.0

### Minor Changes

- bf9c26a: feat: table component

## 4.5.0

### Minor Changes

- 7bb7b55: feat: tabs component

## 4.4.0

### Minor Changes

- f4187a2: - fix: Automatic Positioning: Eliminates manual adjustments, preventing layout distortions.
  - feat: Close Interaction on Click Outside (Optional props): Added a prop for closing interactions when clicking outside.

## 4.3.0

### Minor Changes

- 737ec50: feat: Responsive Drawer Component

## 4.2.0

### Minor Changes

- 4c2b41a: feat: toast component

## 4.1.0

### Minor Changes

- 5322c27: feat: Reusable Hover-Triggered Component

## 4.0.0

### Major Changes

- dc5b31c: imporve naming convention w.r.t wallets and accounts
- b9e7513: refactor!: remove "wallet" naming convention.

### Patch Changes

- Updated dependencies [dc5b31c]
  - @polkadex/react-providers@1.0.0

## 3.1.0

### Minor Changes

- 5b7d868: fix: removed @chainsafe/metamask-polkadot-adapter dependency
  fix: metamask-polkadot-snap filtered from connect wallet

### Patch Changes

- Updated dependencies [75d7c2f]
- Updated dependencies [5b7d868]
  - @polkadex/react-providers@0.3.0

## 3.0.0

### Major Changes

- 6abcf3f: Fixes:
  - [x] export loading processing component
  - [x] change default interaction background
  - [x] remove creditCard icon fill

## 2.1.0

### Minor Changes

- a4e9d17: - [x] Introduction of a common and border palette.
  - [x] Implementation of a new appearance for tertiary buttons.
  - [x] Addition of a new loading component specifically designed for processing transactions.
  - [x] Correction of walletCard background.
  - [x] Correction of providerCard background.
  - [x] Correction of checkbox background.
  - [x] Correction of interaction background.
  - [x] Removal of button role from chainCard.
  - [x] Improved styling for wallet interactions.
  - [x] Enhancement of connect wallet interaction.
  - [x] Replacement of the authorization Icon component, using now extension icon.
  - [x] Removal of fill from folder and device icons.
  - [x] Adjustment of Copy action stopPropagation.
  - [x] Styling refinement for Input passcode.
  - [x] Removal of interaction hover duration.
  - [x] Adjustment of default Text size for Typography.
  - [x] Elimination of placements margin.
  - [x] Interaction overflow enhancements.

## 2.0.1

### Patch Changes

- b95b78c: ## Changes
  - [x] Passcode Input:
    - Local state has been replaced with a state and action provided by the parent component, facilitating better state management.
  - [x] Modal Component:
    - Removed overflow and max-height properties to provide better control over the customization of custom components.
  - [x] Multistep Component:
    - Added a new resetOnUnmount prop to reset the default state when the component is unmounted.
    - Introduced a placement prop for Multistep Interactive.
  - [x] Popover Component:
    - Eliminated overflow for improved customization control over custom components.
  - [x] Typography Component:
    - Adjusted the default typography text size to sm from md for a more refined appearance.
  - [x] Authorization Component:
    - Implemented a fix to remove a potential loop scenario when there are no extension authorizations.

## 2.0.0

### Major Changes

- a98bcfc: ## New shared components:

  - [x] Select Wallet-Provider (Polkadotjs, Talisman, SubWallet, etc)
  - [x] Processing Transaction Loading
  - [x] Authorization
  - [x] Wallets Selection

  ## Corrections Made:

  - [x] Button Component: Fixed styles
  - [x] Token Component: Included in index.ts for proper accessibility
  - [x] Interaction Title: Fixed styles
  - [x] Modal: Fixed compatibility issues, ensuring seamless integration into Next.js projects
  - [x] PostCSS: Applied necessary fixes

## 1.0.1

### Patch Changes

- 4046d3e: (ignore): add prepublish script
- Updated dependencies [4046d3e]
  - @polkadex/react-providers@0.0.2

## 1.0.0

### Major Changes

- 2beeb9c: Initial release

### Patch Changes

- Updated dependencies [2beeb9c]
  - @polkadex/react-providers@0.0.1
