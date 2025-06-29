<template>
  <fieldset
    :aria-required="required"
    :aria-invalid="fieldHasError"
    class="input-select-fieldset"
    :class="[inputVariant, { dirty: isDirty }, { active: isActive }, { error: fieldHasError }]"
    :data-testid
    :data-form-theme="formTheme"
    :data-size="size"
  >
    <legend :class="[{ 'has-description': hasDescriptionSlot }]">{{ legend }}</legend>

    <div v-if="hasDescriptionSlot" :id="`${name}-description`">
      <slot name="description"></slot>
    </div>

    <select v-model="modelValue" class="input-select" :class="[inputVariant]" :name>
      <option v-if="placeholder" value="" readonly :selected="!modelValue" class="input-select-option placeholder">{{ placeholder }}</option>
      <option v-for="item in fieldData.data" :key="item.id" :value="item.value" :selected="item.value === modelValue" class="input-select-option">
        <Icon :name="item.icon" class="icon" />
        {{ item.label }}
      </option>
    </select>

    <InputError :errorMessage="errorMessage" :showError="fieldHasError" :id="errorId" :isDetached="false" :inputVariant />
  </fieldset>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';
import type { IFormMultipleOptions } from '@/types/types.forms';

const props = defineProps({
  dataTestid: {
    type: String,
    default: 'input-select',
  },
  name: {
    type: String,
    required: true,
  },
  legend: {
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

const id = useId();
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
.input-select-fieldset {
  --_input-select-fieldset-underline-color: transparent;
  margin: 0;
  padding: 0;
  border: 0;

  border-bottom-right-radius: var(--form-input-border-radius);
  border-bottom-left-radius: var(--form-input-border-radius);
  border-bottom: var(--form-element-border-width-underlined) solid var(--_input-select-fieldset-underline-color);

  &.underlined {
    --_input-select-fieldset-underline-color: var(--theme-form-input-border);
  }

  /* &.error {
    border-bottom: var(--form-element-border-width-underlined) solid var(--theme-form-input-border);
  } */

  legend {
    font-family: var(--font-family);
    font-size: 1.6rem;
    font-weight: 500;

    &.has-description {
      margin-bottom: 0;
    }
  }

  .label-description {
    font-family: var(--font-family);
    font-size: 1.6rem;
    margin-top: 1.2rem;
  }

  .input-select {
    &,
    &::picker(select) {
      appearance: base-select;
    }

    &::picker(select) {
      transition: display allow-discrete 0.5s, opacity 0.5s, overlay 0.5s allow-discrete;
    }

    &:not(:open)::picker(select) {
      opacity: 0;
    }

    &:open::picker(select) {
      opacity: 1;

      @starting-style {
        opacity: 0;
      }
    }
  }

  .input-select {
    --_input-select-border: var(--form-element-border-width) solid var(--theme-form-input-border);
    --_input-select-border-radius: var(--form-input-border-radius);
    --_input-select-outline-color: var(--theme-form-input-outline);
    --_input-select-outline: var(--form-element-outline-width) solid var(--_input-select-outline-color);

    --_input-select-box-shadow: var(--_focus-box-shadow);
    --_focus-box-shadow: var(--box-shadow-off);

    --_input-select-text-color: var(--theme-form-input-text-color-normal);
    --_input-select-text-font-size: var(--step-2);
    --_input-select-line-height: 1.5;

    --_input-select-background-color: var(--theme-form-input-bg-normal);

    /* Underlined vars */
    --_input-select-border-underlined: var(--form-element-border-width-underlined) solid var(--theme-form-input-border);
    --_input-select-underlined-border-radius-top-left: 0;
    --_input-select-underlined-border-radius-top-right: 0;
    --_input-select-underlined-border-radius-bottom-left: 4px;
    --_input-select-underlined-border-radius-bottom-right: 4px;

    /* Placeholder vars */
    --_placeholder-text-color: var(--theme-form-input-text-label-color-normal);
    --_placeholder-text-margin-block: 0.8rem;
    --_placeholder-text-size: var(--step-2);
    --_placeholder-text-weight: normal;
    --_placeholder-text-line-height: 1.5;
    --_placeholder-text-background-color: var(--_input-text-with-label-background-color);

    background-color: var(--_input-select-background-color);

    border-radius: var(--_input-select-border-radius);
    border: var(--_input-select-border);
    outline: var(--_input-select-outline);

    color: var(--_input-select-text-color);
    font-size: var(--_input-select-text-font-size);
    line-height: var(--_input-select-line-height);

    padding-block-start: calc(var(--form-element-padding-block-start) - 2px);
    padding-block-end: calc(var(--form-element-padding-block-start) - 3px);

    min-width: 100%;

    &:focus-visible {
      --_input-select-box-shadow: var(--box-shadow-on);
      --_input-select-outline: var(--form-element-outline-width) solid hsl(from var(--theme-form-input-outline-focus) h s 90%);
    }

    &.underlined {
      --_input-select-text-color: var(--theme-form-input-text-label-color-underlined);
      --_input-select-background-color: color-mix(in srgb, currentColor 5%, transparent);
      /* --_input-select-background-color: var(--theme-form-input-bg-underlined); */
      --_input-select-outline-color: transparent;
      --_input-select-text-color: var(--_input-text-core-color);

      border-color: transparent;
      /* border-bottom: var(--_input-select-border-underlined);
      border-top-left-radius: var(--_input-select-underlined-border-radius-top-left);
      border-top-right-radius: var(--_input-select-underlined-border-radius-top-right);
      border-bottom-left-radius: var(--_input-select-underlined-border-radius-bottom-left);
      border-bottom-right-radius: var(--_input-select-underlined-border-radius-bottom-right);

      &.error {
        --_input-select-border-underlined: var(--form-element-border-width-underlined) solid transparent;
      } */

      &.active,
      &.dirty {
      }
    }

    &.outlined {
      &.active,
      &.dirty {
      }
    }

    &:not(.normal) {
      &.active,
      &.dirty {
      }
      &:focus-within {
      }
    }

    /*
  * Apply generic styles
  **/

    &.underlined {
    }

    &.outlined {
    }

    &:not(.normal) {
      &:focus-visible {
        /* --_input-select-box-shadow: var(--box-shadow-on);
      --_input-select-outline: var(--form-element-outline-width) solid hsl(from var(--theme-form-input-outline-focus) h s 90%); */
      }
    }

    .input-select-option {
      color: var(--_placeholder-text-color);
      margin-block: var(--_placeholder-text-margin-block);
      font-size: var(--_placeholder-text-size);
      font-weight: var(--_placeholder-text-weight);
      line-height: var(--_placeholder-text-line-height);

      &.placeholder {
        /* background-color: var(--_placeholder-text-background-color); */
      }
    }
  }
}
</style>
