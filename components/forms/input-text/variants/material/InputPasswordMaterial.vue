<template>
  <InputTextMaterialCore
    :type
    :id
    :name
    :validation
    :required
    :isPending
    :c12
    :styleClassPassthrough
    :theme
    v-model="modelValue"
    v-model:isFocused="isFocused"
    v-model:isDirty="isDirty"
  >
    <template #input>
      <InputTextCore
        :id
        :name
        :type
        :validation
        :required
        v-model="modelValue"
        v-model:isFocused="isFocused"
        v-model:isDirty="isDirty"
        :c12
        :style-class-passthrough="styleClassPassthrough"
      >
        <template #right>
          <InputButtonCore
            @click.stop.prevent="toggleDisplayPassword"
            :is-pending="false"
            button-text="Submit"
            theme="ghost"
            size="x-small"
          >
            <template #iconOnly>
              <Icon
                v-if="displayPassword"
                name="radix-icons:eye-none"
                class="icon"
              />
              <Icon v-else name="radix-icons:eye-open" class="icon" />
            </template>
          </InputButtonCore>
        </template>
      </InputTextCore>
    </template>
  </InputTextMaterialCore>
</template>

<script setup lang="ts">
import type { InpuTextC12, IFormData } from '@/types/types.forms';

import propValidators from '../../../c12/prop-validators';

const props = defineProps({
  size: {
    type: String as PropType<string>,
    default: 'normal',
    validator(value: string) {
      return propValidators.size.includes(value);
    },
  },
  weight: {
    type: String as PropType<string>,
    default: 'wght-400',
    validator(value: string) {
      return propValidators.weight.includes(value);
    },
  },
  theme: {
    type: String as PropType<string>,
    default: 'primary',
    validator(value: string) {
      return propValidators.theme.includes(value);
    },
  },
  id: {
    // type: String as PropType<string>,
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: null,
  },
  validation: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    value: false,
  },
  isPending: {
    type: Boolean,
    value: false,
  },
  c12: {
    type: Object as PropType<InpuTextC12>,
    required: true,
  },
  styleClassPassthrough: {
    type: String,
    default: '',
  },
});

const name = computed(() => {
  return props.name !== null ? props.name : props.id;
});

const modelValue = defineModel() as Ref<IFormData>;
const isFocused = ref(false);
const isDirty = ref(false);

const displayPassword = ref(false);

const type = computed(() => {
  // return displayPassword.value && !modelValue.value.isPending ? "text" : "password";
  return displayPassword.value ? 'text' : 'password';
});

const toggleDisplayPassword = () => {
  displayPassword.value = !displayPassword.value;
};
</script>
