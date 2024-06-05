import type { Meta, StoryObj } from "@storybook/react";

import { Resizable } from "./Resizable";

const meta = {
  title: "Components/Resizable",
  component: Resizable,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Resizable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
