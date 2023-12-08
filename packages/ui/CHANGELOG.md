# @polkadex/ux

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
