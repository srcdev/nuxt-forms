<template>
  <div class="toggle-switch-with-label-inline" :class="(elementClasses, size)" :data-form-theme="theme">
    <label class="toggle-switch-label input-text-label" :class="labelWeightClass" :for="`toggle-sitch-${id}`">{{ label }}</label>
    <ToggleSwitchCore v-model="modelValue" :id :name :true-value :false-value :theme :round :size>
      <template v-if="hasIconOnSlot" #iconOn>
        <slot name="iconOn"></slot>
      </template>

      <template v-if="hasIconOffSlot" #iconOff>
        <slot name="iconOff"></slot>
      </template>
    </ToggleSwitchCore>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';

const { id, name, label, labelWeight, trueValue, falseValue, styleClassPassthrough, theme, round, size } = defineProps({
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
  labelWeight: {
    type: String as PropType<string>,
    default: 'semi-bold',
    validator(value: string) {
      return propValidators.labelWeight.includes(value);
    },
  },
  trueValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  falseValue: {
    type: [String, Number, Boolean],
    default: false,
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
  round: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as PropType<string>,
    default: 'normal',
    validator(value: string) {
      return propValidators.size.includes(value);
    },
  },
});

const slots = useSlots();
const hasIconOnSlot = computed(() => slots.iconOn !== undefined);
const hasIconOffSlot = computed(() => slots.iconOff !== undefined);

const labelWeightClass = computed(() => {
  switch (labelWeight) {
    case 'bold':
      return 'body-normal-bold';
    case 'semi-bold':
      return 'body-normal-semibold';
    case 'normal':
      return 'body-normal';
    default:
      return 'body-normal-semibold';
  }
});

const modelValue = defineModel();
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);
</script>

<style lang="css">
.toggle-switch-with-label-inline {
  --_transition-duration: 0.4s;
  display: flex;
  align-items: center;
  gap: 12px;

  .toggle-switch-label {
    display: block;
  }
}
</style>
