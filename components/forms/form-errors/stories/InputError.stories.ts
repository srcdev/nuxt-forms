import type { Meta, StoryFn } from '@nuxtjs/storybook';
import InputError from '../InputError.vue';

export default {
  title: 'Components/UI/InputError',
  component: InputError,
  // args: {
  //   dataTestid: 'inputError',
  //   errorMessage: 'Hello World',
  //   fieldHasError: true,
  //   id: 'testId',
  //   styleClassPassthrough: ['testClass'],
  //   compact: false,
  //   isDetached: false,
  // },
} as Meta<typeof InputError>;

const Template: StoryFn<typeof InputError> = (args) => ({
  components: { InputError },
  setup() {
    return { args };
  },
  template: `<InputError v-bind="args"></InputError>`,
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
