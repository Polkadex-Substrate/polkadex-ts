import { Accordion as PolkadexAccordion, Typography } from "@polkadex/ux";

export const Accordion = ({ withIcon }: { withIcon?: boolean }) => {
  return (
    <div style={{ width: 300 }}>
      <PolkadexAccordion type="multiple" className="flex flex-col gap-4">
        <PolkadexAccordion.Item value="qq">
          <PolkadexAccordion.Trigger>
            <Typography.Text bold>Is it accessible?</Typography.Text>
            {withIcon && <PolkadexAccordion.Icon />}
          </PolkadexAccordion.Trigger>
          <PolkadexAccordion.Content>
            <Typography.Text appearance="primary">
              Yes. It adheres to the WAI-ARIA design pattern.
            </Typography.Text>
          </PolkadexAccordion.Content>
        </PolkadexAccordion.Item>
        <PolkadexAccordion.Item value="ww">
          <PolkadexAccordion.Trigger>
            <Typography.Text bold>Is it unstyled?</Typography.Text>
            {withIcon && <PolkadexAccordion.Icon />}
          </PolkadexAccordion.Trigger>
          <PolkadexAccordion.Content>
            <Typography.Text appearance="primary">
              Yes. It&apos;s unstyled by default, giving you freedom over the
              look and feel.
            </Typography.Text>
          </PolkadexAccordion.Content>
        </PolkadexAccordion.Item>
        <PolkadexAccordion.Item value="ee">
          <PolkadexAccordion.Trigger>
            <Typography.Text bold>Can it be animated?</Typography.Text>
            {withIcon && <PolkadexAccordion.Icon />}
          </PolkadexAccordion.Trigger>
          <PolkadexAccordion.Content>
            <Typography.Text appearance="primary">
              Yes! You can animate the Accordion with CSS or JavaScript.
            </Typography.Text>
          </PolkadexAccordion.Content>
        </PolkadexAccordion.Item>
      </PolkadexAccordion>
    </div>
  );
};
