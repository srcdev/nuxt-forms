<template>
  <div>
    <div class="input-select-with-label" :class="[inputVariant, { dirty: isDirty }, { active: isActive }, { error: fieldHasError }]" :data-testid :data-form-theme="formTheme" :data-size="size">
      <InputLabel :for="id" :id :theme :name :input-variant :field-has-error :style-class-passthrough="['input-select-label']">
        <template #textLabel>{{ label }}</template>
      </InputLabel>

      <div v-if="inputVariant === 'normal' && hasDescriptionSlot" :id="`${id}-description`">
        <slot name="description"></slot>
      </div>

      <InputSelectCore
        v-model="modelValue"
        v-model:fieldData="fieldData"
        v-model:isDirty="isDirty"
        v-model:isActive="isActive"
        :id
        :name
        :placeholder
        :fieldHasError
        :required
        :styleClassPassthrough
        :theme="formTheme"
        :ariaDescribedby="ariaDescribedby"
        :size
        :inputVariant
      />

      <InputError :errorMessage="errorMessage" :showError="fieldHasError" :id="errorId" :isDetached="false" :inputVariant />
    </div>
    <div v-if="inputVariant !== 'normal' && hasDescriptionSlot" :id="`${id}-description`">
      <slot name="description"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';
import type { IFormMultipleOptions } from '@/types/types.forms';

const props = defineProps({
  dataTestid: {
    type: String,
    default: 'input-select-with-label',
  },
  name: {
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
  size: {
    type: String as PropType<string>,
    default: 'medium',
    validator(value: string) {
      return propValidators.size.includes(value);
    },
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
  inputVariant: {
    type: String as PropType<string>,
    default: 'normal',
    validator(value: string) {
      return propValidators.inputVariant.includes(value);
    },
  },
});

const slots = useSlots();
const hasDescriptionSlot = computed(() => slots.description !== undefined);
const { elementClasses } = useStyleClassPassthrough(props.styleClassPassthrough);

const formTheme = computed(() => {
  return props.fieldHasError ? 'error' : props.theme;
});

const id = `${props.name}-${useId()}`;
const errorId = `${name}-error-message`;
const ariaDescribedby = computed(() => {
  const ariaDescribedbyId = hasDescriptionSlot.value ? `${id}-description` : undefined;
  return props.fieldHasError ? errorId : ariaDescribedbyId;
});

const modelValue = defineModel({ required: true });
const isDirty = defineModel('isDirty');
const isActive = defineModel('isActive');
const fieldData = defineModel('fieldData') as Ref<IFormMultipleOptions>;
</script>

<style lang="css">
.input-select-with-label {
  .input-select-label {
  }
}
</style>
