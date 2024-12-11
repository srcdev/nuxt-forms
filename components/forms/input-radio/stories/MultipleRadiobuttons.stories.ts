import type { Meta, StoryFn } from '@nuxtjs/storybook';
import MultipleRadiobuttons from '../MultipleRadiobuttons.vue';
import propValidators from '../../c12/prop-validators';
import modelData from './data/tags.json';

export default {
  title: 'Components/Forms/MultipleRadiobuttons',
  component: MultipleRadiobuttons,
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
    optionsLayout: {
      options: ['inline', 'equal-widths'],
      control: { type: 'select' },
    },
    direction: {
      options: ['row', 'row-reverse'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof MultipleRadiobuttons>;

const Template: StoryFn<typeof MultipleRadiobuttons> = (args) => ({
  components: { MultipleRadiobuttons },
  setup() {
    return { args };
  },
  template: `
    <Suspense>
      <template #default>
        <MultipleRadiobuttons v-bind="args">
          <template v-if="${'description' in args}" v-slot:description>${args.description}</template>
        </MultipleRadiobuttons>
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  `,
  // template: '<MultipleRadiobuttons v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  id: 'tagsRadio',
  name: 'tagsRadio',
  legend: 'Choose tags (as radiobuttons)',
  required: true,
  label: 'Check between 3 and 8 tags',
  placeholder: 'eg. Type something here',
  isButton: true,
  errorMessage: 'Please select between 3 and 8 tags',
  fieldHasError: false,
  modelValue: [],
  fieldData: modelData,
  size: 'x-small',
  optionsLayout: 'inline',
  theme: 'primary',
  direction: 'row',
};
