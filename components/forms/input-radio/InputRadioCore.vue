<template>
  <div class="input-radio-wrapper" :class="[`theme-${theme}`, size, { 'with-decorator': radioStyle === 'styled' }, { error: fieldHasError }]">
    <input
      type="radio"
      :true-value="trueValue"
      :false-value="falseValue"
      :id
      :name
      :required="props.required && !props.multipleOptions"
      :value="trueValue"
      :class="['input-radio-core', { 'with-decorator': radioStyle === 'styled' }]"
      v-model="modelValue.data[name]"
      ref="inputField"
    />
    <div v-if="radioStyle === 'styled'" class="input-radio-decorator"></div>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';
import type { InpuTextC12, IFormFieldC12, IFormData } from '@/types/types.forms';

const props = defineProps({
  id: {
    // type: String as PropType<string>,
    type: String,
    required: true,
  },
  name: {
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
  trueValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  falseValue: {
    type: [String, Number, Boolean],
    default: false,
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
  radioStyle: {
    type: String as PropType<string>,
    default: 'styled',
    validator(value: string) {
      return propValidators.radioStyle.includes(value);
    },
  },
});

const modelValue = defineModel() as Ref<IFormData>;

const name = computed(() => {
  return props.name !== null ? props.name : props.id;
});

const inputField = ref<HTMLInputElement | null>(null);

const isArray = Array.isArray(modelValue.value.data[name.value]);

const fieldHasError = computed(() => {
  return modelValue.value!.submitAttempted && !modelValue.value!.formFieldsC12[name.value].isValid;
});

if (modelValue.value.formFieldsC12[name.value] === undefined) {
  const formFieldC12 = <IFormFieldC12>{
    label: props.c12.label,
    placeholder: props.c12.placeholder,
    errorMessage: props.c12.errorMessage,
    useCustomError: false,
    customErrors: {},
    isValid: false,
    isDirty: false,
    type: isArray ? 'array' : 'string',
    previousValue: null,
  };
  modelValue.value.formFieldsC12[name.value] = formFieldC12;
}

const fieldValue = computed(() => {
  return modelValue.value.data[name.value];
});

watch(fieldValue, () => {
  if (isArray) {
    modelValue.value.validityState[name.value] = Object.values(modelValue.value.data[name.value] ?? []).length > 0;
    modelValue.value!.formFieldsC12[name.value].isValid = modelValue.value.validityState[name.value];
  } else {
    if (!modelValue.value!.formFieldsC12[name.value].isDirty) {
      modelValue.value!.formFieldsC12[name.value].isDirty = modelValue.value.data[name.value] !== '';
    }
    modelValue.value!.formFieldsC12[name.value].isValid = inputField.value?.validity.valid ?? false;
    modelValue.value!.validityState[name.value] = inputField.value?.validity.valid ?? false;
  }
});
</script>

<style scoped lang="css">
.input-radio-wrapper {
  --_radio-size: initial;
  --_radio-border-radius: 50%;
  --_form-theme: var(--theme-form-primary);
  --_outline-width: var(--input-outline-width-thin);
  --_border-width: var(--input-border-width-default);
  --_focus-colour: var(--theme-form-primary-focus);
  --_background-colour: var(--theme-form-primary-radio-color-bg);
  --_decorator-size: calc(var(--_radio-size) - (var(--_border-width) * 2));
  --_checked-color: var(--_background-colour);
  --_box-shadow: 0 0 2px 3px transparent;

  display: grid;
  grid-template-areas: 'radio-stack';

  &.theme-secondary {
    --_form-theme: var(--theme-form-secondary);
    --_focus-colour: var(--theme-form-secondary-focus);
    --_background-colour: var(--theme-form-secondary-radio-color-bg);
  }

  &.error {
    --_form-theme: var(--theme-error);
  }

  /* Sizes */
  &.x-small {
    --_radio-size: 20px;
  }
  &.small {
    --_radio-size: 24px;
  }
  &.normal {
    --_radio-size: 30px;
  }
  &.medium {
    --_radio-size: 40px;
  }
  &.large {
    --_radio-size: 44px;
  }

  &:has(.input-radio-core.with-decorator:focus-visible) {
    --_box-shadow: 0 0 2px 3px var(--_focus-colour);
    --_focus-colour: var(--_focus-colour);

    &.theme-primary {
      --_focus-colour: var(--theme-form-primary-focus);
    }

    &.theme-secondary {
      --_focus-colour: var(--theme-form-secondary-focus);
    }
  }

  &:has(.input-radio-core.with-decorator:checked) {
    --_checked-color: hsl(from var(--_form-theme) h s 50%);
  }

  &.with-decorator {
    border-radius: var(--_radio-border-radius);
    border: var(--_border-width) solid var(--_form-theme);
    height: var(--_radio-size);
    width: var(--_radio-size);

    .input-radio-decorator {
      grid-area: radio-stack;
      height: var(--_decorator-size);
      width: var(--_decorator-size);
      border: var(--_border-width) solid var(--_background-colour);
      border-radius: var(--_radio-border-radius);
      background-color: var(--_checked-color);
      box-shadow: var(--_box-shadow);
      outline-color: var(--_focus-colour);
    }

    .input-radio-core {
      grid-area: radio-stack;
      &.with-decorator {
        opacity: 0;
        appearance: none;
        overflow: hidden;
        height: initial;
        width: initial;
      }
    }
  }
}
</style>
