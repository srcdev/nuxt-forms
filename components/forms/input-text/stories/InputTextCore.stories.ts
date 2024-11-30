import type { Meta, StoryFn } from '@nuxtjs/storybook';
import InputTextCore from '../InputTextCore.vue';
import propValidators from '../../c12/prop-validators';

export default {
  title: 'Components/Forms/Input/Text/Core',
  component: InputTextCore,
  argTypes: {
    type: {
      options: propValidators.inputTypesText,
      control: { type: 'select' },
    },
    inputMode: {
      options: propValidators.inputMode,
      control: { type: 'select' },
    },
    theme: {
      options: propValidators.theme,
      control: { type: 'select' },
      default: 'primary',
    },
  },
} as Meta<typeof InputTextCore>;

const Template: StoryFn<typeof InputTextCore> = (args) => ({
  components: { InputTextCore },
  setup() {
    return { args };
  },
  template: `
    <Suspense>
      <template #default>
        <InputTextCore v-bind="args">
          <template v-if="${'left' in args}" v-slot:title>${args.left}</template>
          <template v-if="${'right' in args}" v-slot:content>${args.right}</template>
        </InputTextCore>
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  `,
  // template: '<InputTextCore v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  type: 'text',
  inputmode: 'text',
  maxlength: 255,
  id: 'testId',
  name: 'testName',
  required: true,
  placeholder: 'Input placeholder text',
  fieldHasError: false,
  styleClassPassthrough: ['testClass1', 'testClass2'],
  theme: 'primary',
  modelValue: 'This is the model value',
};
