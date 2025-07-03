<template>
  <div class="input-error-message" :id :class="[inputVariant, elementClasses, { show: showError }, { detached: isDetached }, { hide: !showError }]" :data-Testid>
    <div class="inner" :class="[{ show: showError }]">
      <div class="inner-content">
        <div class="inner-icon">
          <Icon name="radix-icons:circle-backslash" class="icon" />
        </div>
        <div class="message">
          <ul v-if="isArray" class="message-list">
            <li v-for="(message, index) in errorMessage" :key="index" class="message-list-item">{{ message }}</li>
          </ul>
          <span v-else class="message-single">
            {{ errorMessage }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';

const props = defineProps({
  dataTestid: {
    type: String,
    default: 'inputError',
  },
  errorMessage: {
    type: [Array, Object, String],
    required: true,
  },
  showError: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  styleClassPassthrough: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  compact: {
    type: Boolean,
    value: false,
  },
  isDetached: {
    type: Boolean,
    required: true,
  },
  inputVariant: {
    type: String as PropType<string>,
    default: 'normal',
    validator(value: string) {
      return propValidators.inputVariant.includes(value);
    },
  },
});

const isArray = computed(() => {
  return Array.isArray(props.errorMessage);
});

const { elementClasses, updateElementClasses } = useStyleClassPassthrough(props.styleClassPassthrough);
</script>

<style lang="css">
.input-error-message {
  --_grid-template-rows: 0fr;
  --_opacity-show: 1;
  --_opacity-hide: 0;
  --_opacity: var(--_opacity-hide);

  --_border-radius: 0 0 0.4rem 0.4rem;
  --_display-show: block;
  --_display-hide: none;
  --_display: var(--_display-hide);
  --_gutter: 1.2rem;
  --_gutter-block: 0;
  --_gutter-inline: var(--_gutter);
  --_transition-duration: 500ms;
  --_transition-timing-function: linear;
  --_padding-message: 1.2rem 1rem;

  &.show {
    --_grid-template-rows: 1fr;
    --_opacity: var(--_opacity-show);
    --_display: var(--_display-show);
    --_gutter-block: var(--_gutter);
  }

  grid-row: 2;
  grid-column: 1;
  display: grid;
  grid-template-rows: var(--_grid-template-rows);

  color: var(--input-error-color);
  background-color: var(--input-error-background-color);
  /* border-radius: var(--_border-radius); */

  transition-property: grid-template-rows;
  transition-duration: var(--_transition-duration);
  transition-timing-function: var(--_transition-timing-function);
  transition-behavior: allow-discrete;

  border-top-left-radius: var(--input-error-border-top-left-radius);
  border-top-right-radius: var(--input-error-border-top-right-radius);
  border-bottom-left-radius: var(--input-error-border-bottom-left-radius);
  border-bottom-right-radius: var(--input-error-border-bottom-right-radius);

  border-top: var(--input-error-border-top-default);
  border-right: var(--input-error-border-right-default);
  border-bottom: var(--input-error-border-bottom-default);
  border-left: var(--input-error-border-left-default);

  background-clip: padding-box;

  translate: 0 calc(-1 * var(--form-element-border-width));

  margin-block-start: var(--input-error-margin-block-start);

  /* &.detached {
    border-radius: var(--form-input-border-radius);
    margin-block-start: 2rem;
  }

  &.outlined {
    --_border-radius: 0;
  }

  &.underlined {
    --_border-radius: 0;
  } */

  .inner {
    align-items: center;

    overflow: hidden;
    transition: opacity var(--_transition-duration) var(--_transition-timing-function), display var(--_transition-duration) var(--_transition-timing-function) allow-discrete;

    .inner-content {
      display: flex;
      align-items: center;

      .inner-icon {
        display: inline-block;
        padding-left: 1.2rem;

        .icon {
          color: white;
          transform: translateY(3px);
        }
      }

      .message {
        display: inline-block;
        flex-grow: 1;
        font-family: var(--font-family);
        font-size: 1.6rem;
        font-weight: 500;
        padding-block: var(--_padding-message);
        padding-inline: var(--_gutter-inline);

        .message-single {
          color: white;
        }

        .message-list {
          list-style-type: none;
          padding-inline-start: 0;
          margin-block-start: 0;
          margin-block-end: 0;

          .message-list-item {
            color: white;
          }

          .message-list-item + .message-list-item {
            margin-block-start: 0.6rem;
          }
        }
      }
    }
  }
}
</style>
