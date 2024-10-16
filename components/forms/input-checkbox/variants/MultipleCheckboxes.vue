<template>
  <fieldset class="multiple-checkboxes-fieldset" :class="[{ error: c12n.fieldHasError }]">
    <legend :class="[{ 'has-description': hasDescription }]">{{ c12n.legend }}</legend>
    <template v-if="hasDescription">
      <slot name="description"></slot>
    </template>
    <InputError :errorMessaging="c12n.errorMessage" :fieldHasError="c12n.fieldHasError" :id="c12n.name" :isDetached="true" />
    <div class="multiple-checkboxes-items" :class="[optionsLayout]">
      <template v-for="item in fieldData.data" :key="item.id">
        <InputCheckboxWithLabel
          :c12n="{
            id: item.value,
            name: c12n.name,
            required: c12n.required,
            label: item.label,
            placeholder: 'eg. Type something here',
            errorMessage: 'Please accept our terms and conditions',
            fieldHasError: c12n.fieldHasError,
          }"
          v-model="modelValue"
          :true-value="item.value"
          :size
          :checkboxAppearance
          :checkboxStyle
        />
      </template>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';
import type { IOptionsConfig, IFormMultipleOptions } from '@/types/types.forms';

import type { C12nMultipleCheckboxes, IFormFieldC12, IFormData } from '@/types/types.forms';

const { c12n, size, optionsLayout, equalCols, checkboxAppearance, checkboxStyle } = defineProps({
  c12n: {
    type: Object as PropType<C12nMultipleCheckboxes>,
    required: true,
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
  checkboxAppearance: {
    type: String as PropType<string>,
    default: null,
    validator(value: string) {
      return propValidators.checkboxAppearance.includes(value);
    },
  },
  checkboxStyle: {
    type: String as PropType<string>,
    default: 'check',
    validator(value: string) {
      return propValidators.checkboxStyle.includes(value);
    },
  },
});

const slots = useSlots();
const hasDescription = computed(() => slots.description !== undefined);

const modelValue = defineModel();
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

// const errorMessaging = computed(() => {
//   if (
//     typeof modelValue.value !== 'undefined' &&
//     modelValue.value!.formFieldsC12[props.name].useCustomError &&
//     modelValue.value.data[props.name] === modelValue.value.formFieldsC12[props.name].previousValue
//   ) {
//     return modelValue.value.formFieldsC12[props.name]?.customErrors || [];
//   } else {
//     return props.c12.errorMessage;
//   }
// });
</script>

<style lang="css">
.multiple-checkboxes-fieldset {
  --_form-theme: var(--theme-form-primary);

  margin: 0;
  padding: 0;
  border: 0;

  &.error {
    --_form-theme: var(--theme-error);
  }

  legend {
    /* color: var(--_form-theme); */
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
    /* color: var(--theme-form-secondary); */
  }
}

.multiple-checkboxes-items {
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
