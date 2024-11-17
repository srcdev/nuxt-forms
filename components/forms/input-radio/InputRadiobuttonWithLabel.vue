<template>
  <div class="input-radiobutton-with-label" :class="[elementClasses, { error: fieldHasError }]">
    <InputRadiobuttonCore :id :name :required v-model="modelValue" :size :trueValue :falseValue :fieldHasError :theme>
      <template #checkedIcon>
        <slot name="checkedIcon"></slot>
      </template>
    </InputRadiobuttonCore>
    <label v-if="hasLabelContent" class="input-radiobutton-label body-normal" :for="id">
      <slot name="labelContent"></slot>
    </label>
    <label v-else class="input-radiobutton-label body-normal-semibold" :for="id">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';

const { id, name, label, required, fieldHasError, trueValue, falseValue, size, styleClassPassthrough, theme } = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
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
  trueValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  falseValue: {
    type: [String, Number, Boolean],
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
});

const slots = useSlots();
const hasLabelContent = computed(() => slots.labelContent !== undefined);
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

const modelValue = defineModel();
</script>

<style lang="css">
.input-radiobutton-with-label {
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;

  .input-radiobutton-label {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    margin-block: 8px;
    padding-inline: 8px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
