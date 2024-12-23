<template>
  <div class="toggle-switch-core" :class="(elementClasses, size)" :data-form-theme="formTheme">
    <label class="toggle-switch-input" :class="[{ round }]" :for="inputId">
      <input type="checkbox" v-model="modelValue" :true-value :false-value :id="inputId" :aria-describedby="`${id}-description`" :name :required />
      <div class="symbol-wrapper" :class="[{ round }]">
        <div class="symbol" :class="[{ round }]">
          <div v-if="hasIconOnSlot" class="symbol-icon icon-on">
            <slot name="iconOn"></slot>
          </div>

          <div v-if="hasIconOffSlot" class="symbol-icon icon-off">
            <slot name="iconOff"></slot>
          </div>
        </div>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';

const { id, name, required, fieldHasError, trueValue, falseValue, styleClassPassthrough, theme, round, size, ariaDescribedby } = defineProps({
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
    default: 'normal',
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

const formTheme = computed(() => {
  return fieldHasError ? 'error' : theme;
});

const modelValue = defineModel();
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

const inputId = computed(() => `toggle-sitch-${id}`);
</script>

<style lang="css">
.toggle-switch-core {
  --_transition-duration: 0.4s;

  .toggle-switch-label {
    display: block;
  }

  .toggle-switch-input {
    position: relative;
    display: inline-block;

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    input:checked {
      --_icon-on-opacity: 1;
      --_icon-off-opacity: 0;
    }

    /* The symbol */
    .symbol-wrapper {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: clip;

      .symbol {
        display: grid;
        grid-template-areas: 'icon-stack';
        overflow: clip;
        position: absolute;

        .symbol-icon {
          grid-area: icon-stack;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}

/*
    * ToggleSwitch configurable
    **/
.toggle-switch-core {
  /* Sizes */
  &.x-small {
    --_symbol-size: 20px;
  }
  &.small {
    --_symbol-size: 24px;
  }
  &.normal {
    --_symbol-size: 34px;
  }
  &.medium {
    --_symbol-size: 40px;
  }
  &.large {
    --_symbol-size: 44px;
  }

  /* .toggle-switch-label {
  } */

  .toggle-switch-input {
    border: var(--theme-form-toggle-border);
    outline: var(--theme-form-toggle-outline);
    width: calc(var(--_symbol-size) * 2 - 4px);
    height: calc(var(--_symbol-size) + 4px);

    &.round {
      border-radius: calc(var(--_symbol-size) + 2px);
    }

    .symbol-wrapper {
      background-color: var(--theme-form-toggle-bg-off);
      transition: 0.4s;

      &.round {
        border-radius: var(--_symbol-size);
      }
      .symbol {
        height: calc(var(--_symbol-size) - 6px);
        width: calc(var(--_symbol-size) - 6px);
        left: 4px;
        bottom: 4px;
        background-color: var(--theme-form-toggle-symbol-off);
        transition: var(--_transition-duration);

        &.round {
          border-radius: 50%;
        }

        .symbol-icon {
          transition: var(--_transition-duration);

          &.icon-on {
            color: var(--theme-form-toggle-icon-stroke-colour-on);
            opacity: 0;
          }
          &.icon-off {
            color: var(--theme-form-toggle-icon-stroke-colour-off);
            opacity: 1;
          }
        }
      }
    }

    input:focus-visible + .symbol-wrapper {
      box-shadow: var(--theme-form-focus-box-shadow);
    }

    input:checked + .symbol-wrapper .symbol {
      background-color: var(--theme-form-toggle-symbol-on);
      transform: translateX(26px);

      .symbol-icon {
        &.icon-on {
          opacity: 1;
        }
        &.icon-off {
          opacity: 0;
        }
      }
    }
  }
}
</style>
