import type { Meta, StoryObj } from "@storybook/react";

import { FilterGroup } from "./FilterGroup";

const meta = {
  title: "Components/FilterGroup",
  component: FilterGroup,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof FilterGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
