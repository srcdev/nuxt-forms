import type { Meta, StoryFn } from '@nuxtjs/storybook';
// import { Suspense } from 'vue';
import InputError from '../InputError.vue';

export default {
  title: 'Components/UI/InputError',
  component: InputError,
} as Meta<typeof InputError>;

const Template: StoryFn<typeof InputError> = (args) => ({
  components: { InputError },
  setup() {
    return { args };
  },
  template: `
    <Suspense>
      <template #default>
        <InputError v-bind="args" />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  `,
});

export const SingleErrorMessage = Template.bind({});
SingleErrorMessage.args = {
  dataTestid: 'inputError',
  errorMessage: 'Hello World',
  showError: true,
  id: 'testId',
  styleClassPassthrough: ['testClass'],
  compact: false,
  isDetached: true,
};
