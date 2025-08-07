<template>
  <div class="toggle-switch-with-label" :class="[elementClasses]" :data-theme="formTheme">
    <label class="toggle-switch-label input-text-label body-normal-bold" :for="`toggle-sitch-${id}`">{{ label }}</label>
    <div v-if="hasDescriptionSlot" :id="`${id}-description`">
      <slot name="description"></slot>
    </div>
    <ToggleSwitchCore v-model="modelValue" :id :name :required :field-has-error :true-value :false-value :theme :round :size :ariaDescribedby>
      <template v-if="hasIconOnSlot" #iconOn>
        <slot name="iconOn"></slot>
      </template>

      <template v-if="hasIconOffSlot" #iconOff>
        <slot name="iconOff"></slot>
      </template>
    </ToggleSwitchCore>
    <InputError :errorMessage :showError="fieldHasError" :id="errorId" :isDetached="true" />
  </div>
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';

const props = defineProps({
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
  errorMessage: {
    type: [Object, String],
    default: '',
    required: false,
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
    default: 'default',
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
  return props.fieldHasError ? 'error' : props.theme;
});

const id = useId();
const errorId = `${id}-error-message`;
const ariaDescribedby = computed(() => {
  const ariaDescribedbyId = hasDescriptionSlot.value ? `${id}-description` : undefined;
  return props.fieldHasError ? errorId : ariaDescribedbyId;
});

const modelValue = defineModel();
const { elementClasses } = useStyleClassPassthrough(props.styleClassPassthrough);
</script>

<style lang="css">
.toggle-switch-with-label {
  --_transition-duration: 0.4s;

  .toggle-switch-label {
    display: block;
  }
}
</style>
