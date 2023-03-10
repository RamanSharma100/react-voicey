import { ComponentStory, ComponentMeta } from "@storybook/react";

import { InitializeVoiceControls } from "./InitializeVoiceControls";
// import { DEFAULT_SCROLLING_COMMANDS } from "../../constants";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "initialization/InitializeVoiceControls",
  component: InitializeVoiceControls,
  argTypes: {},
} as ComponentMeta<typeof InitializeVoiceControls> | any;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InitializeVoiceControls> = (
  args: any
) => <InitializeVoiceControls {...args} />;

export const EnableVoiceControls: any = Template.bind({});

EnableVoiceControls.args = {
  enableNavigationControls: true,
  enableScrollingControls: true,
  commands: {
    navigation: ["go to", "navigate to"],
    scrolling: [],
  },
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
