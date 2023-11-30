---
"@polkadex/ux": patch
---

## Changes
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
