import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown as PolkadexDropdown } from "@polkadex/ux";
import { Fragment } from "react";

import { Dropdown } from "./Dropdown";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Item: Story = {
  args: {
    children: (
      <Fragment>
        <PolkadexDropdown.Label>Label</PolkadexDropdown.Label>
        <PolkadexDropdown.Item>Item</PolkadexDropdown.Item>
        <PolkadexDropdown.Item shortcut="⇧⌘P">
          Item with shortcut
        </PolkadexDropdown.Item>
      </Fragment>
    ),
  },
};

export const Checkbox: Story = {
  args: {
    children: (
      <Fragment>
        <PolkadexDropdown.Label>Item Checkbox</PolkadexDropdown.Label>
        <PolkadexDropdown.ItemCheckbox>
          Item Checkbox
        </PolkadexDropdown.ItemCheckbox>
        <PolkadexDropdown.ItemCheckbox checked>
          Item Checkbox checked
        </PolkadexDropdown.ItemCheckbox>
      </Fragment>
    ),
  },
};

export const Radio: Story = {
  args: {
    children: (
      <Fragment>
        <PolkadexDropdown.Label>Item Radio</PolkadexDropdown.Label>
        <PolkadexDropdown.Radio value="aa">
          <PolkadexDropdown.ItemRadio value="aa" defaultChecked>
            Item Radio
          </PolkadexDropdown.ItemRadio>
          <PolkadexDropdown.ItemRadio value="ee">
            Item Radio
          </PolkadexDropdown.ItemRadio>
        </PolkadexDropdown.Radio>
      </Fragment>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    withIcon: true,
    asChild: false,
    children: (
      <Fragment>
        <PolkadexDropdown.Label>Item Radio</PolkadexDropdown.Label>
        <PolkadexDropdown.Radio value="aa">
          <PolkadexDropdown.ItemRadio value="aa" defaultChecked>
            Item Radio
          </PolkadexDropdown.ItemRadio>
          <PolkadexDropdown.ItemRadio value="ee">
            Item Radio
          </PolkadexDropdown.ItemRadio>
        </PolkadexDropdown.Radio>
      </Fragment>
    ),
  },
};

export const WithOverlay: Story = {
  args: {
    withOverlay: true,
    children: (
      <Fragment>
        <PolkadexDropdown.Radio value="aa">
          <PolkadexDropdown.ItemRadio value="aa" defaultChecked>
            Example
          </PolkadexDropdown.ItemRadio>
          <PolkadexDropdown.ItemRadio value="ee">
            Example content
          </PolkadexDropdown.ItemRadio>
        </PolkadexDropdown.Radio>
      </Fragment>
    ),
  },
};

export const WithSuperposition: Story = {
  args: {
    withOverlay: true,
    withSuperpositionTrigger: true,
    children: (
      <Fragment>
        <PolkadexDropdown.Radio value="aa">
          <PolkadexDropdown.ItemRadio value="aa" defaultChecked>
            Example
          </PolkadexDropdown.ItemRadio>
          <PolkadexDropdown.ItemRadio value="ee">
            Example content
          </PolkadexDropdown.ItemRadio>
        </PolkadexDropdown.Radio>
      </Fragment>
    ),
  },
};
