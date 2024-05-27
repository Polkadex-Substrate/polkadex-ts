import type { Meta, StoryObj } from "@storybook/react";

import { Searcheable } from "./Searcheable";

const meta = {
  title: "Components/Searcheable",
  component: Searcheable,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Searcheable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
