import { ComponentStory, ComponentMeta } from "@storybook/react";

import { InitializeVoiceControls } from "./InitializeVoiceControls";

export default {
  title: "initialization/InitializeVoiceControls",
  component: InitializeVoiceControls,
  argTypes: {},
} as ComponentMeta<typeof InitializeVoiceControls> | any;

const Template: ComponentStory<typeof InitializeVoiceControls> = (
  args: any
) => <InitializeVoiceControls {...args} />;

export const EnableVoiceControls: any = Template.bind({});

EnableVoiceControls.args = {
  enableNavigationControls: true,
  enableScrollingControls: true,
};

EnableVoiceControls.argTypes = {
  enableNavigationControls: {
    control: {
      type: "boolean",
    },
  },
  enableScrollingControls: {
    control: {
      type: "boolean",
    },
  },
  commands: {
    control: {
      type: "object",
    },
  },
};
