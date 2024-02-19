import type { Meta, StoryObj } from "@storybook/react";

import { ScrollArea } from "./ScrollArea";

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
