import type { Meta, StoryObj } from "@storybook/react";
import { HomeIcon } from "@heroicons/react/24/solid";

import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Button XS",
  },
};

export const Icon: Story = {
  args: {
    withIcon: true,
    appearance: "secondary",
    children: <HomeIcon className="w-full h-full" />,
    size: "sm",
  },
};
