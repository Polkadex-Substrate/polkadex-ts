import type { Meta, StoryObj } from "@storybook/react";

import { Intro } from "./Intro";

const meta = {
  title: "Components/Intro",
  component: Intro,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Intro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
