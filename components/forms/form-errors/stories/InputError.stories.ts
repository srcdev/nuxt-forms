import StoryBookComponent from '../InputError.vue';
import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/UI/InputError',
  component: StoryBookComponent,
} as Meta<typeof StoryBookComponent>;

const Template: StoryFn<typeof StoryBookComponent> = (args: any) => ({
  components: { StoryBookComponent },
  setup() {
    return { args };
  },
  template: `<StoryBookComponent v-bind="args"></StoryBookComponent>`,
});

export const SingleErrorMessage = Template.bind({});
SingleErrorMessage.args = {
  dataTestid: 'inputError',
  errorMessage: 'Hello World',
  fieldHasError: true,
  id: 'testId',
  styleClassPassthrough: ['testClass'],
  compact: false,
  isDetached: true,
};
