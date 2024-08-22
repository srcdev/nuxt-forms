<template>
  <fieldset class="multiple-radio-fieldset">
    <legend :class="[{ 'has-description': hasDescription }]">{{ legend }}</legend>
    <template v-if="hasDescription">
      <slot name="description"></slot>
    </template>
    <div class="multiple-radio-items" :class="[optionsLayout]">
      <template v-for="item in fieldData.data" :key="item.id">
        <InputRadioWithLabel
          :id="item.value"
          :name
          :required
          :c12="{
            label: item.label,
            placeholder: 'eg. Type something here',
            errorMessage: 'Please accept our terms and conditions',
          }"
          v-model="modelValue"
          :true-value="item.value"
          :theme
          :size
        />
      </template>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';
import type { IOptionsConfig, IFormMultipleOptions } from '@/types/types.forms';

import type { InpuTextC12, IFormFieldC12, IFormData } from '@/types/types.forms';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  legend: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    value: false,
  },
  c12: {
    type: Object as PropType<InpuTextC12>,
    required: true,
  },
  multipleOptions: {
    type: Boolean,
    default: false,
  },
  styleClassPassthrough: {
    type: String,
    default: '',
  },
  theme: {
    type: String as PropType<string>,
    default: 'primary',
    validator(value: string) {
      return propValidators.theme.includes(value);
    },
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
});

const slots = useSlots();
const hasDescription = computed(() => slots.description !== undefined);

const modelValue = defineModel() as Ref<IFormData>;
const fieldData = defineModel('fieldData') as Ref<IFormMultipleOptions>;

// const isArray = Array.isArray(modelValue.value.data[props.name]);
// const formFieldC12 = <IFormFieldC12>{
//   label: props.c12.label,
//   placeholder: props.c12.placeholder,
//   errorMessage: props.c12.errorMessage,
//   useCustomError: false,
//   customErrors: {},
//   isValid: false,
//   isDirty: false,
//   type: isArray ? 'array' : 'string',
//   previousValue: null,
// };
// modelValue.value.formFieldsC12[props.name] = formFieldC12;

// const fieldHasError = computed(() => {
//   return modelValue.value!.submitAttempted && !modelValue.value!.formFieldsC12[props.name].isValid;
// });
</script>

<style lang="css">
.multiple-radio-fieldset {
  margin: 0;
  padding: 0;
  border: 0;

  legend {
    font-family: var(--font-family);
    font-size: 18px;
    font-weight: 500;

    &.has-description {
      margin-bottom: 0;
    }
  }
}

.multiple-radio-items {
  display: flex;
  gap: 18px;
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
