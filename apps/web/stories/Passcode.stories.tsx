import type { Meta, StoryObj } from "@storybook/react";

import { Passcode } from "./Passcode";

const meta = {
  title: "Components/Passcode",
  component: Passcode,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Passcode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
