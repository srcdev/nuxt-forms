<template>
  <div class="input-textarea-with-label" :data-form-theme="formTheme" :class="[elementClasses, { dirty: isDirty }, { active: isActive }]">
    <label :for="id" class="input-textarea-label body-normal-semibold">{{ label }}</label>

    <InputTextareaCore v-model="modelValue" v-model:isDirty="isDirty" v-model:isActive="isActive" :maxlength :id :name :placeholder :label :fieldHasError :required :styleClassPassthrough :theme :size>
      <template v-if="hasLeftSlot" #left>
        <slot name="left"></slot>
      </template>
      <template v-if="hasRightSlot" #right>
        <slot name="right"></slot>
      </template>
    </InputTextareaCore>
    <InputError :errorMessage :showError="fieldHasError" :id :isDetached="false" />
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
  size: {
    type: String as PropType<string>,
    default: 'normal',
    validator(value: string) {
      return propValidators.size.includes(value);
    },
  },
});

const slots = useSlots();
const hasLeftSlot = computed(() => slots.left !== undefined);
const hasRightSlot = computed(() => slots.right !== undefined);

const id = useId();
const formTheme = computed(() => {
  return props.fieldHasError ? 'error' : props.theme;
});

const modelValue = defineModel<string | number | readonly string[] | null | undefined>();
const isActive = ref<boolean>(false);
const isDirty = ref<boolean>(false);

const { elementClasses, updateElementClasses } = useStyleClassPassthrough(props.styleClassPassthrough);

const testDirty = () => {
  const watchValue = modelValue.value ?? '';

  if (!isDirty.value && typeof watchValue === 'string' && watchValue.length > 0) {
    isDirty.value = true;
  }
};

onMounted(() => {
  testDirty();
});

watch(
  () => modelValue.value,
  () => {
    testDirty();
  }
);
</script>

<style lang="css">
.input-textarea-with-label {
  .input-textarea-label {
    display: block;
    margin-block: 0.8rem;
  }
}
</style>
