import type { Meta, StoryObj } from "@storybook/react";

import { Interactable } from "./Interactable";

const meta = {
  title: "Components/Interactable",
  component: Interactable,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Interactable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
