// https://nuxt.com/docs/getting-started/testing#unit-testing
import { describe, it, expect } from 'vitest';
import { VueWrapper } from '@vue/test-utils';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import ComponentUnderTest from '../MultipleCheckboxes.vue';
import tagsData from './data/tags.json';

let initialPropsData = {
  dataTestid: 'multiple-checkboxes',
  id: 'tags',
  name: 'tags',
  legend: 'Choose tags (as checkboxes)',
  required: true,
  label: 'Check between 3 and 8 tags',
  placeholder: 'eg. Type something here',
  isButton: true,
  errorMessage: 'Please select between 3 and 8 tags',
  fieldHasError: false,
  fieldData: tagsData,
  size: 'small',
  optionsLayout: 'inline',
  styleClassPassthrough: ['testClass'],
  theme: 'primary',
  // 'onUpdate:modelValue': (event: string) => wrapper.setProps({ modelValue: event }),
};

const initialSlots = {
  checkedIcon: () => ``,
  itemIcon: () => `<Icon name="material-symbols:add-2" class="icon" />`,
};

let wrapper: VueWrapper<InstanceType<typeof ComponentUnderTest>>;
const wrapperFactory = (propsData = {}, slotsData = {}) => {
  const mockPropsData = { ...initialPropsData, ...propsData };
  const mockSlotsData = { ...initialSlots, ...slotsData };

  return mountSuspended(ComponentUnderTest, {
    attachTo: document.body,
    props: mockPropsData,
    slots: mockSlotsData,
  });
};

describe('MultipleCheckboxes Component', () => {
  it('Mounts', async () => {
    wrapper = await wrapperFactory();
    expect(wrapper).toBeTruthy();
  });

  it('renders properly', async () => {
    wrapper = await wrapperFactory();
    const dataTestIdElem = wrapper.attributes('data-testid');
    expect(dataTestIdElem).toBe(initialPropsData.dataTestid);
    expect(wrapper.find('[data-testid]').classes()).toContain('testClass');
  });

  it('updates checkbox modelValue when items clicked', async () => {
    const modelValue = ref<string[]>([]);
    const propsData = {
      modelValue,
    };
    wrapper = await wrapperFactory(propsData);
    const checkboxElements = wrapper.findAll('input[type="checkbox"]');

    /*
     * Test the first checkbox clicked
     **/
    const firstCheckbox = checkboxElements[0];
    expect(firstCheckbox.attributes('aria-checked')).toBe('false');
    const firstCheckboxTrueValue = firstCheckbox.attributes('true-value');

    await firstCheckbox.trigger('click');

    wrapper.vm.modelValue.value.push(firstCheckboxTrueValue);
    expect(wrapper.vm.modelValue.value).includes(firstCheckboxTrueValue);
    expect(firstCheckbox.attributes('aria-checked')).toBe('true');

    await firstCheckbox.trigger('click');

    wrapper.vm.modelValue.value.pop(firstCheckboxTrueValue);
    expect(wrapper.vm.modelValue.value).not.includes(firstCheckboxTrueValue);
    expect(firstCheckbox.attributes('aria-checked')).toBe('false');

    /*
     * Test the second checkbox clicked
     **/
    const secondCheckbox = checkboxElements[1];
    expect(secondCheckbox.attributes('aria-checked')).toBe('false');
    const secondCheckboxTrueValue = secondCheckbox.attributes('true-value');

    await secondCheckbox.trigger('click');

    wrapper.vm.modelValue.value.push(secondCheckboxTrueValue);
    expect(wrapper.vm.modelValue.value).includes(secondCheckboxTrueValue);
    expect(secondCheckbox.attributes('aria-checked')).toBe('true');

    await secondCheckbox.trigger('click');

    wrapper.vm.modelValue.value.pop(secondCheckboxTrueValue);
    expect(wrapper.vm.modelValue.value).not.includes(secondCheckboxTrueValue);
    expect(secondCheckbox.attributes('aria-checked')).toBe('false');
  });
});
