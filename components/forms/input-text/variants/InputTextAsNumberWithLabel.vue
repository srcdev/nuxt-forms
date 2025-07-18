<template>
  <div class="input-text-with-label" :data-form-theme="formTheme" :class="[inputVariant, elementClasses, { dirty: isDirty }, { active: isActive }]">
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
      :size
      :inputVariant
    >
      <template v-if="hasLeftSlot" #left>
        <InputButtonCore
          type="button"
          @click.stop.prevent="updateValue(-step, Number(modelValue) > min)"
          :readonly="Number(modelValue) <= min"
          :is-pending="false"
          buttonText="Step down"
          theme="input-action"
          :size
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
          theme="input-action"
          :size
        >
          <template #iconOnly>
            <slot name="right"></slot>
          </template>
        </InputButtonCore>
      </template>
    </InputTextCore>
    <InputError :errorMessage :showError="fieldHasError" :id="errorId" :isDetached="true" />
  </div>
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';
const props = defineProps({
  maxlength: {
    type: Number,
    default: 255,
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
  size: {
    type: String as PropType<string>,
    default: 'default',
    validator(value: string) {
      return propValidators.size.includes(value);
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
const hasLeftSlot = computed(() => slots.left !== undefined);
const hasRightSlot = computed(() => slots.right !== undefined);

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
const isActive = ref<boolean>(false);
const isDirty = ref<boolean>(false);

const { elementClasses, updateElementClasses } = useStyleClassPassthrough(props.styleClassPassthrough);
const minLength = computed(() => `${props.max.toString().length + 1}em`);

const updateValue = (step: number, withinRangeLimit: boolean) => {
  if (withinRangeLimit) {
    modelValue.value = (Number(modelValue.value) + step) as number;
  }
};

updateElementClasses(['input-text-as-number', 'has-left-button', 'has-right-button']);
</script>

<style lang="css">
.input-text-as-number {
  .input-text-wrapper {
    width: fit-content;

    &:has(.input-text-as-number) {
      .left-slot {
        margin-inline: 0;
      }
      .right-slot {
        margin-inline: 0;
      }
    }

    .input-text-core.input-text-as-number {
      flex-grow: initial;
      text-align: center;
      width: v-bind(minLength);
    }
  }
}
</style>
