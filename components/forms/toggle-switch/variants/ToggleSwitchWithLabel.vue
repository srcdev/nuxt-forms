<template>
  <div class="toggle-switch-with-label" :class="(elementClasses, size)" :data-form-theme="formTheme">
    <p class="toggle-switch-label input-text-label body-normal-bold" :for="`toggle-sitch-${id}`">{{ label }}</p>
    <div v-if="hasDescriptionSlot" :id="`${id}-description`">
      <slot name="description"></slot>
    </div>
    <ToggleSwitchCore v-model="modelValue" :id :name :required :field-has-error :theme :round :size>
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

const { id, name, label, required, fieldHasError, styleClassPassthrough, theme, round, size } = defineProps({
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
const hasDescriptionSlot = computed(() => slots.description !== undefined);
const hasIconOnSlot = computed(() => slots.iconOn !== undefined);
const hasIconOffSlot = computed(() => slots.iconOff !== undefined);

const formTheme = computed(() => {
  return fieldHasError ? 'error' : theme;
});

const modelValue = defineModel();
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);
</script>

<style lang="css">
.toggle-switch-with-label {
  --_transition-duration: 0.4s;

  .toggle-switch-label {
    display: block;
  }
}
</style>
