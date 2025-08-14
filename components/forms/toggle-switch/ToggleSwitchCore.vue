<template>
  <div class="toggle-switch-core" :class="elementClasses" :data-size="size" :data-theme="formTheme">
    <div @click="toggleSwitchValue" class="toggle-switch-wrapper" :class="[{ round }, { 'use-default-icons': useDefaultIcons }]" :for="inputId">
      <input type="checkbox" v-model="modelValue" :true-value :false-value :aria-invalid="fieldHasError" :id="inputId" :aria-describedby="`${id}-description`" :name :required :checked="isChecked" />
      <div class="symbol-wrapper" :class="[{ round }]">
        <div class="symbol" :class="[{ round }]">
          <div class="symbol-icon icon-on">
            <slot name="iconOn">
              <Icon name="material-symbols:circle-outline" class="icon" />
            </slot>
          </div>

          <div class="symbol-icon icon-off">
            <slot name="iconOff">
              <Icon name="material-symbols:circle-outline" class="icon" />
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
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
  ariaDescribedby: {
    type: String,
    default: null,
  },
});

const slots = useSlots();
const hasIconOnSlot = computed(() => slots.iconOn !== undefined);
const hasIconOffSlot = computed(() => slots.iconOff !== undefined);
const useDefaultIcons = computed(() => !hasIconOnSlot.value && !hasIconOffSlot.value);

const formTheme = computed(() => {
  return props.fieldHasError ? 'error' : props.theme;
});

const modelValue = defineModel();
const { elementClasses } = useStyleClassPassthrough(props.styleClassPassthrough);

const inputId = computed(() => `toggle-sitch-${props.id}`);

const isChecked = computed(() => {
  return modelValue.value === props.trueValue;
});

const toggleSwitchValue = () => {
  modelValue.value = modelValue.value === props.trueValue ? props.falseValue : props.trueValue;
  console.log(`toggleSwitchValue(${modelValue.value})`);
};
</script>

<style lang="css">
.toggle-switch-core {
  .toggle-switch-label {
    display: block;
  }

  .toggle-switch-wrapper {
    --theme-form-toggle-border-color: var(--blue-12);
    --theme-form-toggle-border-width: 0.1rem;
    --theme-form-toggle-outline-color: var(--gray-2);
    --theme-form-toggle-outline-width: 0.1rem;

    --_transition-duration: 0.4s;
    --_switch-padding: 0.2rem;
    --_icon-color: inherit;
    --_icon-on-opacity: 0;
    --_icon-off-opacity: 1;
    --_icon-font-size: 2.4rem;
    --_symbol-size: 3.4rem;
    --_symbol-background-color: var(--blue-12);
    --_symbol-outline-color: transparent;
    --_symbol-outline-width: 1px;
    --_symbol-margin-inline-start: 0;
    --_symbol-checked-offset: calc(var(--_symbol-size) * 0.75);

    &.use-default-icons {
      --_icon-color: transparent;
    }

    display: flex;
    flex-direction: column;

    input {
      height: 0;
      width: 0;
      visibility: hidden;
    }

    &:has(input:checked) {
      --_icon-on-opacity: 1;
      --_icon-off-opacity: 0;
      --_symbol-margin-inline-start: var(--_symbol-checked-offset);
    }

    .symbol-wrapper {
      /* background: blue; */
      border: var(--theme-form-toggle-border-width) solid var(--theme-form-toggle-border-color);
      outline: var(--theme-form-toggle-outline-width) solid var(--theme-form-toggle-outline-color);
      border-radius: calc(var(--_symbol-size) + calc(var(--theme-form-toggle-border-width) * 2) + calc(var(--_switch-padding) * 2));
      display: inline-flex;
      align-items: center;
      justify-content: start;
      width: calc(var(--_symbol-size) + var(--_symbol-checked-offset) + calc(var(--theme-form-toggle-border-width) * 2) + calc(var(--_switch-padding) * 2));
      padding: var(--_switch-padding);

      .symbol {
        display: inline-grid;
        grid-template-areas: 'icon';
        place-content: center;

        aspect-ratio: 1/1;
        /* width: var(--_symbol-size); */
        padding: calc(calc(var(--_symbol-size) - var(--_icon-font-size)) / 2);

        outline: var(--_symbol-outline-width) solid var(--_symbol-outline-color);
        border-radius: 50%;
        margin-inline-start: var(--_symbol-margin-inline-start);

        background-color: var(--_symbol-background-color);

        overflow: clip;

        transition: margin var(--_transition-duration);

        .symbol-icon {
          display: grid;
          grid-area: icon;
          place-content: center;

          color: var(--_icon-color);
          font-size: var(--_icon-font-size);
          transition: opacity var(--_transition-duration);

          &.icon-on {
            opacity: var(--_icon-on-opacity);
          }
          &.icon-off {
            opacity: var(--_icon-off-opacity);
          }
        }
      }
    }
  }
}
</style>
