import type { Meta, StoryObj } from "@storybook/react";

import { Carousel } from "./Carousel";

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
