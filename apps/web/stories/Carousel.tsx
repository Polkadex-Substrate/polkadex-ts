import { Carousel as PolkadeCarousel, Tabs, Typography } from "@polkadex/ux";
import { useState } from "react";

export const Carousel = () => {
  const [tab, setActiveTab] = useState("Current period");

  return (
    <div className="flex flex-col gap-10">
      <Tabs
        value={tab}
        onValueChange={setActiveTab}
        defaultValue="Current period"
      >
        <Tabs.List>
          <PolkadeCarousel className="w-[600px] border border-primary">
            <PolkadeCarousel.Content className="px-8 py-3">
              {fakeData.map((value, index) => {
                const active = tab === value.description;
                return (
                  <PolkadeCarousel.Item key={index} className="md:basis-1/3">
                    <Tabs.Trigger value={value.description}>
                      <div className="flex flex-col items-start px-4">
                        <Typography.Text
                          appearance={active ? "primary-base" : "primary"}
                        >
                          {value.date}
                        </Typography.Text>
                        <Typography.Text appearance="secondary" size="xs">
                          {value.date}
                        </Typography.Text>
                      </div>
                    </Tabs.Trigger>
                  </PolkadeCarousel.Item>
                );
              })}
            </PolkadeCarousel.Content>
            <PolkadeCarousel.Previous
              variant="solid"
              appearance="tertiary"
              className="h-full left-0"
            />
            <PolkadeCarousel.Next
              variant="solid"
              appearance="tertiary"
              className="h-full right-0"
            />
          </PolkadeCarousel>
        </Tabs.List>
        {fakeData.map((value, index) => (
          <Tabs.Content key={index} value={value.description}>
            {/* {value.description} */}
          </Tabs.Content>
        ))}
      </Tabs>
    </div>
  );
};

const fakeData = [
  {
    id: 1,
    date: "25 Jan - 21 Feb",
    description: "Previous period",
    epoch: "ended",
  },

  {
    id: 2,
    date: "22 Feb - 20 Mar",
    description: "Current period",
    epoch: "ended",
  },
  {
    id: 3,
    date: "21 Mar - 10 Apr",
    description: "Next period",
    epoch: "20 days 2 hours 50 mins",
    next: true,
  },
  {
    id: 4,
    date: "11 Apr - 21 Jun",
    description: "Apr period",
    epoch: "40 days 2 hours 50 mins",
  },
  {
    id: 5,
    date: "11 Apr - 21 Jun",
    description: "Jun period",
    epoch: "20 days 2 hours 50 mins",
  },
];
