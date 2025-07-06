<template>
  <fieldset :aria-required="required" :aria-invalid="fieldHasError" role="radiogroup" :id :name class="form-fieldset" :class="[elementClasses, { error: fieldHasError }]" :data-testid="dataTestid">
    <legend v-if="legend" class="form-fieldset-legend" :class="[{ 'has-description': hasDescription }]">
      <slot name="legend">{{ legend }}</slot>
    </legend>

    <div v-if="hasDescriptionSlot" class="form-fieldset-description" :id="`${id}-description`">
      <slot name="description"></slot>
    </div>

    <div class="form-fieldset-content">
      <slot name="content"></slot>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
// import propValidators from '../c12/prop-validators';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  legend: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  fieldHasError: {
    type: Boolean,
    default: false,
  },
  dataTestid: {
    type: String,
    default: '',
  },
  styleClassPassthrough: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

const slots = useSlots();
const hasDescriptionSlot = computed(() => slots.description !== undefined);
const hasDescription = computed(() => slots.description !== undefined);
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(props.styleClassPassthrough);
</script>

<style lang="css">
.form-fieldset {
  margin: 0;
  padding: 0;
  border: 0;

  &.single-checkbox-fieldset {
  }

  &.multiple-checkboxes-fieldset {
  }

  &.multiple-radiobuttons-fieldset {
  }

  .form-fieldset-legend {
    color: var(--form-fieldset-legend-text-color);
    margin-block: var(--form-fieldset-legend-text-margin-block);
    font-size: var(--form-fieldset-legend-text-size);
    font-weight: var(--form-fieldset-legend-text-weight);
    line-height: var(--form-fieldset-legend-text-line-height);

    &.has-description {
      margin-bottom: 0;
    }
  }

  .form-fieldset-description {
    font-size: var(--form-fieldset-description-font-size);
    margin-top: var(--form-fieldset-description-margin-top);
  }

  .form-fieldset-content {
    margin-block-start: var(--form-fieldset-content-margin-block-start);
    margin-block-end: var(--form-fieldset-content-padding-block-start);
  }
}
</style>
