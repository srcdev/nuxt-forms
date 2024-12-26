<template>
  <fieldset :aria-required="required" :aria-invalid="fieldHasError" role="radiogroup" class="multiple-radiobuttons-fieldset" :class="[elementClasses, { error: fieldHasError }]" :data-testid>
    <legend :class="[{ 'has-description': hasDescriptionSlot }]">{{ legend }}</legend>

    <div v-if="hasDescriptionSlot" :id="`${name}-description`">
      <slot name="description"></slot>
    </div>

    <div class="multiple-radiobuttons-items" :class="[optionsLayout]">
      <template v-for="item in fieldData.data" :key="item.id">
        <InputCheckboxRadioButton
          v-if="isButton"
          type="radio"
          :id="`${name}-${item.value}`"
          :name="`${name}-${item.name}`"
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
          type="radio"
          :id="`${name}-${item.value}`"
          :name="`${name}-${item.name}`"
          :required
          :label="item.label"
          :fieldHasError
          v-model="modelValue"
          :true-value="item.value"
          :size
          :optionsLayout
          :theme
          :ariaDescribedby
        >
          <template #checkedIcon>
            <slot name="checkedIcon"></slot>
          </template>
        </InputCheckboxRadioWithLabel>
      </template>
    </div>
    <InputError :errorMessage="errorMessage" :showError="fieldHasError" :id="errorId" :isDetached="true" />
  </fieldset>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';
import type { IFormMultipleOptions } from '@/types/types.forms';

const { dataTestid, id, name, legend, label, required, fieldHasError, placeholder, isButton, errorMessage, size, optionsLayout, equalCols, styleClassPassthrough, theme, direction } = defineProps({
  dataTestid: {
    type: String,
    default: 'multiple-radio-buttons',
  },
  id: {
    type: String,
    required: true,
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
});

const slots = useSlots();
const hasDescriptionSlot = computed(() => slots.description !== undefined);
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

const errorId = `${name}-error-message`;
const ariaDescribedby = computed(() => {
  const ariaDescribedbyId = hasDescriptionSlot.value ? `${id}-description` : null;
  return fieldHasError ? errorId : ariaDescribedbyId;
});

const modelValue = defineModel();
const fieldData = defineModel('fieldData') as Ref<IFormMultipleOptions>;
</script>

<style lang="css">
.multiple-radiobuttons-fieldset {
  margin: 0;
  padding: 0;
  border: 0;

  legend {
    font-family: var(--font-family);
    font-size: 1.6rem;
    font-weight: 500;

    &.has-description {
      margin-bottom: 0;
    }
  }

  .label-description {
    font-family: var(--font-family);
    font-size: 1.6rem;
    margin-top: 1.2rem;
  }
}

.multiple-radiobuttons-items {
  display: flex;
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
