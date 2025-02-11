<template>
  <div class="colour-scheme-select" :data-size="size" :data-form-theme="theme">
    <p>Color Scheme select</p>

    <form class="colour-scheme-select-form mbe-20">
      <div class="select-scheme-marker-wrapper">
        <div class="select-scheme-marker"></div>
      </div>
      <div class="select-scheme-group-wrapper">
        <div class="select-scheme-group">
          <LazyIcon name="material-symbols:night-sight-auto-sharp" class="scheme-icon" />
          <input type="radio" id="auto" name="colour-scheme" class="scheme-input" v-model="colourScheme" value="auto" />
          <label for="auto" class="sr-only">Auto</label>
        </div>
        <div class="select-scheme-group">
          <LazyIcon name="radix-icons:sun" class="scheme-icon" />
          <input type="radio" id="light" name="colour-scheme" class="scheme-input" v-model="colourScheme" value="light" />
          <label for="light" class="sr-only">Light</label>
        </div>
        <div class="select-scheme-group">
          <LazyIcon name="radix-icons:moon" class="scheme-icon" />
          <input type="radio" id="dark" name="colour-scheme" class="scheme-input" v-model="colourScheme" value="dark" />
          <label for="dark" class="sr-only">Dark</label>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../../forms/c12/prop-validators';

defineProps({
  name: {
    type: String,
    defaul: 'colour-scheme-select',
  },
  size: {
    type: String as PropType<string>,
    default: 'medium',
    validator(value: string) {
      return propValidators.size.includes(value);
    },
  },
  theme: {
    type: String as PropType<string>,
    default: 'primary',
    validator(value: string) {
      return propValidators.theme.includes(value);
    },
  },
  styleClassPassthrough: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

const colourScheme = ref<'auto' | 'dark' | 'light'>('auto');

useColourScheme(colourScheme);
</script>

<style lang="css">
.colour-scheme-select {
  --_form-background-color: var(--theme-form-checkbox-bg);
  --_form-border-width: 0.1rem;
  --_form-border-colour: var(--theme-form-radio-border);
  --_form-outline-width: 0.1rem;

  --_form-outline-colour: var(--theme-form-radio-outline);

  --_form-border-radius: calc(
    (var(--_scheme-icon-font-size) / 2) + var(--_form-border-width) + var(--_form-outline-width) + var(--_form-padding) + var(--_select-scheme-group-padding) + var(--_select-scheme-group-border-width) +
      var(--_select-scheme-group-outline-width)
  );

  --_form-items-gap: 1rem;
  --_form-padding: 0.6rem;

  --_select-scheme-marker-position: 1;

  --_select-scheme-group-background-color: red;
  --_select-scheme-group-padding: 0.5rem;
  --_select-scheme-group-border-width: 0.1rem;
  --_select-scheme-group-border-colour: var(--theme-form-radio-border);
  --_select-scheme-group-outline-width: 0.1rem;
  --_select-scheme-group-outline-colour: var(--theme-form-radio-outline);
  --_select-scheme-group-width: calc(
    var(--_scheme-icon-font-size) + (var(--_select-scheme-group-padding) * 2) + (var(--_select-scheme-group-border-width) * 2) + (var(--_select-scheme-group-outline-width) * 2)
  );

  --_scheme-icon-font-size: 2rem;
  --_scheme-icon-colour: white;

  .colour-scheme-select-form {
    display: grid;
    grid-template-areas: 'select-stack';
    width: fit-content;

    background-color: var(--_form-background-color);
    border: var(--_form-border-width) solid var(--_form-border-colour);
    outline: var(--_form-outline-width) solid var(--_form-outline-colour);
    border-radius: var(--_form-border-radius);
    padding: var(--_form-padding);

    .select-scheme-marker-wrapper {
      grid-area: select-stack;
      display: grid;
      /* grid-template-columns: repeat(3, 1fr); */
      grid-template-columns: repeat(3, 1fr);
      z-index: 1;
      grid-area: select-stack;
      gap: var(--_form-items-gap);
      transition: all 200ms;
      transition-behavior: allow-discrete;

      display: none;

      .select-scheme-marker {
        grid-column: var(--_select-scheme-marker-position);
        aspect-ratio: 1;
        /* width: calc(var(--_select-scheme-group-width) + (var(--_form-outline-width) * 2)); */
        /* translate: -1px 0; */
        width: var(--_select-scheme-group-width);
        transition: all 200ms;
        transition-behavior: allow-discrete;
        background-color: purple;
      }
    }

    .select-scheme-group-wrapper {
      display: grid;
      grid-area: select-stack;
      grid-template-columns: repeat(3, 1fr);
      align-items: center;
      width: fit-content;
      z-index: 2;
      gap: var(--_form-items-gap);

      .select-scheme-group {
        aspect-ratio: 1;
        display: grid;
        grid-template-areas: 'icon-stack';
        width: var(--_select-scheme-group-width);
        place-content: center;
        background-color: var(--_select-scheme-group-background-color);
        border: var(--_select-scheme-group-border-width) solid var(--_select-scheme-group-border-colour);
        outline: var(--_select-scheme-group-outline-width) solid var(--_select-scheme-group-outline-colour);
        border-radius: 50%;
        padding: var(--_select-scheme-group-padding);

        .scheme-icon {
          grid-area: icon-stack;
          display: block;
          color: var(--_scheme-icon-colour);
          font-size: var(--_scheme-icon-font-size);
        }

        .scheme-input {
          grid-area: icon-stack;
          opacity: 0;

          &:hover {
            cursor: pointer;
          }
        }

        &:has(input[value='auto']) {
          --_select-scheme-group-background-color: green;

          &:has(input[value='auto']:checked) {
            --_select-scheme-marker-position: 1;
            --_select-scheme-group-border-colour: var(--theme-form-radio-border);
            --_select-scheme-group-outline-colour: var(--theme-form-radio-outline);
          }
        }

        &:has(input[value='light']) {
          --_select-scheme-group-background-color: orange;

          &:has(input[value='light']:checked) {
            --_select-scheme-marker-position: 2;
            --_select-scheme-group-border-colour: var(--theme-form-radio-border);
            --_select-scheme-group-outline-colour: var(--theme-form-radio-outline);
          }
        }

        &:has(input[value='dark']) {
          --_select-scheme-group-background-color: black;

          &:has(input[value='dark']:checked) {
            --_select-scheme-marker-position: 3;
            --_select-scheme-group-border-colour: var(--theme-form-radio-border);
            --_select-scheme-group-outline-colour: var(--theme-form-radio-outline);
          }
        }
      }
    }
  }
}
</style>
