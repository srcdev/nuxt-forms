import type { Meta, StoryFn } from '@nuxtjs/storybook';
import InputPasswordWithLabel from '../InputPasswordWithLabel.vue';
import propValidators from '../../../c12/prop-validators';

export default {
  title: 'Components/Forms/Input/Text/InputPasswordWithLabel',
  component: InputPasswordWithLabel,
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
} as Meta<typeof InputPasswordWithLabel>;

const Template: StoryFn<typeof InputPasswordWithLabel> = (args) => ({
  components: { InputPasswordWithLabel },
  setup() {
    return { args };
  },
  template: `
    <Suspense>
      <template #default>
        <InputPasswordWithLabel v-bind="args">
          <template v-if="${'iconOnly' in args}" v-slot:iconOnly>${args.iconOnly}</template>
        </InputPasswordWithLabel>
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  `,
  // template: '<InputPasswordWithLabel v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  type: 'password',
  maxlength: 255,
  id: 'testId',
  name: 'testName',
  placeholder: 'Input placeholder text',
  label: 'Input label text',
  errorMessage: 'This is an error message',
  fieldHasError: false,
  required: true,
  styleClassPassthrough: ['testClass1', 'testClass2'],
  theme: 'primary',
  modelValue: 'This is the model value',
  iconOnly: `<Icon name="radix-icons:eye-none" class="icon" />`,
};
