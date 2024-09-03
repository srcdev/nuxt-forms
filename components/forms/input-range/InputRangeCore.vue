<template>
  <div class="input-range-wrapper">
    <div v-if="hasLeftContent" class="slot left">
      <slot name="left"></slot>
    </div>

    <input
      type="range"
      :id
      :name
      :required
      :min
      :max
      :step
      :class="['input-range-core', `input-range--${theme}`, `input-range--${size}`, `input-range--${weight}`, styleClassPassthrough]"
      v-model="modelValue.data[name]"
      ref="inputField"
    />
    <div v-if="hasRightContent" class="slot right">
      <slot name="right"></slot>
    </div>
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
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  c12: {
    type: Object as PropType<InpuTextC12>,
    required: true,
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
  weight: {
    type: String as PropType<string>,
    default: 'wght-400',
    validator(value: string) {
      return propValidators.weight.includes(value);
    },
  },
});

const slots = useSlots();
const hasLeftContent = computed(() => slots.left !== undefined);
const hasRightContent = computed(() => slots.right !== undefined);

const modelValue = defineModel() as Ref<IFormData>;

const name = computed(() => {
  return props.name !== null ? props.name : props.id;
});

const inputField = ref<HTMLInputElement | null>(null);

const formFieldC12 = <IFormFieldC12>{
  label: props.c12.label,
  placeholder: props.c12.placeholder,
  errorMessage: props.c12.errorMessage,
  useCustomError: false,
  customErrors: {},
  isValid: false,
  isDirty: false,
  type: 'number',
  previousValue: null,
};
modelValue.value!.formFieldsC12[name.value] = formFieldC12;

const { initFormFieldsC12 } = useFormControl();
initFormFieldsC12(props.name, formFieldC12);

const fieldValue = computed(() => {
  return modelValue.value.data[name.value];
});

watch(fieldValue, () => {
  if (!modelValue.value!.formFieldsC12[name.value].isDirty) {
    modelValue.value!.formFieldsC12[name.value].isDirty = modelValue.value.data[name.value] !== '';
  }
  modelValue.value!.formFieldsC12[name.value].isValid = inputField.value?.validity.valid ?? false;
  modelValue.value!.validityState[name.value] = inputField.value?.validity.valid ?? false;

  if (modelValue.value!.formFieldsC12[name.value].useCustomError && modelValue.value.data[props.name] === modelValue.value.formFieldsC12[props.name].previousValue) {
    modelValue.value!.validityState[name.value] = false;
    modelValue.value!.formFieldsC12[name.value].isValid = false;
    modelValue.value.displayErrorMessages = true;
  }
});

const isValid = () => {
  setTimeout(() => {
    modelValue.value!.validityState[name.value] = inputField.value?.validity.valid ?? false;
    modelValue.value!.formFieldsC12[name.value].isValid = inputField.value?.validity.valid ?? false;
    if (!modelValue.value!.formFieldsC12[name.value].isDirty) {
      modelValue.value!.formFieldsC12[name.value].isDirty = modelValue.value.data[name.value] !== '';
    }
  }, 0);
};

onMounted(() => {
  isValid();
});
</script>

<style lang="css">
.input-range-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  .input-range-core {
    flex-grow: 1;
  }
}
</style>
