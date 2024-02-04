import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {};

export const Outline: Story = {
  args: {
    type: "Outline",
  },
};
