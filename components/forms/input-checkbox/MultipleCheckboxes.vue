<template>
  <FormFieldset :id :name :legend :fieldHasError :required :data-testid :styleClassPassthrough="['multiple-checkboxes-fieldset']">
    <template #description>
      <slot name="description"></slot>
    </template>

    <template #content>
      <div class="multiple-checkboxes-items" :class="[optionsLayout]">
        <template v-for="item in fieldData.data" :key="item.id">
          <InputCheckboxRadioButton
            v-if="isButton"
            type="checkbox"
            :id="`${name}-${item.value}`"
            :name
            :required
            :label="item.label"
            :fieldHasError
            v-model="modelValue"
            :true-value="item.value"
            :size
            :optionsLayout
            :theme
            :direction
            :ariaDescribedby
            :displayAsDisc
          >
            <template #checkedIcon>
              <slot name="checkedIcon"></slot>
            </template>
            <template #itemIcon>
              <slot name="itemIcon">
                <Icon name="material-symbols:add-2" class="icon" />
              </slot>
            </template>
          </InputCheckboxRadioButton>
          <InputCheckboxRadioWithLabel
            v-else
            type="checkbox"
            :id="`${name}-${item.value}`"
            :name
            :required
            :label="item.label"
            :fieldHasError
            v-model="modelValue"
            :true-value="item.value"
            :size
            :optionsLayout
            :theme
            :ariaDescribedby
            :displayAsDisc
          >
            <template #checkedIcon>
              <slot name="checkedIcon"></slot>
            </template>
          </InputCheckboxRadioWithLabel>
        </template>
      </div>
      <InputError :errorMessage="errorMessage" :showError="fieldHasError" :id="errorId" :isDetached="true" />
    </template>
  </FormFieldset>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';
import type { IOptionsConfig, IFormMultipleOptions } from '@/types/types.forms';

const { dataTestid, name, legend, label, required, fieldHasError, placeholder, isButton, errorMessage, size, optionsLayout, equalCols, styleClassPassthrough, theme, direction } = defineProps({
  dataTestid: {
    type: String,
    default: 'multiple-checkboxes',
  },
  name: {
    type: String,
    required: true,
  },
  legend: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  isButton: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: [Object, String],
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  fieldHasError: {
    type: Boolean,
    default: false,
  },
  multipleOptions: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<string>,
    default: 'medium',
    validator(value: string) {
      return propValidators.size.includes(value);
    },
  },
  optionsLayout: {
    type: String as PropType<string>,
    default: 'equal-widths',
    validator(value: string) {
      return propValidators.optionsLayout.includes(value);
    },
  },
  equalCols: {
    type: Boolean,
    default: true,
  },
  styleClassPassthrough: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  theme: {
    type: String as PropType<string>,
    default: 'primary',
    validator(value: string) {
      return propValidators.theme.includes(value);
    },
  },
  direction: {
    type: String as PropType<'row' | 'row-reverse'>,
    default: 'row',
    validator(value: string) {
      return ['row', 'row-reverse'].includes(value);
    },
  },
  displayAsDisc: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots();
const hasDescriptionSlot = computed(() => slots.description !== undefined);
const hasDescription = computed(() => slots.description !== undefined);
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

const modelValue = defineModel();
const fieldData = defineModel('fieldData') as Ref<IFormMultipleOptions>;

const id = `${name}-input-${useId()}`;
const errorId = `${name}-error-message`;
const ariaDescribedby = computed(() => {
  const ariaDescribedbyId = hasDescriptionSlot.value ? `${name}-description` : undefined;
  return fieldHasError ? errorId : ariaDescribedbyId;
});
</script>

<style lang="css">
.multiple-checkboxes-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.2rem;
  margin-top: 1.2rem;

  &.inline {
    flex-direction: row;
    flex-wrap: wrap;
  }

  &.block {
    flex-direction: column;
  }

  &.equal-widths {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
}
</style>
