<template>
  <div class="input-error-message" :class="[{ show: fieldHasError }, { detached: isDetached }, { hide: !fieldHasError }]">
    <div class="inner" :class="[{ show: fieldHasError }]">
      <div class="inner-content">
        <div class="inner-icon">
          <Icon name="radix-icons:circle-backslash" class="icon" />
        </div>
        <div class="message" :id="`${id}-error-message`">
          <ul v-if="isArray" class="message-list">
            <li v-for="(message, index) in errorMessaging" :key="index" class="message-list-item">{{ message }}</li>
          </ul>
          <span v-else class="message-single">
            {{ errorMessaging }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  errorMessaging: {
    type: [Object, String],
    required: true,
  },
  fieldHasError: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  styleClassPassthrough: {
    type: String,
    default: '',
  },
  compact: {
    type: Boolean,
    value: false,
  },
  isDetached: {
    type: Boolean,
    required: true,
  },
});

const isArray = computed(() => {
  return Array.isArray(props.errorMessaging);
});
</script>

<style lang="css" scoped>
.input-error-message {
  --_grid-template-rows: 0fr;
  --_opacity-show: 1;
  --_opacity-hide: 0;
  --_opacity: var(--_opacity-hide);

  --_display-show: block;
  --_display-hide: none;
  --_display: var(--_display-hide);
  --_gutter: 12px;
  --_gutter-block: 0;
  --_gutter-inline: var(--_gutter);
  --_transition-duration: 500ms;
  --_transition-timing-function: linear;
  --_message-translate-y-hide: calc(var(--_gutter) * -2);
  --_message-translate-y-show: 0;
  --_message-translate-y: var(--_message-translate-y-hide);
  --_padding-message-show: var(--_gutter);
  --_padding-message-hide: 0;
  --_padding-message: var(--_padding-message-hide);

  grid-row: 2;
  grid-column: 1;
  display: grid;
  grid-template-rows: var(--_grid-template-rows);

  color: hsl(from var(--theme-error) h s 95%);
  background-color: var(--theme-error);
  border-radius: 0 0 4px 4px;

  transition-property: grid-template-rows;
  transition-duration: var(--_transition-duration);
  transition-timing-function: var(--_transition-timing-function);
  transition-behavior: allow-discrete;

  &.detached {
    border-radius: var(--input-border-radius);
  }

  &.show {
    --_grid-template-rows: 1fr;
    --_opacity: var(--_opacity-show);
    --_display: var(--_display-show);
    --_message-translate-y: var(--_message-translate-y-show);
    --_gutter-block: var(--_gutter);
    --_padding-message: var(--_padding-message-show);
  }

  .inner {
    align-items: center;

    overflow: hidden;
    transition: opacity var(--_transition-duration) var(--_transition-timing-function), display var(--_transition-duration) var(--_transition-timing-function) allow-discrete;

    &.show {
      display: var(--_display-show);
      opacity: var(--_opacity-show);
    }

    .inner-content {
      display: flex;
      align-items: center;

      .inner-icon {
        display: inline-block;
        padding-left: 12px;

        .icon {
          color: white;
          transform: translateY(3px);
        }
      }

      .message {
        display: inline-block;
        flex-grow: 1;
        font-family: var(--font-family);
        font-size: 16px;
        font-weight: 500;
        padding-block: var(--_padding-message);
        padding-inline: var(--_gutter-inline);
        transform: translateY(var(--_message-translate-y));

        transition-property: transform, padding;
        transition-duration: var(--_transition-duration);
        transition-timing-function: linear;

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
            margin-block-start: 6px;
          }
        }
      }
    }
  }
}
</style>
