<template>
  <InputTextWithLabel v-model="modelValue" :data-form-theme="formTheme" :type="inputType" :maxlength :id :name :placeholder :label :errorMessage :fieldHasError :required :styleClassPassthrough :theme>
    <template #right>
      <InputButtonCore
        type="button"
        @click.stop.prevent="toggleDisplayPassword"
        :is-pending="false"
        :buttonText
        theme="input-action"
        :size
        @focusin="updateFocus(name, true)"
        @focusout="updateFocus(name, false)"
      >
        <template #iconOnly>
          <Icon v-if="displayPassword" name="radix-icons:eye-none" class="icon" />
          <Icon v-else name="radix-icons:eye-open" class="icon" />
        </template>
      </InputButtonCore>
    </template>
  </InputTextWithLabel>
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';

const { type, maxlength, id, name, placeholder, label, errorMessage, fieldHasError, required, styleClassPassthrough, theme, size } = defineProps({
  type: {
    type: String,
    default: 'password',
  },
  maxlength: {
    type: Number,
    default: 255,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: [Object, String],
    required: true,
  },
  fieldHasError: {
    type: Boolean,
    default: false,
  },
  required: {
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
  size: {
    type: String as PropType<string>,
    default: 'medium',
    validator(value: string) {
      return propValidators.size.includes(value);
    },
  },
});

const formTheme = computed(() => {
  return fieldHasError ? 'error' : theme;
});

const modelValue = defineModel();

const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

const updateFocus = (name: string, isFocused: boolean) => {
  // console.log('updateFocus', name, isFocused);
  // modelValue.value.focusedField = isFocused ? name : '';
};

const inputType = ref(type);

const displayPassword = ref(false);
const buttonText = computed(() => {
  inputType.value = displayPassword.value ? 'text' : 'password';
  return displayPassword.value ? 'Hide password' : 'Show password';
});
const toggleDisplayPassword = () => {
  displayPassword.value = !displayPassword.value;
};

updateElementClasses(['has-right-button']);
</script>

<style lang="css">
/* .input-text-with-label {
  &.has-left-button,
  &.has-right-button {
    .input-text-wrapper {
      .slot {
        .input-button-core {
          border: initial;
          border-radius: 0;
          outline: initial;
          box-shadow: unset;
        }
      }

      .left-slot {
        margin-inline-end: 0;
        border-right: 2px solid var(--theme-btn-bg-hover);
      }

      .right-slot {
        margin-inline-end: 0;
        border-left: 2px solid var(--theme-btn-bg-hover);
      }
    }
  }
} */
</style>
