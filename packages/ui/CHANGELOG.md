# @polkadex/ux

## 6.25.0

### Minor Changes

- 68c3484: Added a new enum for ChainType and minor UI fix

## 6.24.1

### Patch Changes

- 596a9a0: Updated Moonbeam logo

## 6.24.0

### Minor Changes

- f7fe0f4: feat: Intro component

## 6.23.0

### Minor Changes

- accc979: fix: Dropdown Item hover style
  fix: truncateNames helper
  fix: ProviderCard custom props
  feat: AccountCombobox component
  feat: SelectChain component
  fix: Input mobile/desktop styles
  fix: Icon component props
  fix: Token component props
  fix: Chain component props
  feat: ExtensionsAccounts + Authorization reusable component
  feat: Connect Wallet reusable component
  fix: theme variants

## 6.22.0

### Minor Changes

- 0adc374: - [x] feat: new quaternary color variant to the Button component.
  - [x] fix: Removed unnecessary child validation from the HoverCard component.
  - [x] fix: Improved the style of the ProviderCard component.
  - [x] feat: HoverInformation component
  - [x] feat: ResponsiveCard component
  - [x] feat: Chain componen
  - [x] feat: GenericHorizontalCard component

## 6.21.0

### Minor Changes

- 6f4ba9c: feat: Implemented new SVG components for the following blockchain chains: AssetHub, Astar, Bifrost, Ethereum, Interlay, Moonbeam, Phala, Polkadex, Polkadot, Unique, Unknown

## 6.20.0

### Minor Changes

- 62b428f: Added vDOT and BNC logos

## 6.19.0

### Minor Changes

- 1c2c6e9: This changes in this PR handles the error events for blockchain gracefully and fixes the transaction status array. Along with that, there are minor changes in Progress bar component to fix it's statuses checks.

### Patch Changes

- Updated dependencies [1c2c6e9]
  - @polkadex/react-providers@2.2.0

## 6.18.0

### Minor Changes

- 4ac47e2: fix: transaction status

### Patch Changes

- Updated dependencies [4ac47e2]
  - @polkadex/react-providers@2.1.0

## 6.17.0

### Minor Changes

- e3b22d4: fix: ProgressBar component closing behavior

## 6.16.0

### Minor Changes

- 6cba38e: feat: progressBar component

## 6.15.0

### Minor Changes

- f776b00: Added SVG tokens for USDC, DED, PINK and UNQ

## 6.14.0

### Minor Changes

- 39755b0: fix: passcode preventScroll onFocus
  fix: change value in the current Index item if is focused

## 6.13.0

### Minor Changes

- 0bf8ed3: - [x] fix: Export DateRange types in the Calendar Component.
  - [x] feat: Passcode component has been decoupled from Input for better modularity.
  - [x] fix: Passcode component's style and validations have been improved.
  - [x] fix: Input Primary component's style have been improved.
  - [x] fix: Removed unnecessary animation from the Interaction component.
  - [x] fix: Modal component's animation has been enhanced.
  - [x] fix: Updated usePrevious function to use a generic type.
  - [x] fix: Resolved conflicts in Connect Wallet Components.

## 6.12.0

### Minor Changes

- 19b356a: This PR aims to add the calendar and date picker component

## 6.11.0

### Minor Changes

- 0dd6bc5: feat: interactable component

## 6.10.0

### Minor Changes

- be60fb4: feat: carousel component

## 6.9.0

### Minor Changes

- 6be628f: - [x] fix: Resizable Component ForwardRef Implementation
  - [x] fix: Icon Library Upgrade - Heroicons to Remixicons:
  - [x] fix: Overlay Z-Index Adjustment for Dropdown, Popover, and Modal
  - [x] fix: Remove Fill from Three Icons - Ask, Bid, and AskAndBid
  - [x] fix: New Input Component Prop - containerProps

## 6.8.0

### Minor Changes

- 5179108: fix: Toaster Styles improved

## 6.7.0

### Minor Changes

- 02b8dac: feat: ScrollArea component
- fe3cc67: feat: resizable component

## 6.6.0

### Minor Changes

- 8313eca: - [x] fix: Adjusted default colors for ghost buttons.
  - [x] fix:Enhanced button props to better manage color attributes.
  - [x] fix: use of client tags for client-side components.

## 6.5.0

### Minor Changes

- aade468: fix: Input.Passcode to clear the last entered value upon reset and focus on the first position for improved usability.
  fix: styles of Toast components by removing inappropriate opacity styles to ensure a consistent and visually appealing user experience.
  fix: Functionality of the Width and Height properties in the Skeleton component.
  fix: Optimized Dropdown.Trigger reduced gap space.
  fix: superposition feature in Dropdown.Trigger.

## 6.4.0

### Minor Changes

- 2492db3: feat: toggleGroup component

## 6.3.0

### Minor Changes

- ee1d0ad: feat: filterGroup component

## 6.2.0

### Minor Changes

- ae62a54: feat: new Searchable component

## 6.1.0

### Minor Changes

- 31918f8: Fixes
  - [x] fix: typeScript errors
  - [x] fix: forward refs
  - [x] fix: client components

## 6.0.0

### Major Changes

- 7d1919f: - [x] fix: Display an unknown icon if the token name is empty.
  - [x] fix: Remove the Slot component and replace it with asChildProps from Radix (used in Tooltip, Dropdown, and Hovercard).
  - [x] fix: Remove default styles of Accordion.item and delegate the responsibility to the child.
  - [x] fix: Move text names of logos to allow hiding on small devices.
  - [x] fix: Improve isValidComponent by returning the rest of children items without the targetChild.
  - [x] fix: Enhance the Icon component by adding support for custom sizes and custom children.
  - [x] fix: Move AppearanceVariants from the Typography component to helpers.
  - [x] fix: Modify Dropdown.Item and Dropdown.ItemRadio to use asChild.
  - [x] fix: Enable forward refs for Dropdown elements.
  - [x] fix: Add custom classes support for Input.
  - [x] fix: Improve interaction by adding support for custom children and font size in Input.
  - [x] fix: Address interaction overflow by adjusting the initial transition.
        component to enhance personalization.
  - [x] fix: Forward refs for Popover components.
  - [x] fix: Upgrade Sonner version.
  - [x] fix: Adapt Passcode to be compatible with other tools like Formik, enhancing the system for updating values.
  - [x] fix: Extend the personalization of the input div container by allowing additional props.
  - [x] feat: [Breaking Changes] Introduce new Dropdown.icon and Dropdown.Overlay components, decoupled from Dropdown.Trigger with withIcon and withOverlay props.
  - [x] feat: Introduce new Dropdown.superpositionTrigger prop.
  - [x] feat: Introduce new Popover.icon component.
  - [x] feat: Introduce new PopConfirm.Overlay component.
  - [x] feat: Add new icons - transfer, free, transferInverted, trading, and bridge.
  - [x] feat: [Breaking Changes] Replace the Input.Vertical action props with a new Input.Action
  - [x] feat: [Breaking Changes] Replace Loading.Processing with two new components - Processing component and TransactionLoading template, enhancing personalization.
  - [x] feat: [Breaking Changes] Introduce a new Table.Icon to decouple the icon from Table.Head.
  - [x] feat: Introduce a new Accordion.Icon component to decouple the icon from the trigger.

## 5.3.0

### Minor Changes

- e6a1500: - [x] feat: new PopConfirm component.
  - [x] fix: Some elements like buttons or text need a ref to be used within a popover
  - [x] fix: The type checking of components has been removed to reuse the popover

## 5.2.0

### Minor Changes

- afbe391: - [x] feat: added a new button size between xs and sm for more flexibility in styling.
  - [x] fix: Text Button Size Adjustment: Adjusted the default text button size to sm to ensure better compatibility with various fonts.
  - [x] feat: Component Decoupling and Button Size Reduction: Decoupled Label from Input.Vertical, reducing the size of the action button within this component.
  - [x] fix: Styling Enhancements for Connect Wallet Interaction: Improved styles for components such as "Connect Wallet," "Authorization," "ExtensionAccounts," and "Processing" to achieve better visual control.
  - [x] fix: Tab Visibility Improvement: Made inactive tabs invisible.
  - [x] feat: Popover Overlay Expansion: Expanded the overlay in Popover to match the behavior of Dropdown.
  - [x] fix: Typeof Issue Resolution: Addressed typeof issues (number and string) in Table and Dropdown components.
  - [x] feat: Table Head Icon Prop: Introduced a new prop in Table head to include an icon, offering additional customization options.

## 5.1.0

### Minor Changes

- 28292b8: This PR aims to fix the dead links of privacy policy and terms of use

## 5.0.0

### Major Changes

- e962fe8: ### New components

  - [x] New Label Component: Created a new Label component for use in both Checkbox and Input elements.
  - [x] New Pagination Component: Implemented a new pagination component to enhance navigation and usability within tables.

  ### Fixes

  - [x] Decouple Label Component: Separated the Label component to allow for easy customization.
  - [x] Improve Separator Styles: Enhanced the styling of the Separator component, providing better customization options.
  - [x] Enhance Typography Component:
    - Expanded the range of sizes and colors for the Typography component.
    - Ensured correct application of styles for Typography.Heading.
  - [x] New Underline Button: Introduced a new button called underline as a reference for links.
        Distinguish Button Styles:
  - [x] Differentiated between the Button Light and Ghost styles, addressing their similarity.
        Remove Padding from Input.Search:
  - [x] Eliminated unnecessary padding from the Input.Search component.
  - [x] Adjust Input Sizes: Ensured that the sizes of input elements adjust based on the size of the placeholder.
  - [x] Separate Ticker, Buttons, Label, and Actions from Input.Primary: Components are now decoupled to enhance customization.
  - [x] Add arrowProps to Hoverable Card: Included arrowProps in the Hoverable Card component.
  - [x] Enhance Token Component: Improved the Token component to support various sizes.
        Standardize Token Sizes:
  - [x] Established a standardization of sizes for tokens.
  - [x] Add PHA Icon
  - [x] Introduce Arrow Component to Dropdown: Created a new arrow component for use in the Dropdown.
  - [x] Fix Drawer ContentProps: Addressed issues where styles in Drawer ContentProps conflicted with existing styles.
  - [x] Dynamic Color for ConnectAccount Illustration
  - [x] Table Improvements: Introduced two new variants for tables to provide users with diverse styling options.

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
