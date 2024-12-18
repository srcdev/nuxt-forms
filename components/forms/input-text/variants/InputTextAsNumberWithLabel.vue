<template>
  <div class="input-text-with-label" :data-form-theme="formTheme" :class="[elementClasses, { dirty: isDirty }, { active: isActive }]">
    <label :for="id" class="input-text-label body-normal-bold">{{ label }}</label>

    <div v-if="hasDescriptionSlot" :id="`${id}-description`">
      <slot name="description"></slot>
    </div>

    <InputTextCore
      v-model="modelValue"
      v-model:isDirty="isDirty"
      v-model:isActive="isActive"
      type="text"
      :maxlength
      :id
      :name
      :placeholder
      :label
      :errorMessage
      :fieldHasError
      :required
      :styleClassPassthrough
      :theme
      inputmode="numeric"
      :ariaDescribedby
    >
      <template v-if="hasLeftSlot" #left>
        <InputButtonCore
          type="button"
          @click.stop.prevent="updateValue(-step, Number(modelValue) > min)"
          :readonly="Number(modelValue) <= min"
          :is-pending="false"
          buttonText="Step down"
          :theme
          size="x-small"
        >
          <template #iconOnly>
            <slot name="left"></slot>
          </template>
        </InputButtonCore>
      </template>
      <template v-if="hasRightSlot" #right>
        <InputButtonCore
          type="button"
          @click.stop.prevent="updateValue(step, Number(modelValue) < max)"
          :readonly="Number(modelValue) >= max"
          :is-pending="false"
          buttonText="Step up"
          :theme
          size="x-small"
        >
          <template #iconOnly>
            <slot name="right"></slot>
          </template>
        </InputButtonCore>
      </template>
    </InputTextCore>
    <InputError :errorMessage="errorMessage" :showError="fieldHasError" :id="errorId" :isDetached="true" />
  </div>
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';
const { maxlength, id, name, placeholder, label, errorMessage, fieldHasError, required, styleClassPassthrough, theme, step, min, max } = defineProps({
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
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  step: {
    type: Number,
    default: 1,
  },
});

const slots = useSlots();
const hasDescriptionSlot = computed(() => slots.description !== undefined);
const hasLeftSlot = computed(() => slots.left !== undefined);
const hasRightSlot = computed(() => slots.right !== undefined);

const formTheme = computed(() => {
  return fieldHasError ? 'error' : theme;
});

const errorId = `${id}-error-message`;
const ariaDescribedby = computed(() => {
  const ariaDescribedbyId = hasDescriptionSlot.value ? `${id}-description` : null;
  return fieldHasError ? errorId : ariaDescribedbyId;
});

const modelValue = defineModel();
const isActive = ref<boolean>(false);
const isDirty = ref<boolean>(false);

const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);
const minLength = computed(() => `${max.toString().length + 3}ch`);

const updateValue = (step: number, withinRangeLimit: boolean) => {
  if (withinRangeLimit) {
    modelValue.value = (Number(modelValue.value) + step) as number;
  }
};

onMounted(() => {
  updateElementClasses(['input-text-as-number']);
});
</script>

<style lang="css">
.input-text-as-number {
  .input-text-wrapper {
    width: fit-content;
    .input-text-core.input-text-as-number {
      flex-grow: initial;
      text-align: center;
      width: v-bind(minLength);
    }
  }
}
</style>
