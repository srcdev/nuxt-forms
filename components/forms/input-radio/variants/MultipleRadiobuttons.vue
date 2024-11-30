<template>
  <fieldset class="multiple-radiobuttons-fieldset" :class="[{ error: fieldHasError }]">
    <legend :class="[{ 'has-description': hasDescription }]">{{ legend }}</legend>
    <template v-if="hasDescription">
      <slot name="description"></slot>
    </template>
    <div class="multiple-radiobuttons-items" :class="[optionsLayout]">
      <template v-for="item in fieldData.data" :key="item.id">
        <InputRadiobuttonWithLabel :id="`${name}-${item.value}`" :name="`${name}-${item.name}`" :required :label="item.label" :fieldHasError v-model="modelValue" :true-value="item.value" :size :theme>
          <template #checkedIcon>
            <slot name="checkedIcon"></slot>
          </template>
        </InputRadiobuttonWithLabel>
      </template>
    </div>
    <InputError :errorMessage="errorMessage" :showError="fieldHasError" :id="name" :isDetached="true" />
  </fieldset>
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';
import type { IFormMultipleOptions } from '@/types/types.forms';

const { id, name, legend, label, required, fieldHasError, placeholder, errorMessage, size, optionsLayout, equalCols, styleClassPassthrough, theme } = defineProps({
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
});

const slots = useSlots();
const hasDescription = computed(() => slots.description !== undefined);
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

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
    font-size: 16px;
    font-weight: 500;

    &.has-description {
      margin-bottom: 0;
    }
  }

  .label-description {
    font-family: var(--font-family);
    font-size: 16px;
    margin-top: 12px;
  }
}

.multiple-radiobuttons-items {
  display: flex;
  gap: 12px;
  margin-top: 12px;

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
