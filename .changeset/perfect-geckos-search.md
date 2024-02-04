---
"@polkadex/ux": major
---


- [x] fix: Display an unknown icon if the token name is empty.
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
