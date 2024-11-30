import type { Meta, StoryFn } from '@nuxtjs/storybook';
import InputButtonCore from '../InputButtonCore.vue';
import propValidators from '../../c12/prop-validators';

export default {
  title: 'Components/Forms/Buttons/Core',
  component: InputButtonCore,
  argTypes: {
    size: {
      options: propValidators.size,
      control: { type: 'select' },
    },
    weight: {
      options: propValidators.weight,
      control: { type: 'select' },
    },
    theme: {
      options: propValidators.theme,
      control: { type: 'select' },
      default: 'primary',
    },
    effect: {
      options: ['fancy', 'pulse'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof InputButtonCore>;

const Template: StoryFn<typeof InputButtonCore> = (args) => ({
  components: { InputButtonCore },
  setup() {
    return { args };
  },
  template: `
    <Suspense>
      <template #default>
        <InputButtonCore v-bind="args">
          <template v-if="${'left' in args}" v-slot:title>${args.left}</template>
          <template v-if="${'right' in args}" v-slot:content>${args.right}</template>
          <template v-if="${'iconOnly' in args}" v-slot:content>${args.iconOnly}</template>
        </InputButtonCore>
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  `,
  // template: '<InputButtonCore v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  size: 'medium',
  weight: 'wght-400',
  theme: 'primary',
  useEffect: false,
  effect: 'pulse',
  buttonText: 'Button text prop',
  dataTestId: 'buttonTestId',
  styleClassPassthrough: 'testClass',
  isPending: false,
  readonly: false,
  left: 'Left',
  right: 'Right',
};
