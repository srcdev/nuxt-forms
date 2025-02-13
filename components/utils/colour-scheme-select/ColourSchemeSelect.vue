<template>
  <div class="colour-scheme-select" :data-size="size" :data-form-theme="theme">
    <p>Color Scheme select</p>

    <form class="colour-scheme-select-form mbe-20" ref="colourSchemeWrapper">
      <div class="select-scheme-marker-wrapper">
        <div class="select-scheme-marker" :class="[{ show: showMarker }]"></div>
      </div>
      <div class="select-scheme-group-wrapper">
        <div class="select-scheme-group">
          <LazyIcon name="material-symbols:night-sight-auto-sharp" class="scheme-icon" />
          <input type="radio" id="auto" name="colour-scheme" class="scheme-input" v-model="currentColourScheme" value="auto" />
          <label for="auto" class="sr-only">Auto</label>
        </div>
        <div class="select-scheme-group">
          <LazyIcon name="radix-icons:sun" class="scheme-icon" />
          <input type="radio" id="light" name="colour-scheme" class="scheme-input" v-model="currentColourScheme" value="light" />
          <label for="light" class="sr-only">Light</label>
        </div>
        <div class="select-scheme-group">
          <LazyIcon name="radix-icons:moon" class="scheme-icon" />
          <input type="radio" id="dark" name="colour-scheme" class="scheme-input" v-model="currentColourScheme" value="dark" />
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

const { currentColourScheme } = useColourScheme();

const colourSchemeWrapper = ref<HTMLFormElement | null>(null);
const colourSchemeInputElements = ref<HTMLDivElement[]>([]);
const showMarker = ref(false);

// console.log('colourSchemeInputElements');
// console.log(colourSchemeInputElements);

const findIndexOfInputValueFromCurrentColourScheme = () => {
  if (currentColourScheme.value === 'auto') return 1;
  if (currentColourScheme.value === 'light') return 2;
  if (currentColourScheme.value === 'dark') return 3;
  return undefined;
};

// const findLeftOffsetOfInputValueFromCurrentColourScheme = (index: number) => {
//   const normalisedIndex = index - 1;

//   console.log(`findLeftOffsetOfInputValueFromCurrentColourScheme: ${normalisedIndex}`);
//   console.log(colourSchemeInputElements.value[normalisedIndex].offsetLeft);

//   return colourSchemeInputElements.value?.[normalisedIndex]?.getBoundingClientRect().left;
// };

const setColourSchemeAttr = () => {
  const index = findIndexOfInputValueFromCurrentColourScheme() ?? 0;
  const wrapperLeftPosition = colourSchemeWrapper.value?.getBoundingClientRect().left ?? 0;
  const parentLeftPosition = colourSchemeWrapper.value?.parentElement?.getBoundingClientRect().left ?? 0;
  const relativeLeftPosition = wrapperLeftPosition - parentLeftPosition;
  // const relativeLeftPosition = 0;

  colourSchemeWrapper.value?.style.setProperty('--_select-scheme-marker-position', index !== undefined ? index.toString() : '0');
  colourSchemeWrapper.value?.style.setProperty('--_select-scheme-marker-left-offset', colourSchemeInputElements.value?.[index - 1]?.offsetLeft - relativeLeftPosition + 'px');
  colourSchemeWrapper.value?.style.setProperty('--_select-scheme-marker-width', colourSchemeInputElements.value?.[index - 1]?.getBoundingClientRect().width + 'px');
};

onMounted(() => {
  colourSchemeInputElements.value = Array.from(colourSchemeWrapper.value?.querySelectorAll('.select-scheme-group') || []) as HTMLInputElement[];

  if (colourSchemeWrapper.value !== null) {
    setColourSchemeAttr();
    setTimeout(() => {
      showMarker.value = true;
    }, 300);
  }
});

watch(currentColourScheme, () => {
  setColourSchemeAttr();
});
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

  /* --_select-scheme-marker-position: 1; */

  --_select-scheme-group-background-color: red;
  --_select-scheme-group-padding: 0.5rem;
  --_select-scheme-group-border-width: 0.2rem;
  --_select-scheme-group-border-colour: transparent;
  --_select-scheme-group-outline-width: 0.2rem;
  --_select-scheme-group-outline-colour: transparent;
  --_select-scheme-group-width: calc(
    var(--_scheme-icon-font-size) + (var(--_select-scheme-group-padding) * 2) + (var(--_select-scheme-group-border-width) * 2) + (var(--_select-scheme-group-outline-width) * 2)
  );

  --_scheme-icon-font-size: 2rem;
  --_scheme-icon-colour: white;

  .colour-scheme-select-form {
    display: inline-grid;
    grid-template-areas: 'select-stack';
    width: fit-content;

    background-color: var(--_form-background-color);
    border: var(--_form-border-width) solid var(--_form-border-colour);
    outline: var(--_form-outline-width) solid var(--_form-outline-colour);
    border-radius: var(--_form-border-radius);
    padding: var(--_form-padding);

    .select-scheme-marker-wrapper {
      grid-area: select-stack;
      /* display: grid; */
      /* grid-template-columns: repeat(3, 1fr); */
      z-index: 1;
      /* grid-area: select-stack; */
      /* gap: var(--_form-items-gap); */
      /* transition: all 200ms; */
      /* transition-behavior: allow-discrete; */

      /* display: none; */

      display: flex;
      align-items: center;
      position: relative;

      .select-scheme-marker {
        /* grid-column: var(--_select-scheme-marker-position); */
        aspect-ratio: 1;
        /* width: calc(var(--_select-scheme-group-width) + (var(--_form-outline-width) * 2)); */
        /* translate: -1px 0; */
        width: var(--_select-scheme-group-width);
        /* translate: calc(var(--_select-scheme-marker-left-offset) - var(--_form-items-gap) - (var(--_select-scheme-group-outline-width) * 1) - (var(--_select-scheme-group-border-width) * 1)) 0; */
        /* translate: calc(var(--_select-scheme-marker-left-offset) - (var(--_select-scheme-group-outline-width) * 1) - (var(--_select-scheme-group-border-width) * 1)) 0; */
        transition: all 300ms ease-in-out;
        background-color: var(--theme-form-radio-border);
        border-radius: 50%;

        position: absolute;
        /* left: calc(var(--_select-scheme-marker-left-offset) - var(--_form-border-width) - var(--_form-outline-width) - 1px); */
        /* left: calc(var(--_select-scheme-marker-left-offset) - calc(var(--_select-scheme-group-border-width) * 1.5) - var(--_scheme-icon-font-size)); */
        /* left: calc(var(--_select-scheme-marker-left-offset) - var(--_form-items-gap) - var(--_scheme-icon-font-size) + var(--_select-scheme-group-border-width) - 1px); */
        left: calc(var(--_select-scheme-marker-left-offset) - 29px);

        opacity: 0;

        &.show {
          opacity: 1;
        }
      }
    }

    .select-scheme-group-wrapper {
      display: grid;
      grid-area: select-stack;
      grid-template-columns: repeat(3, 1fr);
      align-items: center;
      width: fit-content;
      /* padding: var(--_form-padding); */
      z-index: 2;
      gap: var(--_form-items-gap);

      .select-scheme-group {
        aspect-ratio: 1;
        display: grid;
        grid-template-areas: 'icon-stack';
        /* width: var(--_select-scheme-marker-width); */
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
            /* --_select-scheme-marker-position: 1; */
            /* --_select-scheme-group-border-colour: var(--theme-form-radio-border); */
            /* --_select-scheme-group-outline-colour: var(--theme-form-radio-outline); */
          }
        }

        &:has(input[value='light']) {
          --_select-scheme-group-background-color: orange;

          &:has(input[value='light']:checked) {
            /* --_select-scheme-marker-position: 2; */
            /* --_select-scheme-group-border-colour: var(--theme-form-radio-border); */
            /* --_select-scheme-group-outline-colour: var(--theme-form-radio-outline); */
          }
        }

        &:has(input[value='dark']) {
          --_select-scheme-group-background-color: black;

          &:has(input[value='dark']:checked) {
            /* --_select-scheme-marker-position: 3; */
            /* --_select-scheme-group-border-colour: var(--theme-form-radio-border); */
            /* --_select-scheme-group-outline-colour: var(--theme-form-radio-outline); */
          }
        }
      }
    }
  }
}
</style>
